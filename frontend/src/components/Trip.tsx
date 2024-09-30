import { useState } from 'react';
import { Trip, PlannerItem } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format, eachDayOfInterval } from 'date-fns';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';

// Initialize AI model (replace with actual API details)
const llm = new ChatGroq({
  model: 'llama-3.1-70b-versatile',
  apiKey: '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',
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

type Props = {
  trip: Trip;
  onDelete: (id: string) => void;
  onAddNote: (tripId: string, note: string) => void;
  onDeleteNote: (tripId: string, noteIndex: number) => void;
  onAddPlannerItem: (tripId: string, plannerItem: PlannerItem) => void;
  onDeletePlannerItem: (tripId: string, plannerIndex: number) => void;
  onEditTrip: (tripId: string, updatedTrip: Partial<Trip>) => void;
  index: number;
};

function TripCard({
  trip,
  onDelete,
  onAddNote,
  onDeleteNote,
  onAddPlannerItem,
  onDeletePlannerItem,
  onEditTrip,
  index,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [preference, setPreference] = useState(''); // For travel preferences
  const [dialogOpen, setDialogOpen] = useState(false); // Control dialog visibility
  const [editedCountry, setEditedCountry] = useState(trip.country);
  const [editedStartDate, setEditedStartDate] = useState<Date | null>(
    new Date(trip.startDate),
  );
  const [editedEndDate, setEditedEndDate] = useState<Date | null>(
    new Date(trip.endDate),
  );

  // Function to handle editing trip details
  const handleEditTrip = () => {
    if (editedCountry && editedStartDate && editedEndDate) {
      onEditTrip(trip.id, {
        country: editedCountry,
        startDate: editedStartDate.toISOString(),
        endDate: editedEndDate.toISOString(),
      });
      setIsEditing(false);
    }
  };

  // Function to generate a distinct itinerary for each day
  const handleGeneratePlan = async () => {
    const days = eachDayOfInterval({
      start: new Date(trip.startDate),
      end: new Date(trip.endDate),
    });

    // Loop through each day and generate a unique itinerary using AI
    for (let i = 0; i < days.length; i++) {
      const day = days[i];

      const prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          'You are an assistant who generates travel itineraries based on user preferences.',
        ],
        [
          'human',
          `Generate a detailed itinerary for day ${i + 1} of the trip starting on ${format(
            day,
            'PPP',
          )}. The preference is: ${preference}.`,
        ],
      ]);

      const chain = prompt.pipe(llm);
      const result = await chain.invoke({ preference });

      // Add AI-generated itinerary for each day
      const generatedItinerary = {
        title: `Day ${i + 1} (${format(day, 'PPP')})`,
        description: result.text, // AI-generated itinerary for this day
        date: day,
      };

      onAddPlannerItem(trip.id, generatedItinerary);
    }

    setPreference(''); // Clear preference input
    setDialogOpen(false); // Close dialog after generation
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 w-full sm:w-72 transition-all duration-300 hover:shadow-lg">
      {/* Minimal Data Display */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{trip.country}</div>
        <Button variant="destructive" onClick={() => onDelete(trip.id)}>
          Delete
        </Button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {format(new Date(trip.startDate), 'PPP')} -{' '}
        {format(new Date(trip.endDate), 'PPP')}
      </p>

      <Button
        className="mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white w-full rounded-md hover:shadow-lg"
        onClick={() => setDialogOpen(true)}
      >
        Show Details
      </Button>

      {/* Dialog to display full trip details */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trip Details for {trip.country}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg">
              <strong>Dates:</strong> {format(new Date(trip.startDate), 'PPP')}{' '}
              - {format(new Date(trip.endDate), 'PPP')}
            </p>

            <div>
              <h4 className="text-xl font-semibold">Trip Planner</h4>
              <ul className="space-y-2">
                {trip.tripPlanner && trip.tripPlanner.length > 0 ? (
                  trip.tripPlanner.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-col justify-between bg-gray-50 p-3 rounded-lg border hover:bg-gray-100 transition-all"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">{item.title}</span>
                        {item.date && (
                          <span className="text-sm text-gray-500">
                            {format(new Date(item.date), 'PPP')}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeletePlannerItem(trip.id, index)}
                      >
                        Delete
                      </Button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No trip planner items added yet.
                  </p>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold">Notes</h4>
              <ul className="space-y-2">
                {trip.notes.length > 0 ? (
                  trip.notes.map((note, noteIndex) => (
                    <li
                      key={noteIndex}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border hover:bg-gray-100 transition-all"
                    >
                      <span className="text-sm text-gray-700">{note}</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDeleteNote(trip.id, noteIndex)}
                      >
                        Delete
                      </Button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No notes added yet.</p>
                )}
              </ul>

              {/* Add New Note */}
              <div className="flex space-x-4 mt-4">
                <Input
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note"
                  className="w-full"
                />
                <Button
                  onClick={() => onAddNote(trip.id, newNote)}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-lg hover:scale-105 transition-transform rounded-lg"
                >
                  Add Note
                </Button>
              </div>
            </div>

            {/* Preference Input and Generate Button */}
            <div>
              <h4 className="text-xl font-semibold">Generate Trip Plan</h4>
              <Input
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                placeholder="Enter preferences (e.g., free days, heavy traveling)"
                className="mb-4"
              />
              <Button
                onClick={handleGeneratePlan}
                className="bg-blue-500 text-white hover:shadow-lg hover:scale-105 transition-transform rounded-lg"
              >
                Generate Plan
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setDialogOpen(false)}
              className="bg-gray-500 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TripCard;

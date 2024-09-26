import { useState } from 'react';
import { Trip } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { format } from 'date-fns';

type Props = {
  trip: Trip;
  onDelete: (id: string) => void;
  onAddNote: (tripId: string, note: string) => void;
  onDeleteNote: (tripId: string, noteIndex: number) => void;
  onEditTrip: (tripId: string, updatedTrip: Partial<Trip>) => void;
  index: number;
};

function TripCard({
  trip,
  onDelete,
  onAddNote,
  onDeleteNote,
  onEditTrip,
  index,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editedCountry, setEditedCountry] = useState(trip.country);
  const [editedStartDate, setEditedStartDate] = useState<Date | null>(
    new Date(trip.startDate),
  );
  const [editedEndDate, setEditedEndDate] = useState<Date | null>(
    new Date(trip.endDate),
  );

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

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 space-y-6 min-w-[320px] transition-all duration-300 hover:shadow-2xl">
      {/* Trip Header */}
      <div className="flex justify-between items-center">
        {isEditing ? (
          <Input
            value={editedCountry}
            onChange={(e) => setEditedCountry(e.target.value)}
            placeholder="Edit Country"
            className="w-full"
          />
        ) : (
          <div className="text-lg font-semibold">
            {format(new Date(trip.startDate), 'PPP')} -{' '}
            {format(new Date(trip.endDate), 'PPP')}
          </div>
        )}
        {/* Country Pill */}
        {!isEditing && (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md">
            {trip.country}
          </span>
        )}
      </div>

      {/* Notes Section */}
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
      <div className="flex space-x-4">
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

      {/* Edit Trip Form (Show when editing) */}
      {isEditing && (
        <div className="space-y-4">
          {/* Date Picker for Start Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {editedStartDate
                  ? format(editedStartDate, 'PPP')
                  : 'Pick Start Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={editedStartDate}
                onSelect={setEditedStartDate} // Ensure selected date updates state
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Date Picker for End Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {editedEndDate ? format(editedEndDate, 'PPP') : 'Pick End Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={editedEndDate}
                onSelect={setEditedEndDate} // Ensure selected date updates state
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Save Button */}
          <Button
            onClick={handleEditTrip}
            className="bg-green-500 text-white w-full"
          >
            Save Changes
          </Button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between space-x-4">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
        >
          {isEditing ? 'Cancel Edit' : 'View/Edit Trip'}
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(trip.id)}
          className="bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
        >
          Delete Trip
        </Button>
      </div>
    </div>
  );
}

export default TripCard;

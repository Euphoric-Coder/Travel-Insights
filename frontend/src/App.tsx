import AddTrip from './components/AddTripForm';
import TripList from './components/TripList';
import { useCollection, useQuery } from '@squidcloud/react';
import { Trip } from './types';
import AskAI from './components/AskAI';

function App() {
  const collection = useCollection<Trip>('trips');
  const trips = useQuery(collection.query());

  const findTrip = (id: string) => {
    return trips.data.find((trip) => trip.data.id === id);
  };

  const onDelete = (id: string) => {
    const trip = findTrip(id);
    if (trip) trip.delete();
  };

  const onAddNote = (tripId: string, note: string) => {
    const trip = findTrip(tripId);
    if (!trip) return;
    const notes = trip.data.notes;
    notes.push(note);
    trip.update({
      notes: notes,
    });
  };

  const onDeleteNote = (tripId: string, noteIndex: number) => {
    const trip = findTrip(tripId);
    if (!trip) return;
    const notes = trip.data.notes;
    trip.update({
      notes: notes.filter((_, index) => index !== noteIndex),
    });
  };

  const onEditTrip = (tripId: string, updatedTrip: Partial<Trip>) => {
    // Logic to update the trip goes here
    const trip = findTrip(tripId); // Find the trip to update
    if (trip) {
      trip.update(updatedTrip); // Update the trip details
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Travel Planner & AI Assistant
      </h1>
      <div className="w-full max-w-5xl space-y-8">
        <AskAI />
        <AddTrip />
        <TripList
          trips={trips.data.map((trip) => trip.data)}
          onDelete={onDelete}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          onEditTrip={onEditTrip}
        />
      </div>
    </div>
  );
}

export default App;

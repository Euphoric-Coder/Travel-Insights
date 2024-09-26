import { Trip } from '../types';
import TripCard from './Trip';

type Props = {
  trips: Trip[];
  onDelete: (id: string) => void;
  onAddNote: (tripId: string, note: string) => void;
  onDeleteNote: (tripId: string, noteIndex: number) => void;
  onEditTrip: (tripId: string, updatedTrip: Partial<Trip>) => void; // Added onEditTrip prop
};


function TripList({
  trips,
  onDelete,
  onAddNote,
  onDeleteNote,
  onEditTrip,
}: Props) {
  return (
    <div className="space-y-4">
      {trips &&
        trips.map((trip, index) => (
          <TripCard
            key={index}
            trip={trip}
            index={index}
            onDelete={onDelete}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            onEditTrip={onEditTrip} // Pass the onEditTrip function
          />
        ))}
    </div>
  );
}

export default TripList;

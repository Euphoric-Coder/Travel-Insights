import { Trip, PlannerItem } from '../types';
import TripCard from './Trip';

type Props = {
  trips: Trip[];
  onDelete: (id: string) => void;
  onAddNote: (tripId: string, note: string) => void;
  onDeleteNote: (tripId: string, noteIndex: number) => void;
  onEditTrip: (tripId: string, updatedTrip: Partial<Trip>) => void;
  onAddPlannerItem: (tripId: string, plannerItem: PlannerItem) => void;
  onDeletePlannerItem: (tripId: string, plannerIndex: number) => void;
};

function TripList({
  trips,
  onDelete,
  onAddNote,
  onDeleteNote,
  onEditTrip,
  onAddPlannerItem,
  onDeletePlannerItem,
}: Props) {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4">
      {trips &&
        trips.map((trip, index) => (
          <TripCard
            key={index}
            trip={trip}
            index={index}
            onDelete={onDelete}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            onEditTrip={onEditTrip}
            onAddPlannerItem={onAddPlannerItem}
            onDeletePlannerItem={onDeletePlannerItem}
          />
        ))}
    </div>
  );
}

export default TripList;

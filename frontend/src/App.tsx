// import AddTrip from './components/AddTripForm';
// import TripList from './components/TripList';
// import { useCollection, useQuery } from '@squidcloud/react';
// import { Trip, PlannerItem } from './types'; // Make sure PlannerItem is imported
// import AskAI from './components/AskAI';
// import SideBar from './components/SideBar';

// function App() {
//   const collection = useCollection<Trip>('trips');
//   const trips = useQuery(collection.query());

//   const findTrip = (id: string) => {
//     return trips.data.find((trip) => trip.data.id === id);
//   };

//   const onDelete = (id: string) => {
//     const trip = findTrip(id);
//     if (trip) trip.delete();
//   };

//   const onAddNote = (tripId: string, note: string) => {
//     const trip = findTrip(tripId);
//     if (!trip) return;
//     const notes = trip.data.notes;
//     notes.push(note);
//     trip.update({
//       notes: notes,
//     });
//   };

//   const onDeleteNote = (tripId: string, noteIndex: number) => {
//     const trip = findTrip(tripId);
//     if (!trip) return;
//     const notes = trip.data.notes;
//     trip.update({
//       notes: notes.filter((_, index) => index !== noteIndex),
//     });
//   };

//   const onEditTrip = (tripId: string, updatedTrip: Partial<Trip>) => {
//     const trip = findTrip(tripId);
//     if (trip) {
//       trip.update(updatedTrip);
//     }
//   };

//   // Adding a planner item
//   const onAddPlannerItem = (tripId: string, plannerItem: PlannerItem) => {
//     const trip = findTrip(tripId);
//     if (!trip) return;
//     const tripPlanner = trip.data.tripPlanner || [];
//     tripPlanner.push(plannerItem);
//     trip.update({
//       tripPlanner: tripPlanner,
//     });
//   };

//   // Deleting a planner item
//   const onDeletePlannerItem = (tripId: string, plannerIndex: number) => {
//     const trip = findTrip(tripId);
//     if (!trip) return;
//     const tripPlanner = trip.data.tripPlanner || [];
//     trip.update({
//       tripPlanner: tripPlanner.filter((_, index) => index !== plannerIndex),
//     });
//   };

//   return (
//     <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
//       <h1 className="text-4xl font-bold mb-10 text-center">
//         Travel Planner & AI Assistant
//       </h1>
//       <div className="w-full max-w-5xl space-y-8">
//         {/* <SideBar /> */}
//         <AskAI />
//         <AddTrip />
//         <TripList
//           trips={trips.data.map((trip) => trip.data)}
//           onDelete={onDelete}
//           onAddNote={onAddNote}
//           onDeleteNote={onDeleteNote}
//           onEditTrip={onEditTrip}
//           onAddPlannerItem={onAddPlannerItem} // Pass add planner item to TripList
//           onDeletePlannerItem={onDeletePlannerItem} // Pass delete planner item to TripList
//         />
//       </div>
//     </div>
//   );
// }

// export default App;


import SideBar from './components/SideBar'
import Main from './components/Main'

const App = () => {
  return (
    <div className='flex'>
      <SideBar />
      <Main />
    </div>
  );
}

export default App

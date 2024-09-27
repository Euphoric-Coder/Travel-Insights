export type PlannerItem = {
  title: string;
  description: string;
  date?: Date;
};

export type Trip = {
  startDate: Date;
  endDate: Date;
  country: string;
  notes: string[];
  tripPlanner: PlannerItem[]; // Add this field for planner items
  id: string;
};

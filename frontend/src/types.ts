export type Trip = {
  startDate: Date;
  endDate: Date;
  country: string;
  notes: string[];
  tripPlanner: {
    title: string;
    description: string;
    date?: Date;
  }[];
  id: string;
};

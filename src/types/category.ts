export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isActive: boolean;
  parent: string | null;
  children: ICategory[]; // recursive relationship
  createdBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

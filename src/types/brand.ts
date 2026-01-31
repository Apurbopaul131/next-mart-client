export interface IBrand {
  _id: string;
  name: string;
  logo: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

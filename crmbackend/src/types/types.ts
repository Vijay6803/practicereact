export interface UserI {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyI {
  id: string;
  name: string;
  address: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ContactI {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface DealsI {
  id: string;
  title: string;
  amount: number;
  closeDate: Date;
  stage:
    | "Prospecting"
    | "Qualification"
    | "Proposal"
    | "Negotiation"
    | "Closed Won"
    | "Closed Lost";
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LineItemsI {
  id: string;
  dealId: string;
  productName: string;
  price: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface QueryI {
  sortBy: string;
  order: string;
  page: string;
  limit: string;
  search: string;
}

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAddBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
}

export interface IUpdateBook extends IAddBook {
  id: string;
}

export interface IBorrowData {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface IBorrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: unknown;
}

export type GetBooksParams = {
  filter?: Genre;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

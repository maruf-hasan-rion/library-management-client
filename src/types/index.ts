export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBorrow {
  _id?: string;
  book: string | BookRef;
  quantity: number;
  dueDate: string;
}
export interface IBorrowData {
  book: string;
  quantity: number;
  dueDate: string;
}
export interface BookRef {
  _id: string;
  title: string;
  isbn: string;
}

export interface IBorrowSummary {
  book: {
    bookId: string;
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface IApiResponse<T> {
  data?: T;
  error?: object;
  message?: string;
  success: boolean;
}
export interface IUpdateBook extends IAddBook {
  id: string;
}
export interface IAddBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

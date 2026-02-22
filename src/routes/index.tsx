import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AllBooks from "../pages/AllBooks";
import BookDetails from "../pages/BookDetails";
import BorrowSummary from "../pages/BorrowSummary";
import AddBook from "../pages/AddBook";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "books/:id",
        Component: BookDetails,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;

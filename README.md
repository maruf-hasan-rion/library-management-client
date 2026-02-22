# Library Management Client(Library Hero)

A minimal yet modern library management system built using React, TypeScript, Redux Toolkit Query, and Tailwind CSS.

It connects to a Node.js + Express + MongoDB backend and focuses on essential book management and borrowing features—without authentication, categories, or payment integration.

---

## Tech Stack

- **React** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (raw utility styling)
- **Headless UI** (accessible modal + listbox)
- **Redux Toolkit + RTK Query** (state + API caching)
- **React Hook Form** (forms)
- **React Router** (routing)
- **react-hot-toast** (notifications)
- **SweetAlert2** (confirm dialogs)
- **Lottie** (loading animation)
- **lucide-react / react-icons** (icons)

---

## ✨ Features

- View all books (table view)
- View details (modal)
- Add book (form)
- Edit book (modal form)
- Borrow book (modal form)
- Borrow summary (aggregated table)
- Confirm delete with SweetAlert
- Borrow books (quantity and due date)
  - Borrowed quantity cannot exceed available copies
  - When copies === 0, the book is automatically marked as unavailable

---

## Project Structure

```txt
src/
  assets/                # lottie / images
  components/
    books/               # BookModals + forms (borrow/edit/view)
    layout/              # Navbar, Footer
    ui/                  # Button, reusable UI components
  features/
    books/               # RTK Query bookApi
    borrows/             # RTK Query borrowApi
    modal/               # modalSlice
  pages/
    Home.tsx
    AllBooks.tsx
    AddBook.tsx
    BorrowSummary.tsx
    NotFound.tsx
  router/
    router.ts
  store/
    store.ts
    hook.ts
  types.ts
```

---

## Setup & Installation

1. Clone and install

```bash
git clone https://github.com/maruf-hasan-rion/library-management-client
cd library-management-client
npm install
```

2. Environment variables
   Create a `.env` file in the project root:

```bash
VITE_API_URL=http://localhost:5000/api
```

Make sure your backend server is running and CORS allows your frontend URL. 3. Run the project

```bash
npm run dev
```

    Build for production:

```bash
npm run build
```

---

## Routes

| Route             | Description       |
| ----------------- | ----------------- |
| `/`               | Home              |
| `/books`          | View all books    |
| `/books/:id`      | Book details page |
| `/add-book`       | Add new book      |
| `/borrow-summary` | Borrow summary    |
| `*`               | Not found         |

---

Author

Library Hero — Library Management frontend.

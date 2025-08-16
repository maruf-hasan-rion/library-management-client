# Library Management Client

A minimal yet modern library management system built using React, TypeScript, Redux Toolkit Query, and Tailwind CSS.

## It connects to a Node.js + Express + MongoDB backend and focuses on essential book management and borrowing features—without authentication, categories, or payment integration.

## ✨ Features

### 📚 Book Management

- Display all books in a responsive table with columns: Title, Author, Genre, ISBN, Copies, Availability, Actions

- Add new books through a simple form

- Edit existing book details

- Delete books with confirmation dialog

- Borrow books with quantity and due date options

- Business Rules:

- Borrowed quantity cannot exceed available copies

- When copies === 0, the book is automatically marked as unavailable

---

### Borrow Summary

- Aggregated view of all borrowed books
- Shows: Title | ISBN | Total Quantity Borrowed

---

## Tech Stack

| Layer    | Tech                      |
| -------- | ------------------------- |
| Frontend | React, TypeScript         |
| State    | Redux Toolkit + RTK Query |
| Styling  | Tailwind CSS              |
| Backend  | Node.js, Express.js       |
| Database | MongoDB + Mongoose        |
| Toast UI | React Hot Toast           |

---

## Pages / Routes

- `/books` – Book list view
- `/add-book` – Add book form
- `/borrow-summary` – Borrow summary

---

## Setup Instructions

---

```
# Clone the repository
git clone https://github.com/maruf-hasan-rion/library-management-client
cd library-management-client

# Install dependencies
npm install

# Create a .env file
 .env

# Set .env file with environment variables
VITE_API_URL=

# Run the command
npm run dev
```

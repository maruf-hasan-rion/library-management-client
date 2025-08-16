import { Link } from "react-router";

export default function Home() {
  return (
   <div
  className="hero min-h-screen text-amber-100"
  style={{
    backgroundImage:
      "url(https://i.ibb.co.com/mVQBthyt/library.jpg)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome to Library Hero</h1>
      <p className="mb-5">
        Manage your books easily—add, edit, borrow, and track your collection all in one place.
            A simple and powerful system to keep your library organized and accessible.
      </p>
      <Link to="/all-books"><button className="btn btn-primary hover:text-blue-600">Get Started</button></Link>
    </div>
  </div>
</div>
)
}

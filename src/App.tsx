import { Outlet } from "react-router";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 2000,
            style: {
              background: "#10B981",
            },
          },
          error: {
            duration: 2000,
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
    </div>
  );
};

export default App;

import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="">
      <div
        style={{
          display: "flex",
          gap: "2rem",
          backgroundColor: "white",
          padding: ".5rem 1.2rem",
          borderRadius: "5rem",
          margin: "2rem 2rem",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

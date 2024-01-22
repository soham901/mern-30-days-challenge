import { Outlet, Link } from "react-router-dom";

export default function Todos() {
  return (
    <div className="">
      <div>Todos</div>
      <Link to="/todos/create">Add todo</Link>
      <Outlet />
    </div>
  );
}

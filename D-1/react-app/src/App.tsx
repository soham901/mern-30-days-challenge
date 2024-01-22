import { useState } from "react";

export default function App() {
  const [data, setData] = useState("");

  async function fetchData() {
    console.log("fetching");

    const res = await fetch("http://localhost:3000");
    setData(await res.text());
  }

  return (
    <div className="">
      <div style={{ fontSize: "4rem", fontWeight: "bold" }}>Day 1</div>
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{data}</div>
      <button onClick={fetchData}>Fetch</button>
    </div>
  );
}

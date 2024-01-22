import axios from "axios";
import { useRef, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const disableBtnRef = useRef();

  async function fetchData() {
    console.log("fetching");
    try {
      setLoading(true);
      const disableDelay = Boolean(disableBtnRef?.current?.checked || false);

      const res = await axios.get(
        "http://localhost:3000/todos" + (disableDelay ? "?delay=true" : "")
      );
      console.log(res.data);
      if (!Array.isArray(res.data)) throw new Error("Fetched data isn't array");
      setMsg(res.data.length + " todos fetched successfully");
      setLoading(false);
    } catch (error) {
      console.error(error?.message);
      setMsg("Something wrong happend");
      setLoading(false);
    }
  }

  return (
    <div className="">
      <div style={{ fontSize: "4rem", fontWeight: "bold" }}>Day 5</div>
      <div className="">
        <label htmlFor="disable-delay">Artifical delay</label>
        <input type="checkbox" id="disable-delay" ref={disableBtnRef} />
      </div>
      {loading && (
        <div style={{ fontSize: "4rem", fontWeight: "bold" }}>Loading...</div>
      )}
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{msg}</div>
      <button onClick={fetchData}>Fetch</button>
    </div>
  );
}

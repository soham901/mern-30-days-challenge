import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    console.log("CLICKED");
    setCount(count + 1);
  }

  return (
    <div className="">
      <div style={{ fontSize: "4rem", fontWeight: "bold" }}>Day 2</div>
      <MyComp name="Soham" />
      <MyButton
        title={"Click " + count}
        varient="first"
        handleClick={increaseCount}
      />
      <MyButton
        title={"Click " + count}
        varient="second"
        handleClick={increaseCount}
      />
      <MyButton
        title={"Click " + count}
        varient="third"
        handleClick={increaseCount}
      />
    </div>
  );
}

function MyComp({ name }) {
  return <div>Hello, {name}</div>;
}

function MyButton({ title, varient, handleClick }) {
  if (varient === "first")
    return (
      <button
        style={{
          backgroundColor: "red",
          color: "black",
          border: ".2rem solid",
          boxShadow: "0px 0px .4rem red",
        }}
        onClick={handleClick}
      >
        {title}
      </button>
    );

  if (varient === "second")
    return (
      <button
        style={{
          backgroundColor: "green",
          color: "black",
          border: ".2rem solid",
          boxShadow: "0px 0px .4rem green",
        }}
        onClick={handleClick}
      >
        {title}
      </button>
    );

  if (varient === "third")
    return (
      <button
        style={{
          backgroundColor: "blue",
          color: "black",
          border: ".2rem solid",
          boxShadow: "0px 0px .4rem blue",
        }}
        onClick={handleClick}
      >
        {title}
      </button>
    );
}

export default function CreateTodo() {
  return (
    <div
      style={{
        backgroundColor: "grey",
        padding: ".8rem",
        borderRadius: "1rem",
      }}
    >
      <form
        action=""
        style={{ display: "flex", flexDirection: "column", gap: ".2rem" }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <input
          type="submit"
          style={{
            padding: ".5rem 1rem",
            backgroundColor: "black",
            borderRadius: "2rem",
            border: "none",
          }}
          value="Create"
        />
      </form>
    </div>
  );
}

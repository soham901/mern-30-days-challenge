/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

function Pagination() {
  const [fetchedData, setLatestData] = useState({});
  let { currentPage, length, totalPages, data } = fetchedData;
  const [limit, updateLimit] = useState(10);
  const [page, updatePage] = useState(1);

  const btnRefresh = useRef();

  async function fetchData() {
    const res = await fetch(
      `http://localhost:3000?page=${page}&limit=${limit}`
    );
    const d = await res.json();
    setLatestData(d);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleRefresh = () => {
    // refresh the page
    setPage(0);
  };

  const setPage = (p) => {
    if (p <= 1) {
      updatePage(1);
    } else if (p <= totalPages) {
      updatePage(p);
    }
  };

  const setLimit = (l) => {
    if (l <= 1) {
      updateLimit(1);
    } else if (l <= totalPages * length) {
      updateLimit(l);
    }
  };

  function PrevButton() {
    return (
      <button
        disabled={page == 1}
        style={{
          cursor: page == 1 ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev
      </button>
    );
  }

  function NextButton() {
    return (
      <button
        disabled={page == totalPages}
        style={{
          cursor: page == totalPages ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    );
  }

  let pages = [];

  for (let cur = 1; cur <= totalPages; cur++) {
    pages.push(cur);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#2f2f2f",
          padding: "1rem",
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: ".6rem",
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Limit per page: {limit}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: ".8rem",
          }}
        >
          <button
            onClick={() => {
              setLimit(limit - 1);
            }}
            style={{
              flex: 1,
              fontSize: "2rem",
              padding: ".1rem",
            }}
          >
            -
          </button>
          <button style={{ flex: 2 }} ref={btnRefresh} onClick={handleRefresh}>
            Refresh
          </button>
          <button
            onClick={() => {
              setLimit(limit + 1);
            }}
            style={{ flex: 1, fontSize: "2rem", padding: ".1rem" }}
          >
            +
          </button>
        </div>
      </div>
      <div
        style={{
          padding: "1rem",
          borderRadius: "1rem",
          backgroundColor: "#2f2f2f",
          height: "16rem",
          overflowY: "scroll",
        }}
      >
        {data &&
          Array.isArray(data) &&
          data.map((d) => {
            return (
              <div className="" key={d._id}>
                <div>{d.title}</div>
              </div>
            );
          })}
      </div>
      <div
        style={{
          backgroundColor: "#2f2f2f",
          padding: "1rem",
          borderRadius: ".8rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PrevButton />
        {pages.map((a, i) => {
          return (
            <div key={i}>
              <button
                onClick={() => {
                  setPage(a);
                }}
                title={i}
                className={page === i + 1 ? "active" : ""}
              >
                {a}
              </button>
            </div>
          );
        })}
        <NextButton />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="">
      <Pagination />
    </div>
  );
}

export default App;
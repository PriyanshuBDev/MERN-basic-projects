import { useState } from "react";

export function CardDelete({ token, fetchCards }) {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    if (id.length) {
      try {
        const res = await fetch(`http://localhost:3000/card/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const data = await res.json();
        console.log(data);
        alert(data.msg);
        fetchCards();
        setId("");
      } catch (e) {
        console.log("Error:", e);
        alert("Card deletion failed");
      }
    }
  };
  return (
    <div>
      <input
        name="id"
        value={id}
        type="text"
        placeholder="Id"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <button onClick={handleDelete} disabled={!id}>
        Delete
      </button>
    </div>
  );
}

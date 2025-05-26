import { useState } from "react";

export function CardUpdate({ token, fetchCards }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    interests: "",
    social: {
      twitter: "",
      linkedin: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "linkedin" || name === "twitter") {
      setForm((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleUpdate = async () => {
    if (form.id.length) {
      const payload = {
        name: form.name,
        description: form.description,
        interests: form.interests.split(",").map((i) => i.trim()),
        social: {
          linkedin: form.social.linkedin,
          twitter: form.social.twitter,
        },
      };

      try {
        const res = await fetch(
          `http://localhost:3000/card/update/${form.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();
        alert(data.msg);
        fetchCards();
        setForm({
          id: "",
          name: "",
          description: "",
          interests: "",
          social: {
            twitter: "",
            linkedin: "",
          },
        });
      } catch (e) {
        console.log("Error:", e);
        alert("Card update failed");
      }
    } else {
      alert("Id required");
    }
  };
  return (
    <div>
      <input
        name="id"
        type="text"
        value={form.id}
        placeholder="Id"
        onChange={handleChange}
      />
      <input
        name="name"
        type="text"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        name="description"
        type="text"
        value={form.description}
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        name="interests"
        type="text"
        value={form.interests}
        placeholder="Interests: use (,) as separator"
        onChange={handleChange}
      />
      <input
        name="linkedin"
        type="text"
        value={form.social.linkedin}
        placeholder="LinkedIn URL"
        onChange={handleChange}
      />
      <input
        name="twitter"
        type="text"
        value={form.social.twitter}
        placeholder="Twitter URL"
        onChange={handleChange}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

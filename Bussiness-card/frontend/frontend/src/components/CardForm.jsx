import { useState } from "react";

export function CardForm({ token, fetchCards }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    interests: "",
    social: {
      linkedin: "",
      twitter: "",
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
  const handleSubmit = async () => {
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
      const res = await fetch("http://localhost:3000/card/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.msg);
      fetchCards();
      setForm({
        name: "",
        description: "",
        interests: "",
        social: {
          linkedin: "",
          twitter: "",
        },
      });
    } catch (e) {
      console.log("Error:", e);
      alert("Card creation failed");
    }
  };
  return (
    <div>
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
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}

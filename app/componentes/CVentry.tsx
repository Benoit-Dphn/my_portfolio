"use client";

import { useState } from "react";

export default function CVentry() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // empêche le rechargement de la page
    console.log({ name, message });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 max-w-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        className="border rounded p-2"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="border rounded p-2"
      />
    </form>
  );
}

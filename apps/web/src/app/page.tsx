"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Error: Could not connect to API"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Frontend + Backend</h1>
        <p className="text-xl p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          Message from API:{" "}
          <span className="font-mono text-green-500">{message}</span>
        </p>
      </div>
    </main>
  );
}

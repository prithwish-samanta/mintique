"use client";

import { useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/");
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      const res = await fetch("http://localhost:3001/", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      fetchUsers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Users from Database
          </h1>
          <button
            onClick={handleCreateUser}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors"
          >
            Create New User
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading users...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                >
                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    ID: {user.id}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No users found. Click the button to create one!
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

import React from "react";

interface AdminPanelProps {
  username: string;
}

export function AdminPanel({ username }: AdminPanelProps) {
  return <p>Welcome {username}</p>;
}

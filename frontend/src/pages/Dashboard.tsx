import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { admin, logout } =
    useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Welcome {admin?.username}
      </p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}
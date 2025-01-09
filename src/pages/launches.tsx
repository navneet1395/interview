import { Button } from "@mantine/core";
import { useAuthStore } from "../store/auth.store";
import { LaunchesTable } from "../components/launchesTable";

const Launches = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)", // Subtle gradient background
      }}
    >
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0rem 2rem",
          background: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          // margin: "1rem",
        }}
      >
        <h1 className="text-4xl font-bold" style={{ color: "#2a2a2a" }}>
          SpaceX Launches
        </h1>
        <Button onClick={logout} variant="outline" color="blue" radius="md">
          Logout
        </Button>
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          margin: "1rem",
          background: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          // padding: "2rem",
        }}
      >
        <LaunchesTable />
      </div>
    </div>
  );
};

export default Launches;

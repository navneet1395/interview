import { Button } from "@mantine/core";
import { useAuthStore } from "../store/auth.store";
import { LaunchesTable } from "../components/launchesTable";

const Launches = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-space text-space-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">SpaceX Launches</h1>
          <Button onClick={logout} variant="secondary">
            Logout
          </Button>
        </div>
        <LaunchesTable />
      </div>
    </div>
  );
};

export default Launches;

import { useParams } from "react-router-dom";
import { useLaunch } from "../services/api";
import { Card, CardSection } from "@mantine/core";

const LaunchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: launch, isLoading } = useLaunch(id!);

  if (isLoading) return <div>Loading...</div>;
  if (!launch) return <div>Launch not found</div>;

  return (
    <div className="min-h-screen bg-space text-space-white p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <Card className="bg-white/10 backdrop-blur">
          <CardSection>
            <span className="text-3xl">{launch.name}</span>
          </CardSection>
          <CardSection className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Launch Date</h3>
                <p>{new Date(launch.date_utc).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Status</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    launch.success
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {launch.success ? "Success" : "Failed"}
                </span>
              </div>
            </div>
            {launch.links.patch.large && (
              <img
                src={launch.links.patch.large}
                alt="Mission Patch"
                className="w-48 h-48 object-contain mx-auto"
              />
            )}
            {launch.details && (
              <div>
                <h3 className="text-lg font-semibold">Details</h3>
                <p className="text-gray-300">{launch.details}</p>
              </div>
            )}
          </CardSection>
        </Card>
      </div>
    </div>
  );
};

export default LaunchDetail;

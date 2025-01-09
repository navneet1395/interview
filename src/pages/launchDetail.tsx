import { useNavigate, useParams } from "react-router-dom";
import { useLaunch } from "../services/api";
import {
  Calendar,
  Rocket,
  Info,
  Youtube,
  Camera,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@mantine/core";

const LaunchDetail = () => {
  const getStatusBadge = (success: boolean | null) => {
    if (success === null) return <span className="badge">Upcoming</span>;
    return success ? (
      <span className="badge badge-success">Success</span>
    ) : (
      <span className="badge badge-failure">Failed</span>
    );
  };
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: launch, isLoading } = useLaunch(id!);

  if (isLoading) {
    return (
      <div className="launch-detail-container">
        <div className="flex items-center justify-center h-screen">
          Loading launch details...
        </div>
      </div>
    );
  }

  if (!launch) {
    return (
      <div className="launch-detail-container">
        <div className="flex items-center justify-center h-screen">
          Launch not found
        </div>
      </div>
    );
  }

  return (
    <div className="launch-detail-container">
      <div style={{ padding: "1rem" }}>
        <Button
          onClick={() => navigate(`/launches/`, { replace: true })}
          variant="default"
        >
          Back
        </Button>
      </div>
      <div className="launch-content">
        {/* Mission Overview */}
        <div className="detail-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div className="card-header">
              <h1 className="text-3xl font-bold">{launch.name}</h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  {new Date(launch.date_utc).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                {getStatusBadge(launch.success)}
              </div>
            </div>
            <img
              src={launch.links.patch.large}
              alt="Mission Patch"
              className="mission-patch"
            />
          </div>

          <div className="card-section grid-container">
            <div className="info-item">
              <h3 className="info-label">Flight Number</h3>
              <p className="info-value">#{launch?.flight_number}</p>
            </div>

            {launch.details && (
              <div className="info-item col-span-2">
                <h3 className="info-label">Mission Details</h3>
                <p className="info-value">{launch.details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Technical Details */}
        <div className="detail-card">
          <div className="card-header">
            <h2 className="text-2xl font-semibold">Technical Information</h2>
          </div>
          <div className="card-section grid-container">
            <div className="info-item">
              <h3 className="info-label">
                Static Fire Test
                <span className="text-sm ml-2 text-gray-400">
                  (Engine test before launch)
                </span>
              </h3>
              <p className="info-value">
                {new Date(launch.static_fire_date_utc).toLocaleDateString()}
              </p>
            </div>

            <div className="info-item">
              <h3 className="info-label">
                Launch Window
                <span className="text-sm ml-2 text-gray-400">
                  (Available time for launch)
                </span>
              </h3>
              <p className="info-value">{launch.window} seconds</p>
            </div>

            {launch.cores[0] && (
              <div className="info-item">
                <h3 className="info-label">Booster Information</h3>
                <div className="info-value">
                  <p>Flight Number: {launch.cores[0].flight}</p>
                  <p>
                    Landing Attempt:{" "}
                    {launch.cores[0].landing_attempt ? "Yes" : "No"}
                  </p>
                  <p>
                    Landing Success:{" "}
                    {launch.cores[0].landing_success ? "Yes" : "No"}
                  </p>
                  <p>Landing Type: {launch.cores[0].landing_type}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Media & Links */}
        <div className="detail-card">
          <div className="card-header">
            <h2 className="text-2xl font-semibold">Media & Resources</h2>
          </div>
          <div className="card-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {launch.links.patch.large && (
                <div className="info-item">
                  <h3 className="info-label" style={{ textAlign: "center" }} s>
                    Mission Patch
                  </h3>
                  <img
                    src={launch.links.patch.large}
                    alt="Mission Patch"
                    className="mission-patch"
                  />
                </div>
              )}
              {launch.links.webcast && (
                <iframe
                  width="684"
                  height="385"
                  src={`https://www.youtube.com/embed/${
                    launch.links.webcast.split("watch?v=")[1]
                  }`}
                  title="Eutelsat/ABS Mission Hosted Webcast"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              )}
            </div>
            <div className="info-item">
              <h3 className="info-label">Related Links</h3>
              <div className="links-grid">
                {launch.links.webcast && (
                  <a
                    href={launch.links.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    <Youtube size={20} />
                    Watch Launch
                  </a>
                )}
                {launch.links.article && (
                  <a
                    href={launch.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    <Info size={20} />
                    Article
                  </a>
                )}
                {launch.links.wikipedia && (
                  <a
                    href={launch.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    <LinkIcon size={20} />
                    Wikipedia
                  </a>
                )}
                {launch.links.presskit && (
                  <a
                    href={launch.links.presskit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    <Info size={20} />
                    Press Kit
                  </a>
                )}
              </div>
            </div>

            {launch.links.flickr.original.length > 0 && (
              <div className="info-item">
                <h3 className="info-label">Launch Photos</h3>
                <div className="image-gallery">
                  {launch.links.flickr.original.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Launch photo ${index + 1}`}
                      className="launch-photo"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetail;

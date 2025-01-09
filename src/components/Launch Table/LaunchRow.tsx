import { useNavigate } from "react-router-dom";
import { ExternalLinks } from "./ExternalLinks";
const StatusBadge = ({ success }: { success: boolean | null }) => {
  const baseClass = "status-badge";
  const statusClass =
    success === null
      ? "status-badge-upcoming"
      : success
      ? "status-badge-success"
      : "status-badge-failed";

  return (
    <span className={`${baseClass} ${statusClass}`}>
      {success === null ? "Upcoming" : success ? "Success" : "Failed"}
    </span>
  );
};

export const LaunchRow = ({ launch }: { launch: any }) => {
  const navigate = useNavigate();
  return (
    <tr
      className="launch-row"
      onClick={() => navigate(`/launches/${launch.id}`, { replace: true })}
    >
      <td className="launch-cell launch-name">{launch.name}</td>
      <td className="launch-cell launch-date">
        {new Date(launch.date_utc).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="launch-cell">
        <StatusBadge success={launch.success} />
      </td>
      <td className="launch-cell launch-details">
        {launch.details || "No details available"}
      </td>
      <td className="launch-cell launch-links">
        <ExternalLinks links={launch.links} />
      </td>
    </tr>
  );
};

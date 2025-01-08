import { useState } from "react";
import { Link } from "react-router-dom";
import { useLaunches } from "../services/api";
import { ActionIcon, Badge, Group, Input, Table, Tooltip } from "@mantine/core";
import { Link2, Newspaper, Youtube } from "lucide-react";
export const LaunchesTable = () => {
  const { data: launches, isLoading } = useLaunches();
  const [search, setSearch] = useState("");

  if (isLoading) return <div>Loading...</div>;

  const filteredLaunches = launches?.filter((launch) =>
    launch.name.toLowerCase().includes(search.toLowerCase())
  );
  const ExternalLinks = ({ links }:any) => {
    if (!links) return null;

    return (
      <Group>
        {links.youtube_id && (
          <Tooltip label="Watch Launch">
            <ActionIcon
              component="a"
              href={`https://www.youtube.com/watch?v=${links.youtube_id}`}
              target="_blank"
              variant="subtle"
              color="red"
            >
              <Youtube size={16} />
            </ActionIcon>
          </Tooltip>
        )}
        {links.article && (
          <Tooltip label="Read Article">
            <ActionIcon
              component="a"
              href={links.article}
              target="_blank"
              variant="subtle"
              color="blue"
            >
              <Newspaper size={16} />
            </ActionIcon>
          </Tooltip>
        )}
        {links.wikipedia && (
          <Tooltip label="Wikipedia">
            <ActionIcon
              component="a"
              href={links.wikipedia}
              target="_blank"
              variant="subtle"
              color="gray"
            >
              <Link2 size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    );
  };
  const LaunchStatusBadge = ({ success }:{success:boolean}) => {
    if (success === null)
      return (
        <Badge color="gray" variant="light">
          Upcoming
        </Badge>
      );

    return success ? (
      <Badge color="green" variant="light">
        Success
      </Badge>
    ) : (
      <Badge color="red" variant="light">
        Failed
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search launches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <thead>
            <tr>
              <th>Mission</th>
              <th>Date</th>
              <th>Status</th>
              <th>Details</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {filteredLaunches?.map((launch) => (
              <tr
                key={launch.id}
                style={{
                  backgroundColor: ` ${launch.success ? "#dbfbe3" : "#ffd8e0"}`,
                }}
                className={`${launch.success ? "bg-green-100" : "bg-red-100"}`}
              >
                <td>
                  <Link
                    to={`/launches/${launch.id}`}
                    className="text-none hover:underline"
                  >
                    {launch.name}
                  </Link>
                </td>
                <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
                <td>
                  <LaunchStatusBadge success={launch.success} />
                </td>
                <td className="max-w-md truncate">
                  {launch.details || "No details available"}
                </td>
                <td>
                  <ExternalLinks links={launch.links} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

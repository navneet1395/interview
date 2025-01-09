import { ActionIcon, Tooltip, Group } from "@mantine/core";
import { Link2, Newspaper, Youtube } from "lucide-react";

export const ExternalLinks = ({ links }: { links: any }) => {
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

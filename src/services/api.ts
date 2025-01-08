import { useQuery } from "@tanstack/react-query";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  details: string | null;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
  };
}

interface Rocket {
  id: string;
  name: string;
  description: string;
  height: { meters: number };
  mass: { kg: number };
  first_flight: string;
}

const BASE_URL = "https://api.spacexdata.com/v4";

export const useLaunches = () => {
  return useQuery({
    queryKey: ["launches"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/launches`);
      const data = await response.json();
      return data as Launch[];
    },
  });
};

export const useLaunch = (id: string) => {
  return useQuery({
    queryKey: ["launch", id],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/launches/${id}`);
      const data = await response.json();
      return data as Launch;
    },
  });
};

export const useRocket = (rocketId: string) => {
  return useQuery({
    queryKey: ["rocket", rocketId],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/rockets/${rocketId}`);
      const data = await response.json();
      return data as Rocket;
    },
  });
};

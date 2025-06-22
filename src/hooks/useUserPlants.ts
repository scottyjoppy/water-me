import { Plant } from "@/types/databaseValues";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUserPlants() {
  const { data, error, isLoading, mutate } = useSWR<{ plants: Plant[] }>(
    "/api/plants",
    fetcher
  );

  return {
    plants: data?.plants ?? [],
    error,
    isLoading,
    refresh: () => mutate(), // unchanged
  };
}

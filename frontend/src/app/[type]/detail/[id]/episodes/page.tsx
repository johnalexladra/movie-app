import { getMedia } from "@/services/movie-api";
import MediaEpisodes from "@/components/media/episodes";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function DetailEpisodes({
  params,
  searchParams,
}: {
  params: { type: MediaType; id: string };
  searchParams: { season: string };
}) {
  const media = await getMedia(params.type, params.id);
  return <MediaEpisodes media={media} season={searchParams.season} />;
}

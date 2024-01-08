import { getMedia } from "@/services/movie-api";
import MediaOverview from "@/components/media/overview";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function Detail({
  params,
}: {
  params: { type: MediaType; id: string };
}) {
  const media = await getMedia(params.type, params.id);
  return <MediaOverview media={media} />;
}

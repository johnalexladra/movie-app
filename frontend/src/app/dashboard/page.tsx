import { getRandomMedia, getTrending } from "@/services/movie-api";
import MediaCarousel from "@/components/carousel/static";
import MediaHero from "@/components/media/hero";
import { getFavoriteByType } from "@/services/server-api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/next-auth";
import { redirect } from "next/navigation";
import Favorites from "./favorite";
import Watch from "./watch";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // Check if the session is empty or the session token has expired
  if(!session) {
    redirect('/');
  }

  const trendingMovie = await getTrending("movie");
  const trendingTv = await getTrending("tv");
  const randomItem = await getRandomMedia([
    ...trendingMovie.results,
    ...trendingTv.results,
  ]);

  return (
    <main>
      <MediaHero media={randomItem} />
      <h2 className="text-3xl font-bold m-8">Hi! { session.user.firstName }, welcome back.</h2>  
      <Favorites />
      <Watch />
    </main>
  );
}
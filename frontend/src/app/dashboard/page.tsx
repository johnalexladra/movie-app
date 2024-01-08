import { getRandomMedia, getTrending } from "@/services/movie-api";
import MediaCarousel from "@/components/carousel/static";
import MediaHero from "@/components/media/hero";
import { getFavoriteByType } from "@/services/server-api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/next-auth";
import { redirect } from "next/navigation";

export const revalidate = 60 * 60 * 24; // 24 hours
export default async function Home() {
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
  const favoriteMovies = await getFavoriteByType("movie", session?.backendTokens.accessToken as string);
  const favoriteSeries = await getFavoriteByType("tv", session?.backendTokens.accessToken as string);

  return (
    <main>
      <MediaHero media={randomItem} />
      <div className="my-global space-y-5">
      {favoriteMovies && favoriteMovies.length > 0 && (
        <MediaCarousel
          title="My Favorite Movies"
          link="/movie/trending"
          items={favoriteMovies}
        />
      )}
      {favoriteSeries && favoriteSeries.length > 0 && (
        <MediaCarousel
          title="My Favorite TV Shows"
          link="/tv/trending"
          items={favoriteSeries}
        />
      )}
      </div>
    </main>
  );
}
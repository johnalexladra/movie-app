'use client';

import MediaCarousel from "@/components/carousel/static";
import { getFavoriteByType } from "@/services/server-api";
import { redirect } from "next/navigation";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";

export const revalidate = 60 * 60 * 24; // 24 hours
export default function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteSeries, setFavoriteSeries] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const movies = await getFavoriteByType("movie", session?.backendTokens.accessToken as string);
        const series = await getFavoriteByType("tv", session?.backendTokens.accessToken as string);
        setFavoriteMovies(movies || []);
        setFavoriteSeries(series || []);
      }
    };

    fetchData();
  }, [session]); 

  const handleRedirectHome = () => {
    redirect('/');
  };


  return (
    <main>
      {(favoriteMovies.length > 0) || (favoriteSeries.length > 0) ? (
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
      ):(
        <div className="flex items-center justify-between flex-col py-8">
          <h2 className="mb-8">No favorite saved</h2>
          <Link className="button-secondary" href={'/'}>Go to Home</Link>
        </div>
      )}
    </main>
  );
}

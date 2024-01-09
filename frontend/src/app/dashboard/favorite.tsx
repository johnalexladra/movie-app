'use client';

import MediaCarousel from "@/components/carousel/static";
import { getFavoriteByType } from "@/services/server-api";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFavoriteMovies, setFavoriteSeries } from "@/redux/features/favoriteSlice";
// import useFavorites from "@/hooks/useFavorites"; // 

export const revalidate = 60 * 60 * 24; // 24 hours
export default function Favorites() {
  const favoriteMovies = useSelector((state: RootState) => state.favorites.movies);
  const favoriteSeries = useSelector((state: RootState) => state.favorites.series);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const movies = await getFavoriteByType('movie', session?.backendTokens.accessToken as string);
        const series = await getFavoriteByType('tv', session?.backendTokens.accessToken as string);
        dispatch(setFavoriteMovies(movies || []));
        dispatch(setFavoriteSeries(series || []));
      }
    };

    fetchData();
  }, [session, dispatch]);

  // or use useFavorites hook

  // const { favoriteMovies, favoriteSeries } = useFavorites();

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

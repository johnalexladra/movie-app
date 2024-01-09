'use client';

import MediaCarousel from "@/components/carousel/static";
import { getWatchMovies } from "@/services/server-api";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setWatchMovies } from "@/redux/features/watchSlice";

export const revalidate = 60 * 60 * 24; // 24 hours
export default function Watch() {
  const watchMovies = useSelector((state: RootState) => state.watch.movies);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const movies = await getWatchMovies(session?.backendTokens.accessToken as string);
        dispatch(setWatchMovies(movies || []));
      }
    };

    fetchData();
  }, [session, dispatch]);

  // or use useFavorites hook

  // const { favoriteMovies, favoriteSeries } = useFavorites();

  return (
    <main>
      {(watchMovies.length > 0) ? (
      <div className="my-global space-y-5">
        {watchMovies && watchMovies.length > 0 && (
          <MediaCarousel
            title="Watch Later"
            link="/movie/trending"
            items={watchMovies}
          />
        )}
      </div>
      ):(
        <div className="flex items-center justify-between flex-col py-8">
          <h2 className="mb-8">No watch later added</h2>
        </div>
      )}
    </main>
  );
}

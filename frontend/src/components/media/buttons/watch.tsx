"use client";

import { createWatch, deleteWatch, getWatchById } from "@/services/server-api";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/redux/store";
import { setWatchStatus, setAddingStatus } from '@/redux/features/watchButtonSlice';
import { PiEye, PiEyeSlash } from "react-icons/pi";

const WatchButton = ({ media }: { media: Media }) => {
  const { data: session } = useSession();
  const { isWatch, isAdding } = useSelector((state: RootState) => state.watchButton);
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchWatchStatus = async () => {
      if (session) {
        try {
          const watch: any | null = await getWatchById(+media.id, session?.backendTokens.accessToken ?? "");
          // setIsWatch(!!watch);
          dispatch(setWatchStatus(!!watch));
        } catch (error) {
          console.error("Error fetching watch status:", error);
        }
      }
    };

    fetchWatchStatus();
  }, [session, +media.id, dispatch]);

  const handleToggleWatch = async () => {
    if (session) {
      dispatch(setAddingStatus(true));
      try {
        if (isWatch) {
          // Remove from watchs
          await deleteWatch(+media.id, session?.backendTokens.accessToken ?? "");
        } else {
          // Add to watchs
          const mediaData = {
            backdrop_path: media.backdrop_path,
            homepage: media.homepage || '', 
            id: +media.id,
            original_title: media.original_title || '', 
            popularity: media.popularity,
            poster_path: media.poster_path,
            // title: media.title || media.name || '', 
            title: media.title || '', 
            name: media.name || '',
            media_type: media.name ? "tv" : "movie",
            vote_average: media.vote_average,
            vote_count: media.vote_count,
          };
          // Adding.. indication
          await createWatch(mediaData, session?.backendTokens.accessToken ?? "");
          // setIsWatch(true);
        }
        dispatch(setWatchStatus(!isWatch));
      } catch (error) {
        console.error("Error toggling watch:", error);
      } finally {
        // setIsAdding(false);
        dispatch(setAddingStatus(false));
      }
    }
  };

  if (!session) {
    return null;
  }

  return (
    <button onClick={handleToggleWatch} disabled={isAdding} className="">
      {isAdding ? 'Adding..' : (isWatch ? <PiEyeSlash className="w-6 h-6" /> : <PiEye className="w-6 h-6" />)}
    </button>
  );
};

export default WatchButton;

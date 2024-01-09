"use client";

import { createFavorite, deleteFavorite, getFavoriteById } from "@/services/server-api";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/redux/store";
import { setFavoriteStatus, setAddingStatus } from '@/redux/features/favoriteButtonSlice';

const FavoriteButton = ({ media }: { media: Media }) => {
  const { data: session } = useSession();
  const { isFavorite, isAdding } = useSelector((state: RootState) => state.favoriteButton);
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (session) {
        try {
          const favorite: any | null = await getFavoriteById(+media.id, session?.backendTokens.accessToken ?? "");
          // setIsFavorite(!!favorite);
          dispatch(setFavoriteStatus(!!favorite));
        } catch (error) {
          console.error("Error fetching favorite status:", error);
        }
      }
    };

    fetchFavoriteStatus();
  }, [session, +media.id, dispatch]);

  const handleToggleFavorite = async () => {
    if (session) {
      dispatch(setAddingStatus(true));
      try {
        if (isFavorite) {
          // Remove from favorites
          await deleteFavorite(+media.id, session?.backendTokens.accessToken ?? "");
        } else {
          // Add to favorites
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
          await createFavorite(mediaData, session?.backendTokens.accessToken ?? "");
          // setIsFavorite(true);
        }
        dispatch(setFavoriteStatus(!isFavorite));
      } catch (error) {
        console.error("Error toggling favorite:", error);
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
    <button onClick={handleToggleFavorite} disabled={isAdding} className="button-secondary">
      {isAdding ? 'Adding..' : (isFavorite ? 'Remove from Favorites' : 'Add to Favorites')}
    </button>
  );
};

export default FavoriteButton;

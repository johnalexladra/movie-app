"use client";

import { createMovie, deleteMovie, getMovieById } from "@/services/server-api";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from 'react';

const MovieFavoriteButton = ({ media }: { media: Media }) => {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (session) {
        try {
          const favorite: any | null = await getMovieById(+media.id, session?.backendTokens.accessToken ?? "");
          setIsFavorite(!!favorite);
        } catch (error) {
          console.error("Error fetching favorite status:", error);
        }
      }
    };

    fetchFavoriteStatus();
  }, [session, +media.id]);

  const handleToggleFavorite = async () => {
    if (session) {
      setIsAdding(true);
      try {
        if (isFavorite) {
          // Remove from favorites
          await deleteMovie(+media.id, session?.backendTokens.accessToken ?? "");
          setIsFavorite(false);
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
          await createMovie(mediaData, session?.backendTokens.accessToken ?? "");
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      } finally {
        setIsAdding(false);
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

export default MovieFavoriteButton;

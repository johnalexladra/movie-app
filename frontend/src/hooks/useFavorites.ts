import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSession  } from "next-auth/react";
import { getFavoriteByType } from "@/services/server-api";
import { useEffect } from "react";
import { setFavoriteMovies, setFavoriteSeries } from "@/redux/features/favoriteSlice";

export const revalidate = 60 * 60 * 24; // 24 hours

const useFavorites = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const favoriteMovies = useSelector((state: RootState) => state.favorites.movies);
  const favoriteSeries = useSelector((state: RootState) => state.favorites.series);

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

  return { favoriteMovies, favoriteSeries };
};

export default useFavorites;

interface ServerErrorResponse {
  response: {
    data: {
      statusCode: number | string;
      message: string[] | string;
    };
  };
}

interface DbServerErrorResponse {
  response: {
    status: number | string;
    data: {
      status_message: string;
    };
  };
}

interface LoginData{
  email: string;
  password: string;
}

interface UserData extends LoginData {
  name: string;
}

interface ApiMovieData {
  backdrop_path  :string;
  homepage       :string;
  id             :number;
  original_title :string;
  popularity     :number;
  poster_path    :string;
  title          :string;
  name           :string;
  media_type     :string;
  vote_average   :number;
  vote_count     :number;
}

interface MovieData extends ApiMovieData {
  id: number;
}

interface LoginResponse {
  access_token: string;
}

interface DbMovieLoaderData {
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
}

interface DbMovieCardLoaderData {
  title: string;
  overview: string;
  homepage: string;
  poster_path: string;
  genres: {
      name: string;
  }[];
}

interface PageProps {
  searchParams: { error?: string }
}
export interface ServerErrorResponse {
  response: {
    data: {
      statusCode: number | string;
      message: string[] | string;
    };
  };
}

export interface DbServerErrorResponse {
  response: {
    status: number | string;
    data: {
      status_message: string;
    };
  };
}

export interface LoginData{
  email: string;
  password: string;
}

export interface UserData extends LoginData {
  name: string;
}

export interface ApiMovieData {
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

export interface MovieData extends ApiMovieData {
  id: number;
}

export interface LoginResponse {
  access_token: string;
}

export interface DbMovieLoaderData {
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
}

export interface DbMovieCardLoaderData {
  title: string;
  overview: string;
  homepage: string;
  poster_path: string;
  genres: {
      name: string;
  }[];
}
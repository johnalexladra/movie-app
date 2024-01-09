import axios from "axios";
import { getServerSession } from "next-auth/next"
import { SERVER_URL } from "@/constants";

// Function to get the NextAuth session token on the server side
async function getSessionToken() {
  const session = await getServerSession();

  return session || '';
}

export async function login(data: LoginData) {
  const res = await axios.post(`${SERVER_URL}/auth/login`, data);
  return res.data;
}

export async function createUser(data: UserData) {
  const res = await axios.post(`${SERVER_URL}/auth/register`, data);
  return res.data;
}

export async function checkUser(email: string) {
  const res = await axios.get(`${SERVER_URL}/user?email=${email}`);
  return res;
}

export async function getUsers(token: string) {
  const res = await axios.get(`${SERVER_URL}/user/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}

export async function deleteUser(id: string) {

}

export async function getMovies(token: string) {
  const res = await axios.get(`${SERVER_URL}/favorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}

export async function getFavoriteByType(type: string, token: string) {
  const res = await axios.get(`${SERVER_URL}/favorite/findByFilter/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}

export async function getFavoriteById(id:number,token: string) {
  const res = await axios.get(`${SERVER_URL}/favorite/${id}`, {
    headers: {
    Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}

export async function createFavorite(data:ApiMovieData, token:string) {
  const res = await axios.post(`${SERVER_URL}/favorite`, 
    data, {
      headers: {
      Authorization: `Bearer ${token}`,
      }
    }
  );
  return res.data;
}

export async function editFavorite(id:number, data:ApiMovieData) {
  const res = await axios.patch(`${SERVER_URL}/favorite/${id}`,
    data, {
      headers: {
        Authorization: `Bearer ${getSessionToken()}`,
      }
    }
  );
  return res.data;
}

export async function deleteFavorite(id:number, token: string) {
  const res = await axios.delete(`${SERVER_URL}/favorite/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return res;
}

// WATCH
export async function getWatchMovies(token: string) {
  const res = await axios.get(`${SERVER_URL}/watch`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}

export async function getWatchById(id:number,token: string) {
  const res = await axios.get(`${SERVER_URL}/watch/${id}`, {
    headers: {
    Authorization: `Bearer ${token}`,
    }
  });
  return res.data;
}

export async function createWatch(data:ApiMovieData, token:string) {
  const res = await axios.post(`${SERVER_URL}/watch`, 
    data, {
      headers: {
      Authorization: `Bearer ${token}`,
      }
    }
  );
  return res.data;
}

export async function editWatch(id:number, data:ApiMovieData) {
  const res = await axios.patch(`${SERVER_URL}/watch/${id}`,
    data, {
      headers: {
        Authorization: `Bearer ${getSessionToken()}`,
      }
    }
  );
  return res.data;
}

export async function deleteWatch(id:number, token: string) {
  const res = await axios.delete(`${SERVER_URL}/watch/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return res;
}
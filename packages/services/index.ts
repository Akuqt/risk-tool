import axios, { AxiosResponse, AxiosError } from "axios";
const baseURL = "http://localhost:4000/api/v1";

export const Post = async <T>(
  url: string,
  body: object,
  token = "",
): Promise<AxiosResponse<T>> => {
  return await axios
    .post(url, body, {
      withCredentials: true,
      timeout: 2000,
      baseURL,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((e: AxiosError<T>) => {
      return e.response as AxiosResponse<T>;
    });
};

export const Get = async <T>(
  url: string,
  token = "",
): Promise<AxiosResponse<T>> => {
  return await axios
    .get(url, {
      withCredentials: true,
      timeout: 2000,
      baseURL,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((_e: AxiosError<T>) => {
      return _e.response as AxiosResponse<T>;
    });
};

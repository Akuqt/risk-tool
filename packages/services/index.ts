import axios, { AxiosResponse, AxiosError } from "axios";

export const Post = async <T>(
  url: string,
  body: object,
  token = "",
): Promise<AxiosResponse<T>> => {
  return await axios
    .post(url, body, {
      withCredentials: true,
      timeout: 2000,
      baseURL: "" + "/api/v1",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((_e: AxiosError<T>) => {
      return _e.response as AxiosResponse<T>;
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
      baseURL: "" + "/api/v1",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((_e: AxiosError<T>) => {
      return _e.response as AxiosResponse<T>;
    });
};

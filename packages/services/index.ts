import axios, { AxiosResponse, AxiosError } from "axios";
const baseURL1 = "http://10.0.2.2:4000/api/v1";
const baseURL2 = "http://localhost:4000/api/v1";

export const Post = async <T>(
  type: "mobile" | "web",
  url: string,
  body: object,
  token = "",
): Promise<AxiosResponse<T>> => {
  return await axios
    .post(url, body, {
      withCredentials: true,
      timeout: 2000,
      baseURL: type === "mobile" ? baseURL1 : baseURL2,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((e: AxiosError<T>) => {
      return e.response as AxiosResponse<T>;
    });
};

export const Get = async <T>(
  type: "mobile" | "web",
  url: string,
  token = "",
): Promise<AxiosResponse<T>> => {
  return await axios
    .get(url, {
      withCredentials: true,
      timeout: 2000,
      baseURL: type === "mobile" ? baseURL1 : baseURL2,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((_e: AxiosError<T>) => {
      return _e.response as AxiosResponse<T>;
    });
};

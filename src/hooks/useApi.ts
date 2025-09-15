// import axios, { AxiosInstance } from "axios";
// import { useCookies } from "react-cookie";

// export function useApi() {

//   const headers = {
//     "Content-Type": "application/json",
//     "Access-control-Allow-Origin": "*",
     
//   };

//    const [cookies, setCookie] = useCookies(["access", "refresh"]);


//   const api: AxiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_LOCAL_URL,
//     headers
//   });


//   api.interceptors.request.use((config) => {
//    // A chaque requete sortante Aller dans le cache pour recuperer le token
//    const token = cookies.access
//    //  et l'injecter dans la requete
//    token ? (config.headers["Authorization"] = "Bearer " + token) : "";
//    return config
//   });

//   api.interceptors.response.use((response) => {
//     return response
//   }, (error) => {
//     if(error?.response.status === 401 && !!cookies.refresh) {
//       const token = cookies.refresh
//       const refreshReq: AxiosInstance = axios.create({
//         baseURL: import.meta.env.VITE_API_LOCAL_URL,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-control-Allow-Origin": "*",
//           "Authorization": "Bearer " + token
//         }
//       })
//       const getNewTokens = async (): Promise<any> => {
//         return refreshReq.get("/auth/refresh")
//       }

//       (async() => {
//         const newTokens = await getNewTokens()
//         setCookie("access", newTokens?.data.access_token);
//         setCookie("refresh", newTokens?.data.refresh_token);
        
//         return api.request(error.config)
//       })()

//     }
//     return error
//   })

//   return api;
// }

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { useCookies } from "react-cookie";

export function useApi(): AxiosInstance {
  const [cookies, setCookie] = useCookies(["access", "refresh"]);

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_LOCAL_URL,
    headers: { "Content-Type": "application/json" },
  });

  api.interceptors.request.use((config) => {
    const token = cookies.access;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }) => {
      const originalRequest = error.config!;
  
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        cookies.refresh
      ) {
        originalRequest._retry = true;

        try {
          
          const refreshResponse = await axios.get(
            `${import.meta.env.VITE_API_LOCAL_URL}auth/refresh`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.refresh}`,
              },
            }
          );

          const { access_token, refresh_token } = refreshResponse.data;

          
          setCookie("access", access_token,   { path: "/" });
          setCookie("refresh", refresh_token, { path: "/" });

          
          originalRequest.headers!["Authorization"] = `Bearer ${access_token}`;
          return axios(originalRequest);
        } catch (refreshErr) {
          
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

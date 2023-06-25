import axios from "axios";

// eslint-disable-next-line no-unused-vars
const token = () => localStorage.getItem("access");

const instance = axios.create({
  // baseURL: "https://openpayroll.herokuapp.com/api/",
  baseURL: "http://127.0.0.1:8000/api/",
});

// Use interceptor to inject the token to requests
// instance.interceptors.request.use((config) => {
//   // eslint-disable-next-line no-param-reassign
//   config.headers.common.authorization = `Bearer ${token()}`;
//   // config.headers.cont
//   return config;
// });

// instance.interceptors.response.use(
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   (response) => response,
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         localStorage.clear();
//         window.location = "/login";
//       }
//     }
//     // else {
//     //   localStorage.clear();
//     //   window.location = '/signin';
//     // }
//     return Promise.reject(error);
//   }
// );

export default instance;

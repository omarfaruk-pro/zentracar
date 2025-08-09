import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react";

const axiosInstence = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})
export default function useAxiosSecure() {
    const { user, userLogout } = useAuth();



    useEffect(() => {

        const requestInterceptor = axiosInstence.interceptors.request.use((config) => {
            if (user?.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            } else {
                delete config.headers.authorization;
            }
            return config;
        });


        const responseInterceptor = axiosInstence.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error?.response?.status;
                if (status === 401 || status === 403) {
                    userLogout().catch(() => { });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstence.interceptors.request.eject(requestInterceptor);
            axiosInstence.interceptors.response.eject(responseInterceptor);
        };
    }, [ user, userLogout]);



    return axiosInstence;
}

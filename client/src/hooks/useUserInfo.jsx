
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useUserInfo() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; 

    const fetchUserInfo = async () => {
      try {
        const res = await axiosSecure.get(`/user/${user.email}`);
        setUserInfo(res.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch user info",
        });
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [axiosSecure, user.email]);

  return { userInfo, loading };
}

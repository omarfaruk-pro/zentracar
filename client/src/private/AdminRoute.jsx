
import Loading from "../component/Loading";
import useUserInfo from "../hooks/useUserInfo"
import Forbidden from "../Pages/dashboard/forbidden/Forbidden";

export default function AdminRoute({children}) {
    const {userInfo, loading} = useUserInfo();
    if(loading){
        return <Loading></Loading>
    }
    if(userInfo?.role !== 'admin'){
        return (
            <Forbidden role="Admin"/>
        )
    }
  return children;
}

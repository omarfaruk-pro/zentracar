
import Loading from "../component/Loading";
import useUserInfo from "../hooks/useUserInfo"
import Forbidden from "../Pages/dashboard/forbidden/Forbidden";

export default function OwnerRoute({children}) {
    const {userInfo, loading} = useUserInfo();
    if(loading){
        return <Loading></Loading>
    }
    if(userInfo?.role !== 'owner'){
        return (
            <Forbidden role="Owner"/>
        )
    }
  return children;
}

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";


export default function GoogleLoginBtn() {
    const {googleLogin} = useAuth();
    const {state} = useLocation();
    const navigate = useNavigate();
    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Login successful",
                    timer: 3000,
                })
                navigate(state?.from || "/");
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: error.message,
                    timer: 3000,
                })
            })
    }
    return (
        <>
            <button onClick={handleGoogleLogin} type="button" className="cursor-pointer flex justify-center items-center gap-2 rounded-md w-full text-xl py-2 bg-white text-black border-[#e5e5e5]">
                <FcGoogle></FcGoogle>
                Login with Google
            </button>
        </>
    )
}

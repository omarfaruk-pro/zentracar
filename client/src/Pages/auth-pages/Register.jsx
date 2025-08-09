
import { Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottie-animation/register.json"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useState } from "react";
import { uploadImageToImgbb } from "../../utils/Photoupload";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GoogleLoginBtn from "./GoogleLogin";

export default function Register() {
  const { userRegister } = useAuth();
  const [photoURL, setPhotoURL] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const handlePhoto = async (e) => {
    const url =await uploadImageToImgbb(e.target.files[0]);
    setPhotoURL(url);
  }
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = photoURL;


    userRegister(email, password)
      .then(() => {
        const displayName = name;
        const finalPhotoURL = photo;
        updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: finalPhotoURL,
        });
        e.target.reset();
        
        axiosSecure.post("/users", {
          name: displayName,
          email,
          photoURL: finalPhotoURL,
          role: "user",
        });
        Swal.fire({
          icon: "success",
          title: `${name} has been registered successfully`,
          timer: 3000,
        });

        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          timer: 3000,
        })
      });
  }

    const inputClass =
        'mt-1 py-2 px-3 block w-full rounded-md bg-gray-700 dark:bg-gray-200 dark:text-gray-700 dark:border-gray-300 border border-gray-600 text-gray-300';
    const labelClass = 'block text-sm font-medium';

  return (
    <>
      <section className="py-20 px-5">
        <h2 className="text-center text-4xl font-extrabold pb-5">Register</h2>
        <div className="lg:max-w-5xl md:max-w-3xl sm:max-w-xl px-5 mx-auto grid md:grid-cols-2 items-center gap-10 mt-10">
          <form onSubmit={handleRegister}
            className="p-6 bg-gray-900 shadow-md rounded-lg space-y-4 text-white dark:bg-gray-100 dark:text-gray-900"
          >
             <div>
              <label className={labelClass}>Upload Photo
                <img className="w-20 h-20 object-cover rounded-full" src={photoURL || 'https://www.w3schools.com/howto/img_avatar.png'} alt="" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  name="photo"
                  className='hidden'
                />
              </label>
            </div>

            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                name="name"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                className={inputClass}
                required
              />

            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                name="password"
                className={inputClass}
                required
              />

            </div>


            <button
              disabled={!photoURL}
              title={!photoURL ? 'Please wait for photo upload' : ''}
              type="submit"
              className={` block w-full text-xl bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${!photoURL ? 'opacity-50 bg-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Register
            </button>
            <GoogleLoginBtn></GoogleLoginBtn>
            <p>Already have an account? <Link to="/login" className="font-semibold underline ml-1">Login here</Link></p>

          </form>
          <div>
            <Lottie animationData={registerAnimation} loop={true} className="w-full"></Lottie>
          </div>
        </div>
      </section>
    </>
  )
}

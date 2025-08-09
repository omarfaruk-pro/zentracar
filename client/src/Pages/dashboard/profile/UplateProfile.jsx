
import { useState } from "react";
import { FaCamera, FaSave } from "react-icons/fa"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImageToImgbb } from "../../../utils/Photoupload";
import useAuth from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import useUserInfo from "../../../hooks/useUserInfo";
import Swal from "sweetalert2";

export default function UpdateProfile() {

    const { user } = useAuth();
    const [photoURL, setPhotoURL] = useState(user?.photoURL);
    const axiosSecure = useAxiosSecure();
    const {userInfo} = useUserInfo();
    let [isPending, setIsPending] = useState(false);
    const handlePhoto = async (e) => {
        setIsPending(true);
        const url = await uploadImageToImgbb(e.target.files[0]);
        setPhotoURL(url);
        setIsPending(false);
    }
    const updateProfileSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(auth.currentUser, {
          displayName: e.target.name.value,
          photoURL
        });

        const updatedUser = {
            name: e.target.name.value,
            photoURL,
        };
        
        axiosSecure.patch(`/user/${userInfo?._id}`, updatedUser)
        .then(res => {
            if(res.data.modifiedCount){
                Swal.fire({
                    icon: "success",
                    title: "Profile updated successfully",
                  });
            }
        })
    };

    const inputClass =
        'mt-1 py-2 px-3 block w-full rounded-md bg-gray-200 text-gray-900 border-gray-300 border focus:outline-none';
    const labelClass = 'block text-sm font-medium';

    return (
        <div className="h-full">
            <h2 className="text-3xl font-bold mb-10">Update Profile</h2>
            <form
                onSubmit={updateProfileSubmit}
                className="p-6 bg-gray-900 shadow-md rounded-lg space-y-4 text-white dark:bg-gray-100 dark:text-gray-900"
            >
                {/* Profile Photo */}
                <div className="flex flex-col items-center space-y-2">
                    <label className="relative cursor-pointer">
                        <img
                            src={
                                photoURL ||
                                "https://www.w3schools.com/howto/img_avatar.png"
                            }
                            alt={user?.displayName}
                            className="w-28 h-28 object-cover rounded-full border"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhoto}
                            name="photo"
                            className='hidden'
                        />
                        <span className="absolute bottom-1 right-2 bg-blue-600 text-white p-1 rounded-full">
                            <FaCamera size={16} />
                        </span>
                    </label>
                    <p className="text-sm text-gray-500">Click to change photo</p>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full">
                        <label className={labelClass}>Full Name</label>
                        <input
                            type="text"
                            defaultValue={user?.displayName}
                            name="name"
                            className={inputClass}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block mb-1 font-semibold">Email</label>
                        <input
                            type="email"
                            readOnly
                            defaultValue={user?.email}
                            className="w-full border bg-gray-100 px-4 py-2 rounded-md cursor-not-allowed text-gray-600"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className={`flex items-center gap-2 mx-auto bg-blue-600 text-white px-6 py-3 rounded-md transition ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'}`}
                >
                    <FaSave />Save Changes
                </button>

            </form>
        </div>
    );
}

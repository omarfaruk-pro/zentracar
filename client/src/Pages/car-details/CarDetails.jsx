
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../component/Loading";
import { FaArrowLeftLong, FaXmark } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function CarDetails() {
    const {state} = useLocation();
    const today = new Date();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(startDate);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        setEndDate(startDate);
    }, [startDate])
    const [startTime, setStartTime] = useState(null);
    const { user } = useAuth();
    const [modal, setModal] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { id } = useParams();
    const [isloading, setIsLoading] = useState(true);

    const [car, setCar] = useState({});
    useEffect(() => {
        axiosSecure(`/car/${id}`)
            .then(res => {
                setCar(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: err.message,
                    timer: 5000,
                    showCloseButton: true
                })
            })
    }, [axiosSecure, id])

    const { availability, carModel, carName, description, features, vehicleRegistrationNumber, location, dailyRentalPrice, imageUrl } = car;

    if (isloading) {
        return <Loading></Loading>
    }


    const handleModalOpen = () => {
        if (!user) {
            return navigate('/login', { state: { from: pathname } })
        }
        setModal(!modal);
    }
    const handleModal = (e) => {
        if (e.target.getAttribute('data-attribute') === 'modal') {
            setModal(!modal);
        };

    }

    const handleBooking = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const bookingData = Object.fromEntries(formData.entries());
        bookingData.imageUrl = imageUrl;
        bookingData.carName = carName;
        bookingData.carModel = carModel;
        bookingData.dailyRentalPrice = dailyRentalPrice;
        bookingData.userEmail = user.email;
        bookingData.userName = user.displayName;
        bookingData.carID = id;
        bookingData.bookingStatus = "pending";
        bookingData.paymentStatus = "unpaid";

        axiosSecure.post(`/bookings`, bookingData)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset();
                    setModal(false);
                    Swal.fire({
                        title: "Good job!",
                        text: "Booking submitted successfully",
                        icon: "success",
                        timer: 3000
                    });
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: err.message,
                    timer: 3000,
                    showCloseButton: true
                })
            })


    }

    return (
        <section className="py-20">
            <div className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl px-5 mx-auto">
                <Link to={state} className="btn btn-primary"> <FaArrowLeftLong /> Go Back</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
                    <div>
                        <img src={imageUrl} alt={carName} className="w-full rounded-xl" />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold">{carName}</h2>
                        <p className="font-semibold">{carModel}</p>
                        <p ><strong>Reg No: </strong>{vehicleRegistrationNumber}</p>
                        <p ><strong>Location:</strong> {location}</p>
                        <p ><strong>Availability:</strong> {availability}</p>
                        <p ><strong>Description:</strong> {description}</p>
                        <div className="flex flex-wrap gap-2 items-center">
                            <strong>Feature:</strong>
                            {features?.map(feature => <span key={feature} className="bg-green-600 px-2 py-1 rounded-md">{feature}</span>)}
                        </div>
                        <p ><strong>Price:</strong> ${dailyRentalPrice}/day</p>
                        <button disabled={availability === "Unavailable"} type="button" onClick={() => handleModalOpen()} className={` bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md ${availability == "Unavailable" ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
            <div data-attribute="modal" onClick={(e) => handleModal(e)} className={`h-screen w-screen bg-[#000000a5] fixed top-0 left-0 flex justify-center items-center z-20 py-10 duration-300 ease-linear ${modal ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                <div className="bg-white p-5 rounded-xl max-w-lg w-full text-gray-800 dark:text-white relative overflow-y-auto max-h-full">
                    <div><button onClick={() => setModal(!modal)} className="cursor-pointer absolute top-3 right-2 p-2 bg-primary text-white text-xl rounded-full"><FaXmark /></button></div>
                    <div>
                        <img className="w-full h-50 object-cover mb-5" src={imageUrl} alt="" />
                        <h2 className="text-2xl font-bold">{carName}</h2>
                        <p className="py-1"><strong>Model:</strong> {carModel}</p>
                        <p><strong>Price:</strong> ${dailyRentalPrice}/day</p>
                        <form onSubmit={handleBooking} className="mt-5">
                            <div className="flex gap-2">
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Booking Date</label>
                                    <DatePicker
                                        name="bookingStartDate"
                                        minDate={today}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yyyy" wrapperClassName="w-full"
                                        required
                                        className="mt-1 py-2 px-3 block w-full rounded-md bg-gray-800 dark:bg-gray-200 dark:text-gray-700 dark:border-gray-300 border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium">Booking Date</label>
                                    <DatePicker
                                        name="bookingEndDate"
                                        minDate={startDate}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)} dateFormat="dd-MM-yyyy" wrapperClassName="w-full"
                                        required
                                        className="mt-1 py-2 px-3 block w-full rounded-md bg-gray-800 dark:bg-gray-200 dark:text-gray-700 dark:border-gray-300 border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>

                            <div className="flex gap-2 items-end">
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Booking Time</label>
                                    <DatePicker
                                        selected={startTime}
                                        onChange={(time) => setStartTime(time)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Select booking time"
                                        wrapperClassName="w-full"
                                        name="bookingTime"
                                        required
                                        autoComplete="off"
                                        className="mt-1 py-2 px-3 block w-full rounded-md bg-gray-800 dark:bg-gray-200 dark:text-gray-700 dark:border-gray-300 border border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="text-center w-full">
                                    <button type="submit" className="btn btn-primary mt-3 w-full">Book</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CarsGrid from "../available-cars/CarsGrid";
import Loading from "../../component/Loading";

export default function RecentListing() {
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState([]);
    useEffect(() => {
        axios(`${import.meta.env.VITE_BASE_URL}/cars?home=true`)
            .then(res => {
                setCars(res.data);
                setIsLoading(false);
            })
        }, [])

  return (
    <>
        <section className="py-20">
            <div className="container">
                <h2 className="text-center text-4xl font-bold mb-2">Recent Listings</h2>
                <p className="text-center text-xl">Explore our latest listings of cars</p>

                {
                    isLoading && <Loading></Loading>
                }

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {
                        cars.map(car => <CarsGrid key={car._id} car={car}></CarsGrid>)
                    }
                </div>
            </div>
        </section>
    </>
  )
}

import { FaCar, FaRoad, FaSmile } from "react-icons/fa";
import { Link } from "react-router";

export default function AboutUs() {
    return (
        <>
            <section className="relative  text-white bg-[url('https://images.unsplash.com/photo-1609507719752-c5ee71ef1705')] bg-cover bg-center after:h-full after:w-full after:bg-black/70 after:absolute after:top-0 after:left-0 after:z-0">
                <div className="max-w-6xl mx-auto px-6 py-40 text-center relative z-2">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        About <span className="text-primary">ZentraCar</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg opacity-90">
                        Your trusted partner for fast, affordable, and hassle-free car
                        rentals — anywhere, anytime.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-10 items-center">
                <div className="relative group">
                    <img
                        src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
                        alt="Car keys"
                        className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute -bottom-6 left-6 bg-white text-gray-800 shadow-lg rounded-xl p-4 w-56">
                        <h4 className="font-semibold text-lg">Over 10 Years</h4>
                        <p className="text-sm text-gray-600">
                            Of trusted car rental service experience.
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                    <p className="mb-4">
                        ZentraCar was founded with a mission: to make car rentals as simple
                        as ordering a cup of coffee. We started small, but our passion for
                        innovation and customer satisfaction has driven us to become one of
                        the most reliable rental services in the region.
                    </p>
                    <p>
                        With a fleet that ranges from compact city cars to luxury SUVs, we
                        cater to every journey — whether it's a quick trip downtown or a
                        cross-country adventure.
                    </p>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-gray-800 dark:bg-gray-50">
                <div className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl mx-auto px-5">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why Choose ZentraCar?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 text-center bg-gray-900  dark:bg-white rounded-lg duration-300 linear hover:shadow-xl shadow-lg transition">
                            <FaCar className="text-5xl text-orange-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Wide Vehicle Range</h3>
                            <p>
                                From economy to luxury, our diverse fleet ensures you always
                                find the perfect ride.
                            </p>
                        </div>

                        <div className="p-6 text-center bg-gray-900  dark:bg-white rounded-lg duration-300 linear hover:shadow-xl shadow-lg transition">
                            <FaRoad className="text-5xl text-orange-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Nationwide Availability
                            </h3>
                            <p>
                                Pick up and drop off your car at any of our branches across the
                                country.
                            </p>
                        </div>

                        <div className="p-6 text-center bg-gray-900  dark:bg-white rounded-lg duration-300 linear hover:shadow-xl shadow-lg transition">
                            <FaSmile className="text-5xl text-orange-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                            <p>
                                24/7 support, transparent pricing, and flexible rental plans to
                                suit your needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-gradient-to-r from-[#176AE5] to-[#605dff] bg-[url('https://images.unsplash.com/photo-1580654712603-eb43273aff33')] bg-cover bg-center after:h-full after:w-full after:absolute after:bg-gradient-to-r after:from-[#000] after:to-[#010201] after:left-0 after:top-0 after:opacity-70">
                <div className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-xl mx-auto  text-white py-30 text-center relative z-2">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="mb-6 opacity-90">
                        Book your next ride today with ZentraCar and travel without limits.
                    </p>
                    <Link to="/available-cars" className="btn btn-primary">
                        Book Now
                    </Link>
                </div>
            </section>
        </>
    );
}

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const faqs = [
    {
        question: "What documents do I need to rent a car?",
        answer:
            "You need a valid driver's license, a credit/debit card, and an ID proof. International renters may require a passport and international driving permit.",
    },
    {
        question: "Can I cancel or modify my booking?",
        answer:
            "Yes, cancellations or modifications can be made up to 24 hours before the rental start time without penalty.",
    },
    {
        question: "Is insurance included in the rental price?",
        answer:
            "Basic insurance coverage is included. Additional insurance options are available at extra cost during booking.",
    },
    {
        question: "What is your fuel policy?",
        answer:
            "Cars are provided with a full tank and should be returned full. Otherwise, refueling charges apply.",
    },
];

export default function ContactUs() {
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitSuccess(true);
    };


    const inputClass =
        'mt-1 py-2 px-3 block w-full rounded-md bg-gray-700 dark:bg-gray-200 dark:text-gray-700 dark:border-gray-300 border border-gray-600 text-gray-300';
    const labelClass = 'block text-sm font-medium';

    return (
        <>
            <section>
                <div className="container py-20">
                    <h1 className="text-4xl font-bold mb-2 md:mb-10 text-center">Contact Us</h1>
                    <p className="text-lg md:hidden text-center mb-10">
                        We’d love to hear from you! Whether you have a question, feedback, or need support,
                        reach out anytime.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Contact Info */}
                        <div className="space-y-8 order-2 md:order-1">
                            <div className="hidden md:block">
                                <h2 className="text-2xl font-semibold mb-4 ">Get in Touch</h2>
                                <p className="text-lg">
                                    We’d love to hear from you! Whether you have a question, feedback, or need support,
                                    reach out anytime.
                                </p>
                            </div>

                            <div className="grid xl:grid-cols-2 gap-6 ">

                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex items-center p-5 bg-gray-900 dark:bg-gray-100 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex justify-center items-center max-w-14 w-full h-14 bg-orange-100 rounded-full mr-4">
                                            <FaMapMarkerAlt className="text-primary text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold">Our Location</h4>
                                            <p className="">123 Main Street, Dhaka, Bangladesh</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center p-5 bg-gray-900 dark:bg-gray-100 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex justify-center items-center max-w-14 w-full h-14 bg-orange-100 rounded-full mr-4">
                                            <FaPhoneAlt className="text-primary text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold">Call Us</h4>
                                            <a
                                                href="tel:+880123456789"
                                                className=" hover:text-orange-500 transition"
                                            >
                                                +880 1234 56789
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center p-5 bg-gray-900 dark:bg-gray-100 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex justify-center items-center max-w-14 w-full h-14 bg-orange-100 rounded-full mr-4">
                                            <FaEnvelope className="text-primary text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold">Email Us</h4>
                                            <a
                                                href="mailto:support@zentracar.com"
                                                className=" hover:text-orange-500 transition"
                                            >
                                                support@zentracar.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900 dark:bg-gray-100 shadow-md rounded-xl p-6 flex flex-col justify-center items-center text-center">
                                    <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                                    <p className="opacity-80 mb-6">
                                        Stay connected with ZentraCar for updates, offers, and travel tips.
                                    </p>

                                    <div className="flex gap-4">
                                        <a
                                            href="https://www.facebook.com/developeromarfaruk"
                                            className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full hover:bg-primary text-black hover:text-white transition-colors duration-300"
                                        >
                                            <FaFacebookF />
                                        </a>
                                        <a
                                            href="https://x.com/omarfaruk56305"
                                            className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full hover:bg-primary text-black hover:text-white transition-colors duration-300"
                                        >
                                            <FaTwitter />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/omarfaruk56305"
                                            className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full text-black hover:bg-primary hover:text-white transition-colors duration-300"
                                        >
                                            <FaLinkedinIn />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/omarfaruk56305"
                                            className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full hover:bg-primary text-black hover:text-white transition-colors duration-300"
                                        >
                                            <FaInstagram />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 order-1 md:order-2 bg-gray-900 dark:bg-gray-100 shadow-lg rounded-lg space-y-4 text-white dark:text-gray-800"
                            noValidate
                            aria-label="Contact form"
                        >
                            {submitSuccess && (
                                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                                    Thank you for contacting us! We will get back to you shortly.
                                </div>
                            )}
                            <div className="mb-4">
                                <label htmlFor="name" className={labelClass}>
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={inputClass}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className={labelClass}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={inputClass}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="subject" className={labelClass}>
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    className={inputClass}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className={labelClass}>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className={inputClass}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary text-white font-semibold py-3 px-6 rounded w-full transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            {/* FAQ Section */}
            <section className="py-20 bg-gray-800 dark:bg-gray-100">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {faqs.map((faq, i) => (
                            <FaqItem key={i} index={i} faq={faq} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

function FaqItem({ faq }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className="border border-gray-600 dark:border-gray-300 rounded-lg p-4 cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            role="button"
            tabIndex={0}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span className="text-orange-500">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {isOpen && <p className="mt-3">{faq.answer}</p>}
        </div>
    );
}

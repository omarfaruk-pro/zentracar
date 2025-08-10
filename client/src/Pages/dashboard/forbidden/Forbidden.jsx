import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

export default function Forbidden({role}) {
  return (
    <>
      <div className="text-center px-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 text-red-600 mb-6">
          <FaLock className="text-5xl" />
        </div>
        <h1 className="text-5xl font-bold mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
        <h2 className="text-xl font-semibold mb-2">You are not {role} to access this page</h2>
        <p className="mb-6 opacity-70 max-w-md mx-auto">
          Sorry, you don’t have permission to access this page.  
          If you believe this is an error, please contact support.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}

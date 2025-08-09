import { useState } from 'react'
import { FaUser, FaUserShield, FaUserTie } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const [sortRole, setSortRole] = useState('all');
  const [users, setUsers] = useState([]);


  const url = sortRole === 'all' ? '/users' : `/users?role=${sortRole}`;
  axiosSecure.get(url)
    .then((res) => {
      setUsers(res.data);
    })



  const handleChangeRole = (userId, newRole) => {
    Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Change',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/user/${userId}/role`, { role: newRole });
          if (res.data.modifiedCount) {
            Swal.fire('Updated!', 'User role has been changed.', 'success');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'Failed to change user role.', 'error');
        }

      }
    });
  };
  return (
    <section className=" md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Users</h2>
        <select
          className="border px-3 py-1 rounded"
          value={sortRole}
          onChange={(e) => setSortRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* {
        isLoading && (
          <p>Loading.....</p>
          <SkeletonTableLoader></SkeletonTableLoader>
        )
      } */}
      {
        // !isLoading &&
        <div className="overflow-x-auto dark:bg-white shadow-md rounded-lg bg-gray-900">
          <table className="min-w-2xl w-full text-left text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Current Role</th>
                <th className="px-6 py-3 text-center">Change Role</th>
              </tr>
            </thead>
            <tbody>

              {users.map(user => (
                <tr key={user._id} className="border-b border-gray-800 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-200 last:border-b-0">
                  <td className="px-6 py-4">
                    <img
                      src={user.photoURL || 'https://www.w3schools.com/howto/img_avatar.png'}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleChangeRole(user._id, 'user')}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg hover:scale-110 transition-all duration-200 "
                    >USER
                    </button>
                    <button
                      onClick={() => handleChangeRole(user._id, 'owner')}
                      className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-700 text-white text-xs font-semibold rounded-full shadow-md hover:from-green-600 hover:to-green-800 hover:shadow-lg hover:scale-110 transition-all duration-200 "
                    >
                      OWNER
                    </button>
                    <button
                      onClick={() => handleChangeRole(user._id, 'admin')}
                      className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs font-semibold rounded-full shadow-md hover:from-purple-600 hover:to-purple-800 hover:shadow-lg hover:scale-110 transition-all duration-200 "
                    >
                      ADMIN
                    </button>
                  </td>

                </tr>
              ))}
              {
                users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
                      No {sortRole === 'all' ? 'users' : sortRole} found.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      }
    </section>
  );
}

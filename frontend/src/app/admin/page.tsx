'use client';
import { deleteUser, getUsers } from '@/services/server-api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

const AdminPage = () => {
  const { data: session, status } = useSession();
  // const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState('');
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState('');


  const filteredUsers = users.filter((user: UserData) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || user.email.includes(searchTerm.toLowerCase());
  });

  const fetchUsers = async () => {
    console.log(session);
    try {
      const response = await getUsers(session?.backendTokens.accessToken ?? '');
      console.log(response);

      // Assuming response is an array of users
      // Update setUsers only if needed
      if (response && response.length > 0) {
        setUsers(response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    // Fetch user list from your backend API

  
    fetchUsers();
  }, [session]); 


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // if (!session || session.user?.role !== 'admin') {
  //   router.push('/auth/signin');
  //   return null;
  // }

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const handleCreate = () => {
    // Implement create functionality
    console.log('Creating user');
  };

  const handleEdit = (userId: string) => {
    // Implement edit functionality
    console.log('Editing user with ID:', userId);
  };

  const handleDelete = (userId: string) => {
    // Set the user ID to be deleted and show the delete modal
    setDeletingUserId(userId);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = async () => {
    try {
      const response = await deleteUser(deletingUserId, session?.backendTokens.accessToken ?? "");
  
      // if (!response.ok) {
      //   throw new Error('Failed to delete user');
      // }
  
      // If the API call is successful, close the modal and handle any UI updates
      closeDeleteModal();
      // You may want to refetch the user list or update it in some way
      fetchUsers();
    } catch (error:any) {
      console.error('Error deleting user:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  
  return (
    <main>
      <div className='py-global px-global mb-6'>
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="px-4 py-2 border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="min-w-ful border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: UserData) => (
              <tr key={user.email} className="border-b">
                <td className="py-2 px-4">{user.firstName + " " + user.lastName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                    onClick={() => handleEdit(user.email)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1"
                    onClick={() => handleDelete(user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          {/* Delete Modal */}
          {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-md">
      <p className="mb-4">Are you sure you want to delete this user?</p>
      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white px-4 py-2 mr-2"
          onClick={confirmDelete}
        >
          Yes, Delete
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2"
          onClick={closeDeleteModal}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
};

export default AdminPage;
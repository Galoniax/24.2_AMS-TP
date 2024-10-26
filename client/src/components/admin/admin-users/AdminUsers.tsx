import { useUsers } from "../../../hooks/useUsers";

const AdminUsers = () => {
  const { allUsers } = useUsers();

  return (
    <div className="w-full flex flex-col justify-center align-center px-7 mb-10">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Todos los usuarios</h3>
        </div>

        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg mt-4">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Rol</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {allUsers?.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{user.id}</td>
                <td className="py-3 px-6 text-left">{user.username}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.role || 'CLIENT'}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default AdminUsers;
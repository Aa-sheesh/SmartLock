import React from "react";
import Navbar from "../components/Navbar";
// import Footer from '../components/Footer';
import { capitalize } from "lodash";
import { useUserStore } from "../stores/useUserStore";

// Demo data for users and system logs
const demoUsers = [
  {
    id: 1,
    fullName: "Cyber Guardian",
    email: "guardian@cybersecurity.com",
    role: "Admin",
  },
  {
    id: 2,
    fullName: "Data Defender",
    email: "defender@cybersecurity.com",
    role: "User",
  },
  {
    id: 3,
    fullName: "Network Ninja",
    email: "ninja@cybersecurity.com",
    role: "User",
  },
];

const demoLogs = [
  { id: 1, message: 'User "Data Defender" logged in.', time: "10 minutes ago" },
  { id: 2, message: "Firewall configuration updated.", time: "20 minutes ago" },
  { id: 3, message: "Malware scan completed on server 3.", time: "1 hour ago" },
];

function Admin() {
  const { user } = useUserStore();
  const demoUserData = {
    fullName: capitalize(user.fullName),
    email: user.email,
    role: capitalize(user.role),
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900/10 text-gray-100 flex flex-col">
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Admin Dashboard : {demoUserData.fullName} 
          </h2>
          <p className="text-gray-400 font-mono">
            Role: {demoUserData.role} • Email: {demoUserData.email}
          </p>
          <p className="text-gray-400 font-mono">
            Manage users and review system logs.
          </p>
        </section>

        {/* User Management Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700">ID</th>
                  <th className="px-4 py-2 border-b border-gray-700">Name</th>
                  <th className="px-4 py-2 border-b border-gray-700">Email</th>
                  <th className="px-4 py-2 border-b border-gray-700">Role</th>
                  <th className="px-4 py-2 border-b border-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {demoUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-2 border-b border-gray-700">
                      {user.id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {user.role}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-sm rounded">
                        Edit
                      </button>
                      <button className="ml-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-sm rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* System Logs Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">System Logs</h2>
          <div className="bg-gray-800 p-4 rounded shadow">
            {demoLogs.map((log) => (
              <div key={log.id} className="mb-2 border-b border-gray-700 pb-2">
                <p className="text-gray-300">{log.message}</p>
                <p className="text-sm text-gray-500">{log.time}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default Admin;

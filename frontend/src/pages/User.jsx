import React from 'react';
import Navbar from '../components/Navbar';
import { useUserStore } from '../stores/useUserStore';
import {capitalize} from 'lodash';
// import Footer from '../components/Footer';

// Demo data for the user and security alerts


const demoAlerts = [
  {
    id: 1,
    title: "Unauthorized Login Attempt",
    description:
      "Multiple failed login attempts detected from IP 192.168.1.101.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    title: "Malware Detected",
    description: "Suspicious file activity found on server 3.",
    time: "15 minutes ago",
  },
  {
    id: 3,
    title: "Data Breach Alert",
    description: "Unusual data transfer volume detected.",
    time: "1 hour ago",
  },
];

function User() {
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
            Welcome, {demoUserData.fullName}
          </h2>
          <p className="text-gray-400 font-mono">
            Role: {demoUserData.role} • Email: {demoUserData.email}
          </p>
        </section>

        {/* Security Alerts */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Security Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-gray-800 p-4 rounded border-l-4 border-red-500 shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-red-400">{alert.title}</h3>
                <p className="text-gray-400 mt-2">{alert.description}</p>
                <p className="text-sm text-gray-600 mt-2">{alert.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security Metrics */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Security Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded shadow border-t-4 border-blue-500">
              <h3 className="text-lg font-bold">Threats Blocked</h3>
              <p className="text-3xl text-blue-400 font-bold mt-2">152</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow border-t-4 border-blue-500">
              <h3 className="text-lg font-bold">Firewall Hits</h3>
              <p className="text-3xl text-blue-400 font-bold mt-2">98</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow border-t-4 border-blue-500">
              <h3 className="text-lg font-bold">Intrusions Detected</h3>
              <p className="text-3xl text-blue-400 font-bold mt-2">23</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default User;

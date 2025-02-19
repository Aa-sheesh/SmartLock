// src/pages/User.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import { capitalize } from "lodash";

function User() {
  const { user } = useUserStore();
  const demoUserData = {
    fullName: capitalize(user.fullName),
    email: user.email,
    role: capitalize(user.role),
  };

  // State for dynamic recent activity data
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [errorActivities, setErrorActivities] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/api/user/activity");
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        setErrorActivities("Failed to load recent activity.");
        // Optionally, you can set demo data here:
        // setActivities([{ id: 1, message: "Logged in successfully.", timestamp: Date.now() }]);
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900/10 text-gray-100 flex flex-col">
      <Navbar />
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
        
        {/* Account Status Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Status</h2>
          <p className="mb-2">
            Your account is operating normally. You have not exceeded your allowed request limits.
          </p>
          <p>
            For detailed security insights, please contact your administrator.
          </p>
        </section>

        {/* Recent Activity Section (Dynamic Data) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {loadingActivities ? (
            <p>Loading recent activity...</p>
          ) : errorActivities ? (
            <p className="text-red-400">{errorActivities}</p>
          ) : activities.length === 0 ? (
            <p>No recent activity available.</p>
          ) : (
            <ul className="space-y-2">
              {activities.map((activity) => (
                <li
                  key={activity.id || activity._id}
                  className="bg-gray-800 p-4 rounded shadow"
                >
                  <p className="text-gray-300">{activity.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default User;

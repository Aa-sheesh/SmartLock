import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { capitalize } from "lodash";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";

function Admin() {
  const { user, fetchAlerts, fetchMetrics } = useUserStore();
  const demoUserData = {
    fullName: capitalize(user.fullName),
    email: user.email,
    role: capitalize(user.role),
  };

  // State for intrusion alerts
  const [alerts, setAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [errorAlerts, setErrorAlerts] = useState("");

  // State for aggregated security metrics
  const [metrics, setMetrics] = useState(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [errorMetrics, setErrorMetrics] = useState("");

  useEffect(() => {
    const getAlerts = async () => {
      try {
        const alertsData = await fetchAlerts();
        setAlerts(alertsData);
      } catch (err) {
        setErrorAlerts("Failed to load alerts.");
        console.error("Error fetching alerts:", err);
      } finally {
        setLoadingAlerts(false);
      }
    };

    const getMetrics = async () => {
      try {
        const metricsData = await fetchMetrics();
        setMetrics(metricsData);
      } catch (err) {
        setErrorMetrics("Failed to load metrics.");
        console.error("Error fetching metrics:", err);
      } finally {
        setLoadingMetrics(false);
      }
    };

    getAlerts();
    getMetrics();
  }, [fetchAlerts, fetchMetrics]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900/10 text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        {/* User Details */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Admin Dashboard: {demoUserData.fullName}
          </h2>
          <p className="text-gray-400 font-mono">
            Role: {demoUserData.role} • Email: {demoUserData.email}
          </p>
          <p className="text-gray-400 font-mono">
            Manage users and review system logs.
          </p>
        </section>

        {/* Security Metrics Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Security Metrics</h2>
          {loadingMetrics ? (
            <p>Loading metrics...</p>
          ) : errorMetrics ? (
            <p>{errorMetrics}</p>
          ) : metrics ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded shadow border-t-4 border-blue-500">
                <h3 className="text-lg font-bold">Threats Blocked</h3>
                <p className="text-3xl text-blue-400 font-bold mt-2">
                  {metrics.threatsBlocked}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded shadow border-t-4 border-blue-500">
                <h3 className="text-lg font-bold">Firewall Hits</h3>
                <p className="text-3xl text-blue-400 font-bold mt-2">
                  {metrics.firewallHits}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded shadow border-t-4 border-blue-500">
                <h3 className="text-lg font-bold">Intrusions Detected</h3>
                <p className="text-3xl text-blue-400 font-bold mt-2">
                  {metrics.intrusionsDetected}
                </p>
              </div>
            </div>
          ) : (
            <p>No metrics available.</p>
          )}
        </section>

        {/* Intrusion Alerts Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Intrusion Alerts</h2>
          {loadingAlerts ? (
            <p>Loading alerts...</p>
          ) : errorAlerts ? (
            <p>{errorAlerts}</p>
          ) : alerts.length === 0 ? (
            <p>No alerts available.</p>
          ) : (
            <table className="min-w-full bg-gray-800 rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-700">IP Address</th>
                  <th className="px-4 py-2 border-b border-gray-700">User Agent</th>
                  <th className="px-4 py-2 border-b border-gray-700">Event Type</th>
                  <th className="px-4 py-2 border-b border-gray-700">Additional Info</th>
                  <th className="px-4 py-2 border-b border-gray-700">Date</th>
                  <th className="px-4 py-2 border-b border-gray-700">Geolocation</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-2 border-b border-gray-700">{log.ipAddress}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{log.userAgent}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{log.eventType}</td>
                    <td className="px-4 py-2 border-b border-gray-700">{log.additionalInfo}</td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {new Date(log.attemptedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-700">
                      {log.geo && log.geo.city
                        ? `${log.geo.city}, ${log.geo.region}, ${log.geo.country}`
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;

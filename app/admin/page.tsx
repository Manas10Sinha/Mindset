"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN;

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (Number(pin.trim()) === Number(ADMIN_PIN)) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid PIN");
    }
  };

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("demo_bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Failed to update status");
      return;
    }

    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );
  };

  const fetchLeads = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("demo_bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setLeads(data || []);

    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchLeads();
  }, [authenticated]);

  const statusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "contacted":
        return "bg-yellow-100 text-yellow-700";
      case "demo_booked":
        return "bg-purple-100 text-purple-700";
      case "enrolled":
        return "bg-green-100 text-green-700";
      case "not_interested":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ---------------- LOGIN UI ----------------
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Admin Dashboard
          </h1>

          <input
            type="password"
            placeholder="Enter Admin PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Demo Bookings Dashboard
        </h1>

        <button
          onClick={fetchLeads}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl"
        >
          Refresh
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading leads...</div>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full text-sm">
              <thead className="bg-orange-500 text-white sticky top-0">
                <tr>
                  {[
                    "Parent",
                    "Child",
                    "Mobile",
                    "Grade",
                    "Email",
                    "Topic",
                    "Date",
                    "Time",
                    "Status",
                    "Submitted",
                  ].map((h) => (
                    <th key={h} className="p-3 text-left whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{lead.parent_name}</td>
                    <td className="p-3">{lead.child_name}</td>
                    <td className="p-3">{lead.mobile}</td>
                    <td className="p-3">{lead.grade}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3">{lead.topic}</td>
                    <td className="p-3">{lead.preferred_date}</td>
                    <td className="p-3">{lead.preferred_time}</td>

                    <td className="p-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded border ${statusColor(
                          lead.status,
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="demo_booked">Demo Booked</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="not_interested">Not Interested</option>
                      </select>
                    </td>

                    <td className="p-3 text-xs text-gray-500">
                      {new Date(lead.created_at).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARD VIEW ================= */}
          <div className="grid gap-4 md:hidden">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl shadow p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      {lead.parent_name} → {lead.child_name}
                    </p>
                    <p className="text-sm text-gray-500">{lead.mobile}</p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${statusColor(
                      lead.status,
                    )}`}
                  >
                    {lead.status}
                  </span>
                </div>

                <p className="text-sm">📚 {lead.topic}</p>
                <p className="text-sm">
                  📅 {lead.preferred_date} | ⏰ {lead.preferred_time}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(lead.created_at).toLocaleString("en-IN")}
                </p>

                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="w-full mt-2 p-2 border rounded-lg text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="demo_booked">Demo Booked</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="not_interested">Not Interested</option>
                </select>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";

// const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN;

// export default function AdminPage() {
//   const [pin, setPin] = useState("");
//   const [authenticated, setAuthenticated] = useState(false);
//   const [error, setError] = useState("");
//   const [leads, setLeads] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     if (pin.trim() === ADMIN_PIN) {
//       setAuthenticated(true);
//       setError("");
//     } else {
//       setError("Invalid PIN");
//     }
//   };

//   const updateStatus = async (id: number, status: string) => {
//     const { error } = await supabase
//       .from("demo_bookings")
//       .update({ status })
//       .eq("id", id);

//     if (error) {
//       console.error(error);
//       alert("Failed to update status");
//       return;
//     }

//     setLeads((prev) =>
//       prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
//     );
//   };

//   const fetchLeads = async () => {
//     setLoading(true);

//     const { data, error } = await supabase
//       .from("demo_bookings")
//       .select("*")
//       .order("created_at", { ascending: false });
//     console.log("DATA:", data);
//     console.log("ERROR:", error);

//     if (error) {
//       console.error(error);
//     } else {
//       setLeads(data || []);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     if (authenticated) {
//       fetchLeads();
//     }
//   }, [authenticated]);

//   if (!authenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//           <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

//           <input
//             type="password"
//             placeholder="Enter PIN"
//             value={pin}
//             onChange={(e) => setPin(e.target.value)}
//             className="w-full p-3 border rounded-lg"
//           />

//           {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

//           <button
//             onClick={handleLogin}
//             className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Demo Bookings Dashboard</h1>

//         <button
//           onClick={fetchLeads}
//           className="bg-orange-500 text-white px-4 py-2 rounded-lg"
//         >
//           Refresh
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading leads...</p>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-xl shadow">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-orange-500 text-white">
//                 <th className="p-3 text-left">Parent</th>
//                 <th className="p-3 text-left">Child</th>
//                 <th className="p-3 text-left">Mobile</th>
//                 <th className="p-3 text-left">Grade</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Topic</th>
//                 <th className="p-3 text-left">Date</th>
//                 <th className="p-3 text-left">Time</th>
//                 <th className="p-3 text-left">Submitted</th>
//                 <th className="p-3 text-left">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {leads.map((lead) => (
//                 <tr key={lead.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{lead.parent_name}</td>
//                   <td className="p-3">{lead.child_name}</td>
//                   <td className="p-3">{lead.mobile}</td>
//                   <td className="p-3">{lead.grade}</td>
//                   <td className="p-3">{lead.email}</td>
//                   <td className="p-3">{lead.topic}</td>
//                   <td className="p-3">{lead.preferred_date}</td>
//                   <td className="p-3">{lead.preferred_time}</td>
//                   <td className="p-3">
//                     <select
//                       value={lead.status}
//                       onChange={(e) => updateStatus(lead.id, e.target.value)}
//                     >
//                       <option value="new">New</option>
//                       <option value="contacted">Contacted</option>
//                       <option value="demo_booked">Demo Booked</option>
//                       <option value="enrolled">Enrolled</option>
//                       <option value="not_interested">Not Interested</option>
//                     </select>
//                   </td>
//                   <td className="p-3">
//                     {new Date(lead.created_at).toLocaleString("en-IN")}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

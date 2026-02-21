// // 'use client';

// // import { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { User, Car, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

// // export default function AdminDashboardPage() {
// //   const [requests, setRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchAllRequests();
// //   }, []);

// //   const fetchAllRequests = async () => {
// //     const token = localStorage.getItem('admintoken');
// //     if (!token) {
// //       alert('You must be logged in as admin');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const res = await axios.get(
// //         'http://localhost:5000/admin/scrap-requests', // ✅ fixed URL
// //         { 
// //           headers: { Authorization: `Bearer ${localStorage.getItem("admintoken")}` } }
// //       );
// //       setRequests(res.data || []);
// //     } catch (err) {
// //       console.error('Error fetching requests', err);
// //       alert('Failed to load admin dashboard data');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const stats = {
// //     total: requests.length,
// //     pending: requests.filter(r => r.status === 'pending').length,
// //     approved: requests.filter(r => r.status === 'approved').length,
// //     rejected: requests.filter(r => r.status === 'rejected').length,
// //   };

// //   const statusConfig = {
// //     pending: { label: 'Pending', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-300', icon: Clock },
// //     approved: { label: 'Approved', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300', icon: CheckCircle },
// //     rejected: { label: 'Rejected', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300', icon: XCircle },
// //   };

// //   if (loading) {
// //     return <div className="p-10 text-center text-gray-500">Loading admin dashboard...</div>;
// //   }

// //   return (
// //     <div className="p-6 space-y-8">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
// //         <p className="text-gray-500">Monitor all car scrapping requests</p>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //         <StatCard title="Total Requests" value={stats.total} icon={FileText} />
// //         <StatCard title="Pending" value={stats.pending} icon={Clock} />
// //         <StatCard title="Approved" value={stats.approved} icon={CheckCircle} />
// //         <StatCard title="Rejected" value={stats.rejected} icon={XCircle} />
// //       </div>

// //       {/* Requests */}
// //       <div className="grid grid-cols-1 gap-6">
// //         {requests.length === 0 ? (
// //           <p className="text-center text-gray-500">No scrap requests found</p>
// //         ) : (
// //           requests.map(req => {
// //             const config = statusConfig[req.status] || statusConfig.pending;
// //             const StatusIcon = config.icon;

// //             return (
// //               <div key={req._id} className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${config.border}`}>
// //                 <div className="flex justify-between items-start">
// //                   <div className="space-y-2">
// //                     <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
// //                       <Car className="w-5 h-5" /> {req.carModel}
// //                     </h2>
// //                     <p className="text-sm text-gray-600">Owner: <span className="font-medium">{req.ownerName}</span></p>
// //                     <p className="text-sm text-gray-600">Vehicle No: {req.vehicleNumber}</p>
// //                     <p className="text-sm text-gray-600">Dealer: {req.dealer?.name || 'Not Assigned'}</p>
// //                   </div>
// //                   <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.color}`}>
// //                     <StatusIcon className="w-4 h-4" /> {config.label}
// //                   </div>
// //                 </div>
// //                 <div className="mt-4 text-sm text-gray-500">Submitted on: {new Date(req.createdAt).toLocaleDateString()}</div>
// //               </div>
// //             );
// //           })
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* Reusable stat card */
// // function StatCard({ title, value, icon: Icon }) {
// //   return (
// //     <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
// //       <div className="p-3 bg-gray-100 rounded-xl"><Icon className="w-6 h-6 text-gray-700" /></div>
// //       <div>
// //         <p className="text-sm text-gray-500">{title}</p>
// //         <p className="text-2xl font-bold text-gray-800">{value}</p>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Car, Clock, CheckCircle, XCircle, FileText, User } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function AdminDashboardPage() {
//   const router = useRouter();

//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAllRequests();
//   }, []);

//   const fetchAllRequests = async () => {
//     try {
//       const token = localStorage.getItem("adminToken"); // ✅ FIXED

//       if (!token) {
//         router.push("/admin/login");
//         return;
//       }

//       const res = await axios.get(
//         "http://localhost:5000/admin/scrap-requests",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setRequests(res.data || []);
//     } catch (err) {
//       console.error(err);
//       alert("Session expired. Login again.");
//       router.push("/admin/login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stats = {
//     total: requests.length,
//     pending: requests.filter((r) => r.status === "pending").length,
//     approved: requests.filter((r) => r.status === "approved").length,
//     rejected: requests.filter((r) => r.status === "rejected").length,
//   };

//   const statusUI = {
//     pending: { label: "Pending", color: "text-yellow-700", bg: "bg-yellow-100", icon: Clock },
//     approved: { label: "Approved", color: "text-green-700", bg: "bg-green-100", icon: CheckCircle },
//     rejected: { label: "Rejected", color: "text-red-700", bg: "bg-red-100", icon: XCircle },
//   };

//   if (loading)
//     return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">

//       <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//         <Stat title="Total Requests" value={stats.total} icon={FileText} />
//         <Stat title="Pending" value={stats.pending} icon={Clock} />
//         <Stat title="Approved" value={stats.approved} icon={CheckCircle} />
//         <Stat title="Rejected" value={stats.rejected} icon={XCircle} />
//       </div>

//       <div className="space-y-6">

//         {requests.length === 0 && (
//           <p className="text-center text-gray-500">No scrap requests found</p>
//         )}

//         {requests.map((req) => {
//           const ui = statusUI[req.status] || statusUI.pending;
//           const StatusIcon = ui.icon;

//           return (
//             <div key={req._id} className="bg-white shadow rounded-xl p-6 border-l-4 border-blue-600">

//               <div className="flex justify-between">

//                 <div className="space-y-2">
//                   <h2 className="text-xl font-semibold flex gap-2 items-center">
//                     <Car size={18} /> {req.carId?.model || "Unknown Car"}
//                   </h2>

//                   <p className="text-sm text-gray-600 flex gap-2 items-center">
//                     <User size={14} /> {req.user?.name}
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     Registration: {req.carId?.registration}
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     Description: {req.description}
//                   </p>
//                 </div>

//                 <div className={`flex items-center gap-2 px-4 py-1 h-fit rounded-full text-sm ${ui.bg} ${ui.color}`}>
//                   <StatusIcon size={16} />
//                   {ui.label}
//                 </div>

//               </div>

//               <div className="text-xs text-gray-400 mt-3">
//                 Submitted: {new Date(req.createdAt).toLocaleDateString()}
//               </div>

//             </div>
//           );
//         })}

//       </div>
//     </div>
//   );
// }

// function Stat({ title, value, icon: Icon }) {
//   return (
//     <div className="bg-white rounded-xl shadow p-6 flex gap-4 items-center">
//       <div className="p-3 bg-gray-100 rounded-xl">
//         <Icon size={24} />
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Car, Clock, CheckCircle, XCircle, FileText, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/admin/scrap-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Session expired. Login again.");
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  const statusUI = {
    pending: {
      label: "Pending",
      color: "text-yellow-700",
      bg: "bg-yellow-100",
      icon: Clock,
    },
    approved: {
      label: "Approved",
      color: "text-green-700",
      bg: "bg-green-100",
      icon: CheckCircle,
    },
    rejected: {
      label: "Rejected",
      color: "text-red-700",
      bg: "bg-red-100",
      icon: XCircle,
    },
  };

  if (loading)
    return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Stat title="Total Requests" value={stats.total} icon={FileText} />
        <Stat title="Pending" value={stats.pending} icon={Clock} />
        <Stat title="Approved" value={stats.approved} icon={CheckCircle} />
        <Stat title="Rejected" value={stats.rejected} icon={XCircle} />
      </div>

      {/* REQUESTS */}
      <div className="space-y-6">

        {requests.length === 0 && (
          <p className="text-center text-gray-500">No scrap requests found</p>
        )}

        {requests.map((req) => {
          const ui = statusUI[req.status] || statusUI.pending;
          const StatusIcon = ui.icon;

          return (
            <div
              key={req._id}
              className="bg-white shadow rounded-xl p-6 border-l-4 border-blue-600"
            >
              <div className="flex justify-between">

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold flex gap-2 items-center">
                    <Car size={18} /> {req.carId?.model || "Unknown Car"}
                  </h2>

                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <User size={14} /> {req.userId?.name || "Unknown User"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Description: {req.description}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 px-4 py-1 h-fit rounded-full text-sm ${ui.bg} ${ui.color}`}
                >
                  <StatusIcon size={16} />
                  {ui.label}
                </div>

              </div>

              <div className="text-xs text-gray-400 mt-3">
                Submitted: {new Date(req.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex gap-4 items-center">
      <div className="p-3 bg-gray-100 rounded-xl">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

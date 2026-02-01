// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Users,
//   Car,
//   Clock,
//   CheckCircle,
//   XCircle,
//   FileText,
// } from 'lucide-react';

// export default function AdminDashboardPage() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAllRequests();
//   }, []);

//   const fetchAllRequests = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       const res = await axios.get(
//         'http://localhost:5000/admin/scrap-requests',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setRequests(res.data || []);
//     } catch (err) {
//       console.error('Error fetching requests', err);
//       alert('Failed to load admin data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stats = {
//     total: requests.length,
//     pending: requests.filter(r => r.status === 'pending').length,
//     approved: requests.filter(r => r.status === 'approved').length,
//     rejected: requests.filter(r => r.status === 'rejected').length,
//   };

//   const statusConfig = {
//     pending: {
//       label: 'Pending',
//       color: 'text-yellow-600',
//       bg: 'bg-yellow-50',
//       border: 'border-yellow-300',
//       icon: Clock,
//     },
//     approved: {
//       label: 'Approved',
//       color: 'text-green-600',
//       bg: 'bg-green-50',
//       border: 'border-green-300',
//       icon: CheckCircle,
//     },
//     rejected: {
//       label: 'Rejected',
//       color: 'text-red-600',
//       bg: 'bg-red-50',
//       border: 'border-red-300',
//       icon: XCircle,
//     },
//   };

//   if (loading) {
//     return (
//       <div className="p-10 text-center text-gray-500">
//         Loading admin dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-500">
//           Monitor all car scrapping requests
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatCard title="Total Requests" value={stats.total} icon={FileText} />
//         <StatCard title="Pending" value={stats.pending} icon={Clock} />
//         <StatCard title="Approved" value={stats.approved} icon={CheckCircle} />
//         <StatCard title="Rejected" value={stats.rejected} icon={XCircle} />
//       </div>

//       {/* Requests */}
//       <div className="grid grid-cols-1 gap-6">
//         {requests.length === 0 && (
//           <p className="text-center text-gray-500">
//             No scrap requests found
//           </p>
//         )}

//         {requests.map(req => {
//           const config = statusConfig[req.status] || statusConfig.pending;
//           const StatusIcon = config.icon;

//           return (
//             <div
//               key={req._id}
//               className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${config.border}`}
//             >
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                     <Car className="w-5 h-5" />
//                     {req.carModel}
//                   </h2>

//                   <p className="text-sm text-gray-600">
//                     Owner: <span className="font-medium">{req.ownerName}</span>
//                   </p>

//                   <p className="text-sm text-gray-600">
//                     Vehicle No: {req.vehicleNumber}
//                   </p>

//                   <p className="text-sm text-gray-600">
//                     Dealer: {req.dealer?.name || 'Not Assigned'}
//                   </p>
//                 </div>

//                 <div
//                   className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.color}`}
//                 >
//                   <StatusIcon className="w-4 h-4" />
//                   {config.label}
//                 </div>
//               </div>

//               <div className="mt-4 text-sm text-gray-500">
//                 Submitted on:{' '}
//                 {new Date(req.createdAt).toLocaleDateString()}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* Small reusable stat card */
// function StatCard({ title, value, icon: Icon }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
//       <div className="p-3 bg-gray-100 rounded-xl">
//         <Icon className="w-6 h-6 text-gray-700" />
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-2xl font-bold text-gray-800">{value}</p>
//       </div>
//     </div>
//   );
// }

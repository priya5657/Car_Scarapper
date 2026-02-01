// // 'use client';

// // import { useEffect, useState } from 'react';
// // import axios from 'axios';

// // export default function ManageCarPage() {
// //   const [cars, setCars] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchCars = async () => {
// //       try {
// //         const token = localStorage.getItem('token');

// //         if (!token) {
// //           alert('Login required');
// //           return;
// //         }

// //         const response = await axios.get(
// //           'http://localhost:5000/dealer/scrap-requests',
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         setCars(response.data);
// //       } catch (error) {
// //         console.error('Error fetching scrap requests:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCars();
// //   }, []);

// //   if (loading) {
// //     return <div className="p-6">Loading...</div>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-6">Manage My Cars</h1>

// //       {cars.length === 0 ? (
// //         <p>No scrap requests found.</p>
// //       ) : (
// //         <div className="grid gap-4">
// //           {cars.map((car) => (
// //             <div
// //               key={car._id}
// //               className="border rounded-lg p-4 shadow-sm"
// //             >
// //               <h2 className="text-lg font-semibold">
// //                 {car.carName}
// //               </h2>

// //               <p>Reg No: {car.registrationNumber}</p>
// //               <p>Model: {car.model}</p>
// //               <p>Year: {car.year}</p>

// //               <p className="mt-2">
// //                 Status:{' '}
// //                 <span
// //                   className={`font-semibold ${
// //                     car.status === 'approved'
// //                       ? 'text-green-600'
// //                       : car.status === 'rejected'
// //                       ? 'text-red-600'
// //                       : 'text-yellow-600'
// //                   }`}
// //                 >
// //                   {car.status.toUpperCase()}
// //                 </span>
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';

// export default function ManageCarPage() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(null);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           alert('Login required');
//           return;
//         }

//         const res = await axios.get(
//           'http://localhost:5000/dealer/scrap-requests',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setRequests(res.data);
//       } catch (err) {
//         console.error('Error fetching scrap requests:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleCancelRequest = async (id) => {
//     if (!window.confirm('Cancel this scrap request?')) return;

//     try {
//       setActionLoading(id);
//       const token = localStorage.getItem('token');

//       await axios.delete(
//         `http://localhost:5000/dealer/scrap-requests/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setRequests((prev) => prev.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error('Cancel failed:', err);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   const statusConfig = {
//     pending: {
//       badge: 'bg-yellow-100 text-yellow-800',
//       icon: Clock,
//     },
//     approved: {
//       badge: 'bg-green-100 text-green-800',
//       icon: CheckCircle,
//     },
//     rejected: {
//       badge: 'bg-red-100 text-red-800',
//       icon: XCircle,
//     },
//   };

//   return (
//     <section className="p-6">
//       <h2 className="text-3xl font-bold mb-6">My Scrap Requests</h2>

//       {requests.length === 0 ? (
//         <p className="text-gray-500">No scrap requests yet.</p>
//       ) : (
//         <div className="grid gap-6">
//           {requests.map((req) => {
//             const config = statusConfig[req.status] || statusConfig.pending;
//             const StatusIcon = config.icon;

//             return (
//               <div
//                 key={req._id}
//                 className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gray-300"
//               >
//                 <p className="text-sm text-gray-500">Car Model</p>
//                 <p className="text-2xl font-bold mb-3">
//                   {req.carId?.model || 'N/A'}
//                 </p>

//                 <span
//                   className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${config.badge}`}
//                 >
//                   <StatusIcon size={18} />
//                   {req.status.toUpperCase()}
//                 </span>

//                 {req.status === 'pending' && (
//                   <div className="mt-4">
//                     <button
//                       onClick={() => handleCancelRequest(req._id)}
//                       disabled={actionLoading === req._id}
//                       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
//                     >
//                       <Trash2 size={18} />
//                       Cancel Request
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function UserManageCarPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch all scrap requests of user
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Login required');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:5000/dealer/scrap-request', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRequests(res.data || []);
      } catch (err) {
        console.error('Error fetching scrap requests:', err);
        alert('Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleCancelRequest = async (id) => {
    if (!window.confirm('Cancel this scrap request?')) return;

    try {
      setActionLoading(id);
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:5000/dealer/scrap-request/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Cancel failed:', err);
      alert('Failed to cancel request');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  const statusConfig = {
    pending: { badge: 'bg-yellow-100 text-yellow-800', icon: Clock },
    approved: { badge: 'bg-green-100 text-green-800', icon: CheckCircle },
    rejected: { badge: 'bg-red-100 text-red-800', icon: XCircle },
  };

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Scrap Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No scrap requests yet.</p>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => {
            const status = (req.status || 'pending').toLowerCase();
            const config = statusConfig[status] || statusConfig.pending;
            const StatusIcon = config.icon;

            return (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-gray-300"
              >
                <p className="text-sm text-gray-500">Car Model</p>
                <p className="text-2xl font-bold mb-3">
                  {req.carId?.model || 'N/A'}
                </p>

                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${config.badge}`}
                >
                  <StatusIcon size={18} />
                  {status.toUpperCase()}
                </span>

                {status === 'pending' && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleCancelRequest(req._id)}
                      disabled={actionLoading === req._id}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                      Cancel Request
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

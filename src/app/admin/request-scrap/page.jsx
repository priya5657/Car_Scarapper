"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  Clock,
  Car,
  User,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RequestScrapPage() {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // ✅ ADMIN TOKEN
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  /* ================= FETCH REQUESTS ================= */

  const fetchRequests = async () => {
    try {
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
    } catch (error) {
      console.error(error);
      alert("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* ================= APPROVE / REJECT ================= */

  const handleAction = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this request?`))
      return;

    try {
      setActionLoading(id);

      await axios.patch(
        `http://localhost:5000/admin/scrap-requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading requests...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Admin Scrap Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No scrap requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-xl p-5 shadow bg-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold flex items-center gap-2">
                  <Car size={18} />
                  {req.carId?.model || "Unknown Car"}
                </h2>

                {req.status === "pending" && (
                  <span className="flex items-center gap-1 text-yellow-600">
                    <Clock size={16} /> Pending
                  </span>
                )}

                {req.status === "approved" && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle size={16} /> Approved
                  </span>
                )}

                {req.status === "rejected" && (
                  <span className="flex items-center gap-1 text-red-600">
                    <XCircle size={16} /> Rejected
                  </span>
                )}
              </div>

              {/* Details */}
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <User size={14} />
                User: {req.user?.name || "N/A"}
              </p>

              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <FileText size={14} />
                Description: {req.description}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Estimated Price: ₹{req.estimatedPrice || 0}
              </p>

              {/* Actions */}
              {req.status === "pending" && (
                <div className="flex gap-3 mt-4">

                  <button
                    disabled={actionLoading === req._id}
                    onClick={() => handleAction(req._id, "approved")}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve
                  </button>

                  <button
                    disabled={actionLoading === req._id}
                    onClick={() => handleAction(req._id, "rejected")}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    Reject
                  </button>

                </div>
              )}

              <div className="text-xs text-gray-400 mt-3">
                Submitted: {new Date(req.createdAt).toLocaleDateString()}
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

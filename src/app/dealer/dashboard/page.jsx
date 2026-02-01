'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, CheckCircle, Clock, XCircle, Car, FileText } from 'lucide-react';

export default function DealerDashboardPage() {
  const [cars, setCars] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [formData, setFormData] = useState({
    description: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchCars();
    fetchRequests();
  }, []);

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        'http://localhost:5000/car/getall',
        config
      );
      console.log('Cars fetched:', response.data);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        'http://localhost:5000/dealer/scrap-request',
        config
      );
      console.log('Requests fetched:', response.data);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRequest = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!selectedCarId) {
      alert('Please select a car');
      return;
    }

    try {
      setFormLoading(true);
      
      // ✅ Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('❌ Error: Authentication token not found. Please log in again.');
        return;
      }

      console.log('Token:', token ? 'Present' : 'Missing');
      console.log('Selected Car ID:', selectedCarId);

      const requestPayload = {
        carId: selectedCarId,
        description: formData.description
      };

      console.log('Submitting request with payload:', requestPayload);

      const response = await axios.post(
        'http://localhost:5000/dealer/scrap-request',
        requestPayload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        },
      );

      console.log('Request submitted successfully:', response.data);

      // Update requests list
      setRequests((prev) => [response.data, ...prev]);
      
      // Reset form
      setFormData({ description: '' });
      setShowForm(false);
      setSelectedCarId(null);
      
      alert('✅ Scrap request submitted successfully!');
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response?.data);
      
      // Show detailed error message
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message ||
                          'Failed to add scrap request';
      alert(`❌ Error: ${errorMessage}`);
    } finally {
      setFormLoading(false);
    }
  };



const handleApproveRequest = async (requestId) => {
  if (!window.confirm("Are you sure you want to approve this request?")) {
    return;
  }

  try {
    setActionLoading(requestId);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token missing. Please login again.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // ✅ CORRECT ENDPOINT (must exist in backend)
    await axios.put(
      `http://localhost:5000/dealer/scrap-request/${requestId}/approve`,
      {},
      config
    );

    // ✅ Update UI instantly
    setRequests((prev) =>
      prev.map((req) =>
        req._id === requestId
          ? { ...req, status: "approved" }
          : req
      )
    );

    alert("✅ Request approved successfully!");
  } catch (error) {
    console.error("Error approving request:", error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.message || "Failed to approve request";
    alert(`❌ Error: ${errorMessage}`);
  } finally {
    setActionLoading(null);
  }
};


const handleRejectRequest = async (requestId) => {
  if (!window.confirm("Are you sure you want to reject this request?")) {
    return;
  }

  try {
    setActionLoading(requestId);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token missing. Please login again.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // ✅ CORRECT ENDPOINT (must exist in backend)
    await axios.put(
      `http://localhost:5000/dealer/scrap-request/${requestId}/reject`,
      {},
      config
    );

    // ✅ Update UI instantly
    setRequests((prev) =>
      prev.map((req) =>
        req._id === requestId
          ? { ...req, status: "rejected" }
          : req
      )
    );

    alert("❌ Request rejected successfully!");
  } catch (error) {
    console.error("Error rejecting request:", error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.message || "Failed to reject request";
    alert(`❌ Error: ${errorMessage}`);
  } finally {
    setActionLoading(null);
  }
};






  const handleCancelRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to cancel this request?')) {
      return;
    }

    try {
      setActionLoading(requestId);
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // ✅ CORRECT ENDPOINT
      await axios.delete(
        `http://localhost:5000/dealer/scrap-request/${requestId}`,
        config
      );

      setRequests((prev) => prev.filter((req) => req._id !== requestId));
      alert('✅ Request cancelled successfully!');
    } catch (error) {
      console.error('Error canceling request:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Failed to cancel request';
      alert(`❌ Error: ${errorMessage}`);
    } finally {
      setActionLoading(null);
    }
  };

  

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading dashboard...</p>
      </div>
    </div>
  );

  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const approvedRequests = requests.filter(r => r.status === 'approved').length;
  const rejectedRequests = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2">Dealer Dashboard</h1>
              <p className="text-blue-200 text-lg">Manage your vehicle inventory and scrap requests</p>
            </div>
            <Car className="text-blue-400" size={60} />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Cars Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-t-4 border-blue-600 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Total Cars</p>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Car className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-blue-600">{cars.length}</p>
            <p className="text-gray-500 text-xs mt-2">In your inventory</p>
          </div>

          {/* Pending Requests Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-t-4 border-yellow-500 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Pending</p>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Clock className="text-yellow-500" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-yellow-500">{pendingRequests}</p>
            <p className="text-gray-500 text-xs mt-2">Awaiting approval</p>
          </div>

          {/* Approved Requests Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-t-4 border-green-500 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Approved</p>
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-green-500">{approvedRequests}</p>
            <p className="text-gray-500 text-xs mt-2">Ready for processing</p>
          </div>

          {/* Rejected Requests Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-t-4 border-red-500 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Rejected</p>
              <div className="bg-red-100 p-3 rounded-xl">
                <XCircle className="text-red-500" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-red-500">{rejectedRequests}</p>
            <p className="text-gray-500 text-xs mt-2">Not approved</p>
          </div>
        </div>

        {/* My Cars Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <Car className="text-white" size={28} />
                </div>
                My Cars
              </h2>
              <p className="text-gray-600 mt-2">Manage your vehicle inventory</p>
            </div>
          </div>

          {cars.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center border-2 border-dashed border-gray-300">
              <Car size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-xl font-semibold">No cars in inventory</p>
              <p className="text-gray-400 mt-2">Add cars to your inventory to start submitting scrap requests</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {cars.map((car, idx) => (
                <div key={car._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-l-4 border-blue-600 transform hover:translate-x-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      {/* Car Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                        <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                          <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Brand</p>
                          <p className="text-lg font-bold text-slate-900 mt-1">{car.brand}</p>
                        </div>
                        <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                          <p className="text-xs text-purple-600 font-bold uppercase tracking-wide">Model</p>
                          <p className="text-lg font-bold text-slate-900 mt-1">{car.model}</p>
                        </div>
                        <div className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-xl">
                          <p className="text-xs text-green-600 font-bold uppercase tracking-wide">Year</p>
                          <p className="text-lg font-bold text-slate-900 mt-1">{car.year}</p>
                        </div>
                        <div className="bg-linear-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                          <p className="text-xs text-orange-600 font-bold uppercase tracking-wide">Registration</p>
                          <p className="text-lg font-bold text-slate-900 mt-1">{car.registration}</p>
                        </div>
                        <div className="bg-linear-to-br from-pink-50 to-pink-100 p-4 rounded-xl">
                          <p className="text-xs text-pink-600 font-bold uppercase tracking-wide">Price</p>
                          <p className="text-lg font-bold text-slate-900 mt-1">₹{car.price?.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="border-l-2 border-gray-300 pl-3">
                          <p className="text-xs text-gray-500 uppercase">Condition</p>
                          <p className="font-semibold text-gray-800">{car.condition}</p>
                        </div>
                        <div className="border-l-2 border-gray-300 pl-3">
                          <p className="text-xs text-gray-500 uppercase">Fuel</p>
                          <p className="font-semibold text-gray-800">{car.fuelType}</p>
                        </div>
                        <div className="border-l-2 border-gray-300 pl-3">
                          <p className="text-xs text-gray-500 uppercase">Mileage</p>
                          <p className="font-semibold text-gray-800">{car.mileage} km</p>
                        </div>
                        <div className="border-l-2 border-gray-300 pl-3">
                          <p className="text-xs text-gray-500 uppercase">Type</p>
                          <p className="font-semibold text-gray-800">{car.type}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        setSelectedCarId(car._id);
                        setShowForm(true);
                      }}
                      className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 whitespace-nowrap shadow-lg"
                    >
                      <Plus size={20} />
                      Request Scrap
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Scrap Request Form Modal */}
        {showForm && selectedCarId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all animate-in">
              {/* Modal Header */}
              <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-8 rounded-t-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <FileText className="text-white" size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold">Submit Scrap Request</h3>
                </div>
                <p className="text-blue-100 text-sm ml-11">Provide vehicle condition details</p>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleAddRequest} className="p-8">
                {/* Description Field */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-widest">
                    Vehicle Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 resize-none text-gray-700 placeholder-gray-400"
                    placeholder="Describe the vehicle condition, damages, mileage, and other relevant details..."
                    rows="6"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">Minimum details help us process your request faster</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={20} strokeWidth={2} />
                        <span>Submit Request</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedCarId(null);
                      setFormData({ description: '' });
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                  >
                    <XCircle size={20} strokeWidth={2} />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Scrap Requests Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <div className="bg-yellow-600 p-3 rounded-xl">
                  <Clock className="text-white" size={28} />
                </div>
                My Scrap Requests
              </h2>
              <p className="text-gray-600 mt-2">Track your request status</p>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center border-2 border-dashed border-gray-300">
              <Clock size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-xl font-semibold">No scrap requests yet</p>
              <p className="text-gray-400 mt-2">Submit your first scrap request above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {requests.map((req) => {
                const statusConfig = {
                  pending: {
                    bg: 'bg-yellow-50',
                    border: 'border-l-4 border-yellow-500',
                    badge: 'bg-yellow-100 text-yellow-800',
                    icon: Clock
                  },
                  approved: {
                    bg: 'bg-green-50',
                    border: 'border-l-4 border-green-500',
                    badge: 'bg-green-100 text-green-800',
                    icon: CheckCircle
                  },
                  rejected: {
                    bg: 'bg-red-50',
                    border: 'border-l-4 border-red-500',
                    badge: 'bg-red-100 text-red-800',
                    icon: XCircle
                  }
                };

                const config = statusConfig[req.status] || statusConfig.pending;
                const StatusIcon = config.icon;

                return (
                  <div key={req._id} className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 ${config.border} transform hover:translate-x-1`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Car Model</p>
                        <p className="text-3xl font-bold text-slate-900 mb-4">{req.carId?.model || 'N/A'}</p>
                        <span className={`inline-flex items-center gap-2 ${config.badge} px-4 py-2 rounded-full text-sm font-bold`}>
                          <StatusIcon size={18} />
                          {req.status?.toUpperCase()}
                        </span>
                      </div>                      
                      {req.status === 'pending' && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleApproveRequest(req._id)}
                            disabled={actionLoading === req._id}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition-all"
                            >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectRequest(req._id)}
                            disabled={actionLoading === req._id}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl transition-all"
                            >
                            Reject
                          </button>
                          <button
                            onClick={() => handleCancelRequest(req._id)}
                            disabled={actionLoading === req._id}
                            className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-3 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 whitespace-nowrap disabled:opacity-50 shadow-lg"
                            >
                            <Trash2 size={20} />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
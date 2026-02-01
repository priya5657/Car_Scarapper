'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RequestScrapPage() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    estimatedPrice: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    images: [],
    notes: ''
  });
  const router = useRouter();

  // Fetch all cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/car/getall`);
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCar) {
      alert('Please select a car');
      return;
    }

    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('carId', selectedCar._id);
      formDataToSend.append('estimatedPrice', formData.estimatedPrice);
      formDataToSend.append('location', JSON.stringify(formData.location));
      formDataToSend.append('notes', formData.notes);
      
      formData.images.forEach(image => {
        formDataToSend.append('images', image);
      });

    const token = localStorage.getItem("token");
     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/request-scrap`, formDataToSend, {
      
        headers: { 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Scrap request submitted successfully!');
      router.push('/dealer/dashboard');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit scrap request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8">Loading cars...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Request Car Scrap</h1>

      {/* Car Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cars.map(car => (
            <div
              key={car._id}
              onClick={() => handleCarSelect(car)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                selectedCar?._id === car._id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <p className="font-semibold">{car.make} {car.model}</p>
              <p className="text-gray-600">{car.year}</p>
              <p className="text-sm text-gray-500">Reg: {car.registrationNumber}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedCar && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Details Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Selected Car Details</h3>
            <p><span className="font-medium">Make/Model:</span> {selectedCar.make} {selectedCar.model} ({selectedCar.year})</p>
            <p><span className="font-medium">VIN:</span> {selectedCar.vin}</p>
            <p><span className="font-medium">Condition:</span> {selectedCar.condition}</p>
          </div>

          {/* Estimated Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Estimated Price *</label>
            <input
              type="number"
              name="estimatedPrice"
              value={formData.estimatedPrice}
              onChange={handleInputChange}
              placeholder="Enter estimated scrap price"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-3">
            <h3 className="font-semibold">Pickup Location</h3>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleInputChange}
              placeholder="Street Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleInputChange}
                placeholder="City"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleInputChange}
                placeholder="State"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <input
              type="text"
              name="location.zipCode"
              value={formData.location.zipCode}
              onChange={handleInputChange}
              placeholder="Zip Code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {formData.images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">{formData.images.length} image(s) selected</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add any additional details about the car"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {submitting ? 'Submitting...' : 'Submit Scrap Request'}
          </button>
        </form>
      )}
    </div>
  );
}
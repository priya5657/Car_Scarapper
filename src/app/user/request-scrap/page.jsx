'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Car, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RequestScrapPage() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch user's cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Login required');
          return;
        }

        const res = await axios.get('http://localhost:5000/user/my-cars', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCars(res.data || []);
      } catch (err) {
        console.error('Error fetching cars:', err);
        alert('Failed to fetch cars');
      }
    };

    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCar) {
      alert('Please select a car');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/user/scrap-request',
        { carId: selectedCar },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Scrap request submitted successfully');
      setSelectedCar('');

      // Redirect to manage scrap requests page
      router.push('/user/manage-car');
    } catch (err) {
      console.error('Request failed:', err);
      alert(err.response?.data?.message || 'Failed to send scrap request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Car /> Request Car Scrap
      </h2>

      {cars.length === 0 ? (
        <p className="text-gray-500">No cars found. Please add a car first.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
        >
          <label className="block font-semibold">Select Car</label>
          <select
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="">-- Select your car --</option>
            {cars.map((car) => (
              <option key={car._id} value={car._id}>
                {car.brand} {car.model} ({car.year})
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send size={18} />
            {loading ? 'Submitting...' : 'Send Scrap Request'}
          </button>
        </form>
      )}
    </section>
  );
}

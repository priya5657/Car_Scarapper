// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// const CarListPage = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Fetch all cars
//   const fetchCars = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/car/getall`);
//       setCars(data);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//       toast.error('Failed to fetch cars');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete car
//   const handleDelete = async (carId) => {
//     if (!confirm('Are you sure you want to delete this car?')) return;

//     try {
//       await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/car/delete/${carId}`);
//       toast.success('Car deleted successfully');
//       fetchCars(); // Refresh the list
//     } catch (error) {
//       console.error('Error deleting car:', error);
//       toast.error('Failed to delete car');
//     }
//   };

//   // Navigate to edit page
//   const handleEdit = (carId) => {
//     router.push(`/user/edit-car/${carId}`);
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   if (loading) return <div className="text-center mt-10 text-lg">Loading cars...</div>;

//   return (
//     <div className="container mx-auto p-5">
//       <h1 className="text-2xl font-bold mb-5">Car List</h1>
//       {cars.length === 0 ? (
//         <p>No cars found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {cars.map((car) => (
//             <div key={car._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col">
//               <h2 className="font-semibold text-lg">{car.carMake} {car.carModel}</h2>
//               <p>Year: {car.year}</p>
//               <p>Mileage: {car.mileage} km</p>
//               <p>Condition: {car.condition}</p>
//               {car.images && car.images.length > 0 && (
//                 <img
//                   src={car.images[0].url}
//                   alt={`${car.carMake} ${car.carModel}`}
//                   className="mt-2 w-full h-40 object-cover rounded"
//                 />
//               )}
//               <div className="mt-3 flex justify-between gap-2">
//                 <button
//                   onClick={() => handleEdit(car._id)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(car._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarListPage;











'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CarListPage = () => {
  const [cars, setCars] = useState([]);  

  // Fetch cars submitted by the logged-in user
  const fetchCars = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/car/getall`); // Make sure your backend provides this route  
      console.log(data);
      
      setCars(data);
    } catch (error) {
      console.error(error);  
      toast.error("Failed to fetch cars");
    }
  };

  useEffect(() => {
    fetchCars();  
  }, []);

  return (
    <div className="container mx-auto p-5">  
      <h1 className="text-2xl font-bold mb-5">🚗 My Submitted Cars</h1>

      {cars.length === 0 ? (
        <p>No cars submitted yet.</p>  
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
          {cars.map((car) => (
            <div  
              key={car._id}
              className="border p-3 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">
                {car.carMake} {car.carModel}
              </h3>
              <p>Year: {car.year}</p>
              <p>Mileage: {car.mileage} km</p>
              <p>Condition: {car.condition}</p>
              <p>Status: {car.status}</p>
              {car.scrapValue && car.scrapValue > 0 && (
                <p>Scrap Value: ₹{car.scrapValue}</p>  
              )}
              {car.images && car.images.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">  
                  {car.images.map((img, idx) => (
                    <img  
                      key={idx}
                      src={img}
                      alt={car.carModel}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListPage;


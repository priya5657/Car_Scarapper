// // "use client";
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";

// // const CarListPage = () => {
// //   const [cars, setCars] = useState([]);

// //   // Fetch cars from backend
// //   const fetchCars = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/car/all");
// //       setCars(res.data.cars || []);
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Failed to fetch cars");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCars();
// //   }, []);

// //   // Delete car
// //   const deleteCar = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/car/delete/${id}`);
// //       toast.success("Car deleted!");
// //       fetchCars(); // refresh list
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Failed to delete");
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-5">
// //       <h1 className="text-2xl font-bold mb-5">Car Scrapper - All Cars</h1>

// //       {cars.length === 0 ? (
// //         <p className="text-center text-gray-500">No cars found</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// //           {cars.map((car) => (
// //             <div
// //               key={car._id}
// //               className="bg-white p-4 rounded-lg shadow-md border"
// //             >
// //               {/* Show Image */}
// //               {car.images && car.images.length > 0 ? (
// //                 <img
// //                   src={`http://localhost:5000/uploads/${car.images[0]}`}
// //                   alt="Car"
// //                   className="w-full h-40 object-cover rounded-md mb-3"
// //                 />
// //               ) : (
// //                 <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-3">
// //                   No Image
// //                 </div>
// //               )}

// //               <h2 className="text-xl font-semibold">
// //                 {car.carMake} {car.carModel}
// //               </h2>

// //               <p className="text-gray-600">Year: {car.year}</p>
// //               <p className="text-gray-600">Mileage: {car.mileage} km</p>
// //               <p className="text-gray-600">Condition: {car.condition}</p>

// //               <div className="flex gap-3 mt-4">
// //                 <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
// //                   Edit
// //                 </button>

// //                 <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
// //                   View
// //                 </button>

// //                 <button
// //                   onClick={() => deleteCar(car._id)}
// //                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CarListPage;






// 'use client';

// import React from 'react';
// import Link from 'next/link';

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5">
//       <h1 className="text-4xl font-bold mb-4">Welcome to Car Scrapper</h1>
//       <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
//         Easily submit your old or damaged cars for scrapping. Keep your garage clean and
//         get your cars recycled responsibly.
//       </p>

//       <div className="flex gap-4">
//         <Link href="/add-car">
//           <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
//             Add a Car
//           </button>
//         </Link>
//         <Link href="/cars-list">
//           <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
//             View Submitted Cars
//           </button>
//         </Link>
//       </div>

//       <div className="mt-10 text-gray-500 text-sm text-center max-w-md">
//         Note: This is a simple demo homepage. You can add more features like car statistics, 
//         recently submitted cars, and user profiles here.
//       </div>
//     </div>
//   );
// };

// export default HomePage;


'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const HomePage = () => {
  // Dummy submitted cars data
  const [submittedCars] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2010, condition: 'Good' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2012, condition: 'Fair' },
    { id: 3, make: 'Ford', model: 'Fiesta', year: 2008, condition: 'Poor' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Car Scrapper</h1>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">
          Submit your old or damaged cars for scrapping and help recycle responsibly.
        </p>
      </header>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <Link href="/user/add-car">
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
            Add a Car
          </button>
        </Link>
        <Link href="/carlist">
          <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
            View Cars
          </button>
        </Link>
      </div>

      {/* Recently Submitted Cars */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recently Submitted Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {submittedCars.map((car) => (
            <div
              key={car.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
              <p className="text-gray-600">Year: {car.year}</p>
              <p className="text-gray-600">Condition: {car.condition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Car Scrapper. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

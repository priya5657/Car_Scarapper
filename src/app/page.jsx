// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';

// const HomePage = () => {
//   // Dummy submitted cars data
//   const [submittedCars] = useState([
//     { id: 1, make: 'Toyota', model: 'Corolla', year: 2010, condition: 'Good' },
//     { id: 2, make: 'Honda', model: 'Civic', year: 2012, condition: 'Fair' },
//     { id: 3, make: 'Ford', model: 'Fiesta', year: 2008, condition: 'Poor' },
//   ]);

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">

//       {/* Hero Section */}
//       <section className="px-6 py-20 text-center">
//         <h1 className="text-5xl font-bold mb-6">
//           Smart Vehicle Scrapping <span className="text-yellow-400">Platform</span>
//         </h1>

//         <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-10">
//           Car Scraper helps you recycle end-of-life vehicles responsibly.
//            Submit scrap requests, get approvals, and connect with authorized dealers
//           — all in one place.
//         </p>

//         {/* Action Buttons */}
//        <div className="flex justify-center gap-4 mb-10">
//          <Link href="/user/add-car">
//            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
//              Add a Car
//            </button>
//          </Link>
//          <Link href="/carlist">
//            <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
//              View Cars
//            </button>
//          </Link>
//        </div>
       
//        {/* Recently Submitted Cars */}
//        <section className="max-w-4xl mx-auto">
//           <h2 className="text-2xl font-semibold text-purple-800 mb-4">Recently Submitted Cars</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {submittedCars.map((car) => (
//             <div
//               key={car.id}
//               className="bg-slate-800 p-4 rounded-lg shadow hover:shadow-md transition"
//               >
//               <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
//               <p className="text-gray-600">Year: {car.year}</p>
//               <p className="text-gray-600">Condition: {car.condition}</p>
//             </div>
//             ))}
//           </div>
//         </section>        
//       </section> 
      
       
//       {/* Features Section */}
//       <section className="px-6 py-16 bg-slate-900">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

//           <div className="bg-slate-800 p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold text-yellow-400 mb-3">
//               Easy Scrap Requests
//             </h3>

//             <p className="text-gray-300">
//               Submit your vehicle details and request scrapping in just a few clicks.
//             </p>
//           </div>

//           <div className="bg-slate-800 p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold text-blue-400 mb-3">
//               Admin Verification
//             </h3>
//             <p className="text-gray-300">
//               Every request is verified by admins to ensure authenticity and safety.
//             </p>
//           </div>

//           <div className="bg-slate-800 p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold text-green-400 mb-3">
//               Authorized Dealers
//             </h3>
//             <p className="text-gray-300">
//               Requests are handled by registered and government-approved scrap dealers.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* Call To Action */}
//       <section className="px-6 py-20 text-center">
//         <h2 className="text-3xl font-bold mb-4">
//           Ready to Scrap Your Vehicle?
//         </h2>

//         <p className="text-gray-400 mb-8">
//           Join Car Scraper today and contribute to a cleaner environment.
//         </p>

//         <Link
//           href="/signup"
//           className="bg-green-600 px-8 py-3 rounded font-semibold hover:bg-green-700"
//           >
//           Register Now
//         </Link>
//       </section>

//       {/* Footer */}
//       <footer className="mt-20 text-center text-gray-500 text-sm">
//         &copy; {new Date().getFullYear()} Car Scrapper. All rights reserved.
//       </footer>
         
//     </div>
//   )
// };
// export default HomePage;


'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  // Dummy submitted cars data
  const [submittedCars] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2010, condition: 'Good' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2012, condition: 'Fair' },
    { id: 3, make: 'Ford', model: 'Fiesta', year: 2008, condition: 'Poor' },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Smart Vehicle Scrapping <span className="text-yellow-400">Platform</span>
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-10">
          Car Scraper helps you recycle end-of-life vehicles responsibly.
           Submit scrap requests, get approvals, and connect with authorized dealers
          — all in one place.
        </p>

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
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Recently Submitted Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {submittedCars.map((car) => (
            <div
              key={car.id}
              className="bg-slate-800 p-4 rounded-lg shadow hover:shadow-md transition"
              >
              <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
              <p className="text-gray-600">Year: {car.year}</p>
              <p className="text-gray-600">Condition: {car.condition}</p>
            </div>
            ))}
          </div>
        </section>        
      </section> 
      
       
      {/* Features Section */}
      <section className="px-6 py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-slate-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              Easy Scrap Requests
            </h3>

            <p className="text-gray-300">
              Submit your vehicle details and request scrapping in just a few clicks.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Admin Verification
            </h3>
            <p className="text-gray-300">
              Every request is verified by admins to ensure authenticity and safety.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Authorized Dealers
            </h3>
            <p className="text-gray-300">
              Requests are handled by registered and government-approved scrap dealers.
            </p>
          </div>

        </div>
      </section>

      {/* Call To Action */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Scrap Your Vehicle?
        </h2>

        <p className="text-gray-400 mb-8">
          Join Car Scraper today and contribute to a cleaner environment.
        </p>

        <Link
          href="/signup"
          className="bg-green-600 px-8 py-3 rounded font-semibold hover:bg-green-700"
          >
          Register Now
        </Link>
      </section>    



      {/* FOOTER */}
      <footer className="grid md:grid-cols-4 gap-25 px-12 py-16 mt-20 bg-[#070b13]">

        {/* ABOUT */}
        <div>
          <h3 className="font-bold text-xl mb-3">Car Scraper</h3>
          <p className="text-gray-400 text-sm">
            A modern car scrapping platform offering instant valuation, doorstep pickup, and legal vehicle disposal — simple, fast, and reliable.
          </p>

          <div className="flex gap-3 mt-4">
            <Facebook size={18}/>
            <Twitter size={18}/>
            <Linkedin size={18}/>
            <Youtube size={18}/>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="text-gray-400 space-y-2">
            
            <li><Link href='/' className="mr-5 hover:text-white">Home</Link></li>
            <li><Link href="/carlist" className="mr-5 hover:text-white">Cars</Link></li>
            <li><Link href="/about" className="mr-5 hover:text-white">About</Link></li>
            <li><Link href="/contact" className="mr-5 hover:text-white">Contact</Link></li> 

          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-3">Contact Us</h4>

          <p className="text-gray-400 text-sm">
            123 Drive Avenue, Auto City, CA 90001
          </p>

          <p className="text-gray-400 mt-2">+91 8294341275</p>
          <p className="text-gray-400">info@karzoneservices.com</p>

          <p className="text-sm mt-4">
            Business Hours<br/>
            Mon-Fri: 9AM-8PM<br/>
            Sat: 10AM-6PM<br/>
            Sun: 12PM-4PM
          </p>
        </div>

        {/* NEWSLETTER */}
        {/* <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <input
            placeholder="Your Email"
            className="w-full p-2 rounded bg-gray-800 outline-none"
          />
          <button className="mt-3 bg-orange-500 w-full py-2 rounded">
            Subscribe
          </button>
        </div> */}

      </footer>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Car Scrapper. All rights reserved.
      </footer>
         
    </div>
  )
};
export default HomePage;








'use client';

import { useState } from "react";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    car: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "919876543219"; // 🔴 CHANGE TO YOUR NUMBER

    const text = `
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Car Type: ${form.car}
Message: ${form.message}
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">
            Contact Our Team
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have questions about vehicle scrapping or recycling? Our team is here to
            guide you through a safe, legal, and eco-friendly car disposal process.
         </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">


          

          {/* LEFT INFO */}
          <div className="bg-gray-800 p-6 rounded-xl space-y-6">

            <h2 className="text-lg font-semibold text-orange-500">
            Our Information
          </h2>


            <a
              href="https://wa.me/919876543219"
              target="_blank"
              className="flex items-center gap-4 bg-gray-700 p-4 rounded-lg"
            >
              <span className="text-green-500 text-2xl">📱</span>
              <div>
                <p className="text-gray-300">WhatsApp</p>
                <p className="font-semibold">+91 98765 43219</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-gray-700 p-4 rounded-lg">
              <span className="text-yellow-500 text-2xl">✉️</span>
              <div>
                <p className="text-gray-300">Email</p>
                <p className="font-semibold">contact@karzone.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-700 p-4 rounded-lg">
              <span className="text-yellow-400 text-2xl">⏰</span>
              <div>
                <p className="text-gray-300">Hours</p>
                <p className="font-semibold">Mon – Sat: 9AM – 8PM</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-gray-800 p-6 rounded-xl">

            <h2 className="text-xl text-orange-500 mb-4">Send Your Inquiry</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid md:grid-cols-2 gap-4">
                <input name="name" onChange={handleChange} placeholder="Full Name"
                  className="p-3 bg-gray-700 rounded w-full" required />

                <input name="email" onChange={handleChange} placeholder="Email"
                  className="p-3 bg-gray-700 rounded w-full" required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input name="phone" onChange={handleChange} placeholder="Phone"
                  className="p-3 bg-gray-700 rounded w-full" required />

                <select name="car" onChange={handleChange}
                  className="p-3 bg-gray-700 rounded w-full">

                  <option value="">Select Car</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                  <option>Truck</option>
                </select>
              </div>

              <textarea name="message" onChange={handleChange}
                placeholder="Your Message"
                className="p-3 bg-gray-700 rounded w-full h-32" />

              <button
                type="submit"
                className="w-full bg-orange-500 p-3 rounded font-bold"
              >
               Send Message ✈️
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}


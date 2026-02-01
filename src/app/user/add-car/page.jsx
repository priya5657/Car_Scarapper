'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddCarPage = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    brand: Yup.string().required('Car brand is required').min(2, 'Must be at least 2 characters'),
    model: Yup.string().required('Car model is required').min(2, 'Must be at least 2 characters'),
    type: Yup.string().required('Car type is required').oneOf(['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric'], 'Invalid car type'),
    fuelType: Yup.string().required('Fuel type is required').oneOf(['Petrol', 'Diesel', 'Electric', 'Hybrid'], 'Invalid fuel type'),
    year: Yup.number().required('Year is required').min(1900, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
    price: Yup.number().required('Price is required').min(0, 'Price cannot be negative'),
    mileage: Yup.number().required('Mileage is required').min(0, 'Mileage cannot be negative'),
    condition: Yup.string().required('Condition is required').oneOf(['good', 'bad', 'needs repair'], 'Invalid condition'),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      type: 'SUV',
      fuelType: 'Petrol',
      year: new Date().getFullYear(),
      price: '',
      mileage: '',
      condition: 'good',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (images.length === 0) {
        toast.error('Please upload at least one image');
        return;
      }

      setUploading(true);

      try {
        // Upload images to Cloudinary
        const uploadedUrls = await uploadImagesToCloudinary(images);

        // Save car data with image URLs to MongoDB
        const carData = {
          ...values,
          images: uploadedUrls,
        };

        const response = await axios.post(
          'http://localhost:5000/car/add',
          carData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log('Car submitted:', response.data);
        toast.success('Car submitted successfully!');

        // Reset form
        formik.resetForm();
        setImages([]);
        document.getElementById('fileInput').value = '';
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || 'Failed to submit car');
      } finally {
        setUploading(false);
      }
    },
  });

  const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        uploadedUrls.push(response.data.secure_url);
        toast.success(`Image uploaded: ${file.name}`);
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    return uploadedUrls;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const getFieldError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName];
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-5">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full border-4 border-green-400 transform transition-transform duration-300">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-8 text-center drop-shadow-lg">
          🚗 Add a Car for Scrapping
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="brand" className="block text-lg font-semibold text-purple-700 mb-2">
              Car Brand
            </label>
            <input
              id="brand"
              type="text"
              name="brand"
              placeholder="e.g., Toyota"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:border-green-500 text-gray-800 placeholder-gray-500 ${
                getFieldError('brand') ? 'border-red-500 focus:ring-red-400' : 'border-purple-300 focus:ring-green-400'
              }`}
            />
            {getFieldError('brand') && <p className="text-red-500 text-sm mt-1">{formik.errors.brand}</p>}
          </div>

          <div>
            <label htmlFor="model" className="block text-lg font-semibold text-purple-700 mb-2">
              Car Model
            </label>
            <input
              id="model"
              type="text"
              name="model"
              placeholder="e.g., Camry"
              value={formik.values.model}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:border-green-500 text-gray-800 placeholder-gray-500 ${
                getFieldError('model') ? 'border-red-500 focus:ring-red-400' : 'border-purple-300 focus:ring-green-400'
              }`}
            />
            {getFieldError('model') && <p className="text-red-500 text-sm mt-1">{formik.errors.model}</p>}
          </div>

          <div>
            <label htmlFor="type" className="block text-lg font-semibold text-purple-700 mb-2">
              Car Type
            </label>
            <select
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:border-green-500 text-gray-800 ${
                getFieldError('type') ? 'border-red-500 focus:ring-red-400' : 'border-purple-300 focus:ring-green-400'
              }`}
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
            {getFieldError('type') && <p className="text-red-500 text-sm mt-1">{formik.errors.type}</p>}
          </div>

          <div>
            <label htmlFor="fuelType" className="block text-lg font-semibold text-purple-700 mb-2">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formik.values.fuelType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:border-green-500 text-gray-800 ${
                getFieldError('fuelType') ? 'border-red-500 focus:ring-red-400' : 'border-purple-300 focus:ring-green-400'
              }`}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {getFieldError('fuelType') && <p className="text-red-500 text-sm mt-1">{formik.errors.fuelType}</p>}
          </div>

          <div>
            <label htmlFor="year" className="block text-lg font-semibold text-purple-700 mb-2">
              Year
            </label>
            <input
              id="year"
              type="number"
              name="year"
              placeholder="e.g., 2020"
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:border-green-500 text-gray-800 placeholder-gray-500 ${
                getFieldError('year') ? 'border-red-500 focus:ring-red-400' : 'border-purple-300 focus:ring-green-400'
              }`}
            />
            {getFieldError('year') && <p className="text-red-500 text-sm mt-1">{formik.errors.year}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block text-lg font-semibold text-purple-700 mb-2">
              Price (₹)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="e.g., 500000"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:border-green-500 text-gray-800 placeholder-gray-500 ${
                getFieldError('price') ? 'border-red-500 focus:ring-red-400' : 'border-purple-300 focus:ring-green-400'
              }`}
            />
            {getFieldError('price') && <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>}
          </div>

          <div>
            <label htmlFor="mileage" className="block text-lg font-semibold text-purple-700 mb-2">
              Mileage (km)
            </label>
            <input
              id="mileage"
              type="number"
              name="mileage"
              placeholder="e.g., 50000"
              value={formik.values.mileage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:border-green-500 text-gray-800 placeholder-gray-500 ${
                getFieldError('mileage') ? 'border-red-500 focus:ring-red-400' : 'border-purple-300 focus:ring-green-400'
              }`}
            />
            {getFieldError('mileage') && <p className="text-red-500 text-sm mt-1">{formik.errors.mileage}</p>}
          </div>

          <div>
            <label htmlFor="condition" className="block text-lg font-semibold text-purple-700 mb-2">
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formik.values.condition}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-4 border-2 rounded-2xl focus:ring-4 focus:border-green-500 text-gray-800 ${
                getFieldError('condition') ? 'border-red-500 focus:ring-red-400' : 'border-purple-300 focus:ring-green-400'
              }`}
            >
              <option value="good">Good</option>
              <option value="bad">Bad</option>
              <option value="needs repair">Needs Repair</option>
            </select>
            {getFieldError('condition') && <p className="text-red-500 text-sm mt-1">{formik.errors.condition}</p>}
          </div>

          <div>
            <label htmlFor="fileInput" className="block text-lg font-semibold text-purple-700 mb-2">
              Upload Images
            </label>
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-4 border-2 border-purple-300 rounded-2xl focus:ring-4 focus:ring-green-400 focus:border-green-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-lg file:font-bold file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
          </div>

          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((file, idx) => (
                <span key={idx} className="text-sm bg-purple-200 px-3 py-2 rounded-full text-purple-800">
                  {file.name}
                </span>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting || uploading}
            className="w-full py-4 bg-linear-to-r from-green-500 to-teal-500 text-white font-bold text-xl rounded-2xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {formik.isSubmitting || uploading ? 'Uploading & Submitting...' : 'Submit Car'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCarPage;



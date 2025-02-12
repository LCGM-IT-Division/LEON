"use client"

import { useState } from "react"

export default function AddBusinessForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    website: "",
  })
  const [images, setImages] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data and images to your server
    console.log("Form data:", formData)
    console.log("Images:", images)
    // Reset form after submission
    setFormData({
      name: "",
      category: "",
      description: "",
      address: "",
      phone: "",
      website: "",
    })
    setImages([])
    alert("Business added successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Business Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Food & Beverage">Food & Beverage</option>
          <option value="Retail">Retail</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
          rows={4}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="website" className="block mb-2">
          Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="images" className="block mb-2">
          Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageUpload}
          multiple
          accept="image/*"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="bg-[#8E2157] text-white px-6 py-2 rounded hover:bg-[#6D1A42]">
        Add Business
      </button>
    </form>
  )
}

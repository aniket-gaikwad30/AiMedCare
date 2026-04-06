import React, { useState } from "react";
import { Search, X, MapPin, Star } from "lucide-react";

const SPECIALIZATIONS = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Psychiatrist",
  "General Physician",
];

const DOCTORS = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "Cardiologist", rating: 4.9, reviews: 312, location: "City Heart Center", distance: "1.2 km", available: true },
  { id: "2", name: "Dr. Michael Chen", specialty: "Neurologist", rating: 4.8, reviews: 245, location: "NeuroHealth Clinic", distance: "2.5 km", available: true },
  { id: "3", name: "Dr. Priya Sharma", specialty: "Dermatologist", rating: 4.7, reviews: 198, location: "SkinCare Institute", distance: "0.8 km", available: false },
  { id: "4", name: "Dr. James Wilson", specialty: "General Physician", rating: 4.6, reviews: 423, location: "MedCare Hospital", distance: "3.1 km", available: true },
  { id: "5", name: "Dr. Emma Rodriguez", specialty: "Pediatrician", rating: 4.9, reviews: 567, location: "Children's Health Clinic", distance: "1.7 km", available: true },
  { id: "6", name: "Dr. Ahmed Hassan", specialty: "Orthopedic", rating: 4.5, reviews: 189, location: "BoneJoint Center", distance: "4.2 km", available: false },
  { id: "7", name: "Dr. Lily Thompson", specialty: "Psychiatrist", rating: 4.8, reviews: 134, location: "MindWell Clinic", distance: "2.0 km", available: true },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");

  const filtered = DOCTORS.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());

    const matchSpec = selectedSpec === "All" || d.specialty === selectedSpec;

    return matchSearch && matchSpec;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <button className="text-gray-700">←</button>
        <h1 className="font-semibold text-lg">Find Doctors</h1>
        <div className="w-6" />
      </div>

      {/* Search */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4">
        <div className="flex items-center bg-white rounded-xl px-3 py-2 gap-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            className="flex-1 outline-none text-sm"
            placeholder="Search doctors or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Specializations */}
      <div className="flex overflow-x-auto gap-2 px-4 py-2 bg-white">
        {SPECIALIZATIONS.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSpec(s)}
            className={`px-4 py-1 rounded-full border text-sm whitespace-nowrap
              ${
                selectedSpec === s
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-3">
          {filtered.length} doctors found
        </p>

        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="flex gap-4 bg-white p-4 rounded-xl shadow-sm mb-3 hover:scale-[0.99] transition"
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="font-bold text-lg text-teal-600">
                {doc.name.charAt(4)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-sm">{doc.name}</h2>

                <span
                  className={`text-xs px-2 py-1 rounded 
                  ${
                    doc.available
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {doc.available ? "Available" : "Busy"}
                </span>
              </div>

              <p className="text-sm text-teal-600">{doc.specialty}</p>

              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={doc.rating} />
                <span className="text-xs text-gray-500">
                  {doc.rating} ({doc.reviews})
                </span>
              </div>

              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <MapPin size={12} />
                {doc.location} · {doc.distance}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-lg font-medium">No doctors found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
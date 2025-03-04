import React from "react";
import "./user.css"; // Import CSS for styling scrollbar

const cats = [
  { name: "Grisù", age: "5 mesi", gender: "Maschio", fur: "Medio", location: "Bergamo", image: "/cat1.jpg" },
  { name: "Luna", age: "3 mesi", gender: "Femmina", fur: "Corto", location: "Milano", image: "/cat2.jpg" },
  { name: "Milo", age: "4 mesi", gender: "Maschio", fur: "Lungo", location: "Roma", image: "/cat3.jpg" },
  { name: "Bella", age: "2 mesi", gender: "Femmina", fur: "Medio", location: "Napoli", image: "/cat4.jpg" },
  { name: "Leo", age: "6 mesi", gender: "Maschio", fur: "Corto", location: "Torino", image: "/cat5.jpg" },
];

const UserQuery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-pink-200 flex justify-center items-center">
      <div className="relative w-[90vw]">
        {/* Scrollable container */}
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-5">
          {cats.map((cat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 w-72 flex flex-col items-center"
            >
              {/* Profile Image */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-36 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Cat Details */}
              <div className="text-center mt-3">
                <h2 className="text-lg font-bold text-gray-800">{cat.name}</h2>
                <p className="text-xs text-gray-500">📍 {cat.location}</p>
                <hr className="my-2 border-gray-300" />

                <p className="text-sm">
                  <strong>Età:</strong> {cat.age}
                </p>
                <p className="text-sm">
                  <strong>Sesso:</strong> {cat.gender}
                </p>
                <p className="text-sm">
                  <strong>Pelo:</strong> {cat.fur}
                </p>

                {/* Call to Action Button */}
                <button className="mt-3 bg-yellow-400 text-black px-3 py-1.5 text-sm rounded-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-md">
                  Mi presento
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserQuery;

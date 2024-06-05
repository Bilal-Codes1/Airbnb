import React from "react";
import Header from "./Header";
import { useProvider } from "../Context/Context";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { places } = useProvider();
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[70%] h-full">
        <Header />
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {places.length > 0 &&
            places.map((place, idx) => (
              <Link to={`/Airbnb/place/${place.id}`} key={idx}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {place.photos[0].url && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={place.photos[0]?.url}
                      alt=""
                    />
                  )}
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                  <span className="font-bold">${place.price}</span> per night
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

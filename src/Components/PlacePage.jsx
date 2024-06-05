import React from "react";
import { useParams } from "react-router-dom";
import { useProvider } from "../Context/Context";
import AddressLink from "./AddressLink";
import PlaceImg from "./PlaceImg";
import BookingWidget from "./BookingWidget";
import Header from "./Header";

const PlacePage = () => {
  const { places } = useProvider();
  const { id } = useParams();
  const place = places.find((place) => place.id === id);

  // Add a condition to check if place exists
  if (!place) {
    return <div>Loading...</div>;
  }

  const { title, address, desc, inTime, outTime, guests, extraInfo } = place;
  return (
    <div className="w-full flex justify-center">
      <div className="w-[70%]">
        <Header />
        <div className="mt-2 bg-gray-100 -mx-8 px-8 pt-8 w-full">
          <h1 className="text-3xl">{title}</h1>
          <AddressLink>{address}</AddressLink>
          <PlaceImg place={place} />
          <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
              <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {desc}
              </div>
              Check-in: {inTime}
              <br />
              Check-out: {outTime}
              <br />
              Max number of guests: {guests}
            </div>
            <div>
              <BookingWidget place={place} />
            </div>
          </div>
          <div className="bg-[#cccccc32] -mx-8 px-8 py-8 border-t border-t-[#ccc]">
            <div>
              <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-[#616161] leading-5">
              {extraInfo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;

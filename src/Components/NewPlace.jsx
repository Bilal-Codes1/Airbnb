import React, { useEffect, useState } from "react";
import Header from "./Header";
import AccountNav from "./AccountNav";
import PlaceGallery from "./PlaceGallery";
import Perks from "./Perks";
import CheckInOut from "./CheckInOut";
import { useProvider } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const NewPlace = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [isWifi, setIsWifi] = useState(false);
  const [isParking, setIsParking] = useState(false);
  const [isTv, setIsTv] = useState(false);
  const [isRadio, setIsRadio] = useState(false);
  const [isPets, setIsPets] = useState(false);
  const [isEntrance, setIsEntrance] = useState(false);
  const [inTime, setInTime] = useState(0);
  const [outTime, setOutTime] = useState(0);
  const [guests, setGuests] = useState(0);
  const [price, setPrice] = useState(0);
  const { photos, savePlace, deletePhoto } = useProvider();
  const handleSave = () => {
    savePlace(
      title,
      address,
      desc,
      extraInfo,
      isWifi,
      isParking,
      isTv,
      isRadio,
      isPets,
      isEntrance,
      inTime,
      outTime,
      guests,
      price,
      photos
    ).then(() => {
      navigate("/Airbnb/accomodations");
      photos.forEach((photo) => deletePhoto(photo.id));
    });
  };

  // Reset photos state when component unmounts or navigates away
  useEffect(() => {
    const cleanup = () => {
      // Delete all photos when unmounting component or navigating away
      photos.forEach((photo) => {
        deletePhoto(photo.id);
      });
    };

    return cleanup;
  }, []); // Dependency array is empty, so this effect only runs once when component mounts

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[70%] h-full">
        <Header />
        <AccountNav color="#FF6B6B" />
        <div className="mt-2 px-24 flex flex-col">
          <div className="flex flex-col">
            <span className="text-[#000] text-2xl font-medium text-left">
              Title
            </span>
            <span className="text-[#555]">
              Title for your place. should be short and catchy as in
              advertisment
            </span>
            <input
              type="text"
              className="w-full py-2 px-4 bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-col">
            <span className="text-[#000] text-2xl font-medium text-left">
              Address
            </span>
            <span className="text-[#555]">Address to this place</span>
            <input
              type="text"
              className="w-full py-2 px-4 bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1"
              placeholder="Adddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <PlaceGallery />
          <div className="mt-4 flex flex-col">
            <span className="text-[#000] text-2xl font-medium text-left">
              Description
            </span>
            <span className="text-[#555]">Description to the place</span>
            <textarea
              className="w-full py-2 px-4 bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1 h-28"
              placeholder="Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <Perks
            isWifi={isWifi}
            setIsWifi={setIsWifi}
            isParking={isParking}
            setIsParking={setIsParking}
            isTv={isTv}
            setIsTv={setIsTv}
            isRadio={isRadio}
            setIsRadio={setIsRadio}
            isPets={isPets}
            setIsPets={setIsPets}
            isEntrance={isEntrance}
            setIsEntrance={setIsEntrance}
          />
          <div className="mt-4 flex flex-col">
            <span className="text-[#000] text-2xl font-medium text-left">
              Extra Info
            </span>
            <span className="text-[#555]">house rules, etc</span>
            <textarea
              className="w-full py-2 px-4 bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1 h-28"
              placeholder="Extra Info..."
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
          </div>
          <CheckInOut
            inTime={inTime}
            setInTime={setInTime}
            outTime={outTime}
            setOutTime={setOutTime}
            guests={guests}
            setGuests={setGuests}
            price={price}
            setPrice={setPrice}
          />
          <div className="w-full py-2 bg-Primary rounded-full flex justify-center items-center mt-4 mb-8">
            <button className="w-full text-[#fff]" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlace;

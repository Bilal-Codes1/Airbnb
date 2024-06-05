import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Components/MainPage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import ProfilePage from "./Components/ProfilePage";
import AccomodationsPage from "./Components/AccomodationsPage";
import NewPlace from "./Components/NewPlace";
import PlacePage from "./Components/PlacePage";
import BookedPlaces from "./Components/BookedPlaces";
import BookedPlace from "./Components/BookedPlace";

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Routes>
        <Route path="/Airbnb/" element={<MainPage />} />
        <Route path="/Airbnb/login" element={<LoginPage />} />
        <Route path="/Airbnb/register" element={<RegisterPage />} />
        <Route path="/Airbnb/profile" element={<ProfilePage />} />
        <Route path="/Airbnb/accomodations" element={<AccomodationsPage />} />
        <Route path="/Airbnb/accomodations/new" element={<NewPlace />} />
        <Route path="/Airbnb/place/:id" element={<PlacePage />} />
        <Route path="/Airbnb/bookings" element={<BookedPlaces />} />
        <Route path="/Airbnb/bookings/:bookingId" element={<BookedPlace />} />
        <Route path="*" element={<MainPage/>}/>
      </Routes>
    </div>
  );
};

export default App;

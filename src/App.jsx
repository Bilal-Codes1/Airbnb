import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
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
      <Router basename="/Airbnb/">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/accomodations" element={<AccomodationsPage />} />
          <Route path="/accomodations/new" element={<NewPlace />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/bookings" element={<BookedPlaces />} />
          <Route path="/bookings/:bookingId" element={<BookedPlace />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// ContextProvider.js
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Config/Firebase.config";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { setISODay } from "date-fns";

const Context = createContext();

export const useProvider = () => {
  return useContext(Context);
};

export const ContextProvider = ({ children }) => {
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [places, setPlaces] = useState([]);
  const [booked, setBooked] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      toast.success("Login successful!");
    } catch (error) {
      // Handle errors
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Wrong details");
      } else if (error.code === "auth/user-not-found") {
        toast.error("User not found");
      }
      console.log(error);
    }
  };

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCred) => {
          setUser(userCred.user);
          console.log(userCred);
          toast.success("Signup successful!");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logout successful!");
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const status = emailRegex.test(email);
    setEmailValidation(status);
  };

  const checkPassword = (password) => {
    const minLength = 8;
    const status = password.length >= minLength;
    setPasswordValidation(status);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const db = getFirestore();
      const photosRef = collection(db, "photos");
      const photosSnapshot = await getDocs(photosRef);
      const photosData = photosSnapshot.docs.map((doc) => ({
        url: doc.data().url,
        id: doc.id,
      }));
      setPhotos(photosData);
    };

    fetchPhotos();
    return () => {};
  }, []);

  const handlePhotoUpload = async (event) => {
    const selectedPhotos = Array.from(event.target.files);

    const storage = getStorage();
    const photoUrls = [];

    for (const photo of selectedPhotos) {
      const storageRef = ref(storage, `photos/${photo.name}`);
      await uploadBytes(storageRef, photo);

      const url = await getDownloadURL(storageRef);
      photoUrls.push(url);
    }

    const db = getFirestore();
    const photosRef = collection(db, "photos");

    for (const url of photoUrls) {
      await addDoc(photosRef, { url });
    }

    setPhotos((prevPhotos) => [...prevPhotos, ...photoUrls]);
    toast.success("Photos uploaded successfully!");
    window.location.reload();
  };

  const deletePhoto = async (photoId) => {
    try {
      const db = getFirestore();
      const photoRef = doc(db, "photos", photoId);
      await deleteDoc(photoRef);
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== photoId)
      );
      toast.success("Photo deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const addPhotoByUrl = (url) => {
    setPhotos([...photos, { id: photos.length + 1, url }]);
  };

  const uploadImageUrlToFirestore = async (imageUrl) => {
    try {
      // Add image URL to Firestore collection
      await addDoc(collection(db, "photos"), {
        url: imageUrl,
        createdAt: new Date(),
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error uploading image URL to Firestore:", error);
    }
  };

  const savePlace = async (
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
  ) => {
    const colRef = collection(db, "places");
    const data = {
      title: title,
      address: address,
      desc: desc,
      extraInfo: extraInfo,
      isWifi: isWifi,
      isParking: isParking,
      isTv: isTv,
      isRadio: isRadio,
      isPets: isPets,
      isEntrance: isEntrance,
      inTime: inTime,
      outTime: outTime,
      guests: guests,
      price: price,
      photos: photos,
    };
    await addDoc(colRef, data);
  };

  useEffect(() => {
    return () => {
      deleteAllPhotos();
    };
  }, []);

  const deleteAllPhotos = () => {
    photos.forEach((photo) => {
      deletePhoto(photo.id);
    });
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      const placesCollection = collection(db, "places");
      const snapshot = await getDocs(placesCollection);
      const placesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaces(placesData);
    };

    fetchPlaces();
  }, []);

  const bookPlace = async (
    title,
    address,
    nights,
    checkIn,
    checkOut,
    total,
    photos
  ) => {
    const bookedRef = collection(db, "booked");
    const data = {
      title: title,
      address: address,
      nights: nights,
      checkIn: checkIn,
      checkOut: checkOut,
      total: total,
      photos: photos,
    };
    await addDoc(bookedRef, data);
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      const colRef = collection(db, "booked");
      const bookSnapshot = await getDocs(colRef);
      const bookedData = bookSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooked(bookedData);
    };

    fetchPlaces();
  }, []);

  const values = {
    user,
    setUser,
    signIn,
    signUp,
    logout,
    checkEmail,
    checkPassword,
    emailValidation,
    passwordValidation,
    photos,
    handlePhotoUpload,
    deletePhoto,
    addPhotoByUrl,
    uploadImageUrlToFirestore,
    savePlace,
    places,
    bookPlace,
    booked,
    isOpen,
    setISODay,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default ContextProvider;

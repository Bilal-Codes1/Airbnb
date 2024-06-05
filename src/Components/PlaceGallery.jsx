import React, { useState } from "react";
import { useProvider } from "../Context/Context";

const PlaceGallery = () => {
  const { photos, handlePhotoUpload, deletePhoto, uploadImageUrlToFirestore } =
    useProvider();
  const [imageUrl, setImageUrl] = useState("");
  const handleDeleteClick = (photoId) => {
    if (photoId) {
      deletePhoto(photoId);
    } else {
      console.error("Invalid photoId:", photoId);
    }
  };

  const handleAddPhoto = async () => {
    if (imageUrl) {
      // Upload image URL to Firestore
      await uploadImageUrlToFirestore(imageUrl);
      // Update context state with the new image URL
      // Update photos state with the new image
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <span className="text-[#000] text-2xl font-medium text-left">Photos</span>
      <span className="text-[#555]">more = better</span>
      <div className="w-full flex gap-3">
        <input
          type="text"
          className="w-[85%] py-2 px-4 bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1"
          placeholder="Add using a link ...jpg"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          className="bg-[#ddd] rounded-lg w-[15%] font-medium"
          onClick={handleAddPhoto}
        >
          Add photo
        </button>
      </div>
      <div className="flex mt-2 items-center">
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handlePhotoUpload}
          id="upload-photo"
        />
        <div className="flex flex-wrap mt-2">
          {photos.map((photo, index) => (
            <div
              className="w-32 h-28 object-cover border border-[#9e9e9e] rounded-xl mr-2 mb-2 relative"
              key={index}
            >
              <img
                src={photo.url}
                alt={`Uploaded Photo ${index}`}
                className="w-full h-full rounded-xl object-cover"
              />
              <span
                className="absolute bottom-2 right-2 bg-[#00000055] rounded-xl w-10 h-8 flex justify-center items-center"
                onClick={() => handleDeleteClick(photo.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </div>
          ))}
          <label htmlFor="upload-photo" className="cursor-pointer">
            <div className="w-32 h-28 flex items-center justify-center gap-2 border border-dotted border-[#9e9e9e] rounded-xl px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-20 h-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              <span>Upload</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PlaceGallery;

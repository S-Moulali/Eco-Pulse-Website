import React, { useRef, useState } from "react";
import { storage, db } from "../firebase"; // Import storage and db from Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // For adding data to Firestore
import { useNavigate } from "react-router-dom";

const ISSUE_TYPES = [
  "Pollution",
  "Deforestation",
  "Illegal Dumping",
  "Water Contamination",
  "Wildlife Disturbance",
  "Other",
];

function Report() {
  // Form State
  const [title, setTitle] = useState("");
  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [locationDetected, setLocationDetected] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // For file input
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Utility
  const triggerPhotoSelect = () => fileInputRef.current?.click();

  // Simple file preview handler
  function onPhotoChange(e) {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 3) return;
    setImages((imgs) => [...imgs, ...files].slice(0, 3));
  }

  function removeImage(idx) {
    setImages((imgs) => imgs.filter((_, i) => i !== idx));
  }

  function handleDetectLocation() {
    setLocationError("");
    setLocationDetected(false);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocationDetected(true),
      () => setLocationError("Permission denied or failed to get location.")
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    // Prepare the report data that will be stored in Firestore
    const reportData = {
      title,
      issueType,
      description: desc,
      images: [], // Placeholder for image URLs
      locationDetected,
      timestamp: serverTimestamp(), // Automatically set timestamp for the report
    };

    // Upload images to Firebase Storage and retrieve their URLs
    const uploadImages = images.map((file) => {
        const imageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(imageRef, file).then(() => getDownloadURL(imageRef));
      });

    // After all images are uploaded, store the URLs and add report data to Firestore
    Promise.all(uploadImages)
      .then((imageURLs) => {
        // Add the image URLs to the reportData
        reportData.images = imageURLs;

        // Add the report data to Firestore
        return addDoc(collection(db, "reports"), reportData);
      })
      .then(() => {
        setSubmitting(false);
        // alert("Report submitted successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
        setSubmitting(false);
        alert("An error occurred while submitting your report.");
      });
  }

  return (
    <div className="min-h-screen bg-[#F6F9F6] flex flex-col">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg width={26} height={26} viewBox="0 0 26 26" fill="none">
            <path
              d="M8.46 8.91C8.5 7.49 9.59 6.16 11.37 5.54C13.12 4.92 15.22 5.08 16.78 6.23C18.75 7.67 19.11 10.58 17.39 12.16C16.18 13.27 14.47 13.44 12.81 13.31L12.03 13.25"
              stroke="#279F3A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M14.3 13.99C15.93 14.38 17.69 13.31 18.17 11.92C18.79 10.17 18.27 8.16 17.01 6.71"
              stroke="#279F3A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="3"
              cy="3"
              r="3"
              transform="matrix(.99936 .03559 -.03559 .99936 20.018 17.527)"
              stroke="#279F3A"
              strokeWidth="2"
            />
          </svg>
          <span className="font-semibold text-lg text-[#182610] select-none">
            EcoAlert
          </span>
        </div>
        <nav className="flex items-center gap-6 text-[15px] text-[#182610]/90">
          <span className="flex items-center gap-1 cursor-pointer hover:underline transition">
            <span>🏠</span> Home
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:underline transition">
            <span>⚠️</span> Report
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:underline transition">
            <span>🗺️</span> Map
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:underline transition">
            <span>🌱</span> Tips
          </span>
          <button
            className="rounded border px-2 py-1 ml-2 hover:bg-gray-100 transition"
            aria-label="mode"
          >
            <span>🌓</span>
          </button>
          <button className="ml-1" aria-label="profile">
            <svg width="20" height="20" fill="none">
              <circle cx="10" cy="6.5" r="3.5" stroke="#232323" />
              <path d="M2 17a8 8 0 0 1 16 0" stroke="#232323" />
            </svg>
          </button>
        </nav>
      </header>
      {/* Main */}
      <main className="flex-1 flex flex-col justify-center items-center px-2">
        <h1 className="mt-4 font-bold text-3xl md:text-4xl text-center">
        Report Environmental Issue
        </h1>
        <p className="mb-6 text-[#46543A] text-base text-center mt-2">
          Help protect our environment by reporting issues in your community
        </p>
        <form
          className="w-full max-w-2xl bg-white rounded-xl border border-[#e8ede4] shadow-md flex flex-col px-10 py-10 animate-fadeIn"
          style={{ animation: "fadeIn .6s ease" }}
          onSubmit={handleSubmit}
        >
          <label className="font-semibold text-lg mb-1">
            New Environmental Report
          </label>
          <p className="text-sm text-gray-600 mb-2">
            Fill out the form below with details about the environmental issue
            you’ve observed
          </p>

          {/* Issue Title */}
          <div className="mb-4">
            <label className="font-semibold text-[15px]">Issue Title</label>
            <input
              className="mt-1 block w-full rounded border border-[#d6e6d3] bg-[#f8fbf7] px-3 py-2 text-sm outline-none focus:border-green-600 transition focus:shadow-md shadow-sm"
              placeholder="Briefly describe the environmental issue"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              autoComplete="off"
            />
            <p className="text-xs text-gray-500 mt-1">
              Provide a clear, specific title for the issue you’re reporting
            </p>
          </div>

          {/* Issue Type */}
          <div className="mb-4">
            <label className="font-semibold text-[15px]">Issue Type</label>
            <div className="relative mt-1">
              <select
                className="block w-full appearance-none rounded border border-[#d6e6d3] bg-[#f8fbf7] px-3 py-2 text-sm outline-none focus:border-green-600 transition"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
              >
                {ISSUE_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="18" height="18" fill="none">
                  <path
                    d="M4.5 7L9 11l4.5-4"
                    stroke="#c0c7bc"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Choose the category that best describes the issue
            </p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="font-semibold text-[15px]">Description</label>
            <textarea
              className="mt-1 block w-full rounded border border-[#d6e6d3] bg-[#f8fbf7] px-3 py-2 text-sm outline-none h-20 focus:border-green-600 transition resize-none focus:shadow-md shadow-sm"
              required
              placeholder="Provide details about the environmental issue"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={512}
            />
            <p className="text-xs text-gray-500 mt-1">
              Describe the issue in detail, including relevant observations
            </p>
          </div>

          {/* Images */}
          <div className="mb-4">
            <label className="font-semibold text-[15px]">
              Images{" "}
              <span className="text-xs font-normal text-gray-400">
                (Optional)
              </span>
            </label>
            <div className="flex flex-row gap-2 items-center mt-1">
              <div
                className="w-[96px] h-[96px] border-2 border-dashed border-[#c6dad2] flex flex-col items-center justify-center rounded-md cursor-pointer hover:border-green-500 transition group relative overflow-hidden"
                tabIndex={0}
                role="button"
                aria-label="Add Photo"
                onClick={triggerPhotoSelect}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && triggerPhotoSelect()
                }
              >
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  ref={fileInputRef}
                  disabled={images.length >= 3}
                  onChange={onPhotoChange}
                />
                <svg
                  className="mb-2 group-hover:scale-110 transition duration-300"
                  width={28}
                  height={28}
                  fill="none"
                >
                  <rect
                    x="5"
                    y="13"
                    width="18"
                    height="2"
                    rx="1"
                    fill="#7ca170"
                  />
                  <rect
                    x="13"
                    y="5"
                    width="2"
                    height="18"
                    rx="1"
                    fill="#7ca170"
                  />
                </svg>
                <span className="text-xs text-green-700">Add Photo</span>
              </div>
              {images.map((img, idx) => (
                <div className="relative group w-[96px] h-[96px]" key={idx}>
                  <img
                    src={URL.createObjectURL(img)} // This is for previewing the image
                    alt="upload preview"
                    className="object-cover w-full h-full rounded-md border border-green-100 animate-fadeIn"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    type="button"
                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition text-red-600"
                  >
                    <svg width="18" height="18" fill="none">
                      <circle cx="9" cy="9" r="9" fill="#fff" />
                      <path
                        d="M6 6l6 6M12 6l-6 6"
                        stroke="#e74c3c"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Add up to 3 images to help document the issue (optional)
            </p>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="font-semibold text-[15px]">
              Location{" "}
              <span className="text-xs font-normal text-gray-400">
                (Optional)
              </span>
            </label>
            <div className="flex items-center bg-[#f8fbf7] border border-[#d6e6d3] rounded px-3 py-2 select-none gap-3 mt-1">
              <span className="text-[18px] mr-2">📍</span>
              <button
                type="button"
                className={
                  "outline-none focus:ring-2 rounded " +
                  (locationDetected
                    ? "text-green-900 font-semibold"
                    : "text-green-900 underline hover:text-green-800 transition")
                }
                onClick={handleDetectLocation}
                disabled={locationDetected}
              >
                {locationDetected ? "Location detected" : "Detect my location"}
              </button>
              <span className="ml-2 text-xs text-green-600 flex-1">
                {locationDetected && "Location received!"}
                {locationError && (
                  <span className="text-red-500">{locationError}</span>
                )}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Adding your location helps assess the impact and enables
              geographic tracking
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-base rounded transition-all focus:ring-2 focus:ring-green-400 focus:ring-offset-1 mt-2 shadow-sm focus:outline-none flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed animate-fadeIn"
            disabled={submitting}
            style={{ animation: "fadeIn .7s ease" }}
          >
            {submitting ? (
              <span className="flex items-center">
                <span className="loader mr-2"></span> Submitting...
              </span>
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
        <div
          className="text-xs text-[#626b57] text-center mt-6 mb-4 max-w-xl animate-fadeIn"
          style={{ animation: "fadeIn .85s ease" }}
        >
          Your reports help us identify environmental hotspots and mobilize
          resources effectively. All reports are reviewed by our community
          moderators.
        </div>
      </main>
      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .animate-fadeIn { animation: fadeIn .65s cubic-bezier(.5,2,.19,.89); }
        .loader {
          width: 16px; height: 16px; border: 2.5px solid #fff; border-top: 2.5px solid #257e36;
          border-radius: 50%; display: inline-block; vertical-align: middle; animation: spin .7s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Report;

// src/components/MapDashboard.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy issues for demo — replace with Firebase data
const dummyReports = [
  {
    id: 1,
    title: "Illegal Dumping",
    description: "Trash piles near river",
    location: { lat: 28.644800, lng: 77.216721 }
  },
  {
    id: 2,
    title: "Smoke Pollution",
    description: "Factory emitting black smoke",
    location: { lat: 28.634800, lng: 77.206721 }
  }
];

// Custom Marker Icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
});

const MapDashboard = () => {
  return (
    <div className="h-screen w-full p-4">
     <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={true} className="h-full w-full">

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {dummyReports.map((report) => (
          <Marker
            key={report.id}
            position={[report.location.lat, report.location.lng]}
            icon={customIcon}
          >
            <Popup>
              <strong>{report.title}</strong>
              <br />
              {report.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapDashboard;

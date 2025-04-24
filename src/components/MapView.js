import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon fix (Leaflet's default icons don't load correctly without this)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function MapView() {
  const [reports, setReports] = useState([]);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: Center of India

  useEffect(() => {
    const fetchReports = async () => {
      const snapshot = await getDocs(collection(db, 'data'));
      const reportData = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.latitude && data.longitude) {
          reportData.push({
            id: doc.id,
            ...data,
          });
        }
      });

      setReports(reportData);

      // Optionally center map based on first report
      if (reportData.length > 0) {
        setMapCenter([reportData[0].latitude, reportData[0].longitude]);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="h-[80vh] w-full rounded-xl overflow-hidden">
      <MapContainer center={mapCenter} zoom={5} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((report) => (
          <Marker key={report.id} position={[report.latitude, report.longitude]}>
            <Popup>
              <strong>{report.title}</strong><br />
              {report.description}<br />
              <em>{report.location}</em>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

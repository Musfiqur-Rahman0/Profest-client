import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const FlyToCity = ({ lat, lng }) => {
  const map = useMap();
  map.flyTo([lat, lng], 10);
  return null;
};

const ServiceMap = ({ serviceAreas, selectedCity, notFound }) => {
  return (
    <MapContainer
      center={[23.8103, 90.4125]}
      zoom={8}
      style={{ height: "500px", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {serviceAreas.map((area, i) => (
        <div key={i}>
          <Marker position={[area.latitude, area.longitude]} icon={redIcon}>
            <Popup>
              <strong>{area.region}</strong>
            </Popup>
          </Marker>
          <Circle
            center={[area.latitude, area.longitude]}
            // radius={area.radius}
            pathOptions={{ color: "green", fillOpacity: 0.1 }}
          />
        </div>
      ))}

      {selectedCity && (
        <FlyToCity lat={selectedCity.latitude} lng={selectedCity.longitude} />
      )}

      {/* If not found, show a popup in center */}
      {notFound && (
        <>
          <FlyToCity lat={notFound.lat} lng={notFound.lng} />
          <Marker position={[notFound.lat, notFound.lng]}>
            <Popup>{notFound.message}</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};
export default ServiceMap;

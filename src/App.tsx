import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Types for our infrastructure data
interface Infrastructure {
  id: number;
  name: string;
  type: string;
  position: [number, number]; // [latitude, longitude]
  description: string;
}

// Sample infrastructure data
const sampleInfrastructures: Infrastructure[] = [
  {
    id: 1,
    name: "Central Hospital",
    type: "Healthcare",
    position: [51.505, -0.09],
    description: "Main city hospital with emergency services"
  },
  {
    id: 2,
    name: "City Power Plant",
    type: "Energy",
    position: [51.51, -0.1],
    description: "Main power generation facility"
  },
  {
    id: 3,
    name: "Water Treatment Facility",
    type: "Utility",
    position: [51.515, -0.09],
    description: "Clean water processing plant"
  },
  {
    id: 4,
    name: "Main Train Station",
    type: "Transportation",
    position: [51.52, -0.095],
    description: "Central railway hub"
  }
];

// Component to handle location finding
function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [locationFound, setLocationFound] = useState(false);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e: L.LocationEvent) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
      setLocationFound(true);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// Component to handle map events
function MapEvents({ setMapCenter }: { setMapCenter: (center: [number, number]) => void }) {
  const map = useMap();
  
  useEffect(() => {
    map.on('moveend', () => {
      const center = map.getCenter();
      setMapCenter([center.lat, center.lng]);
    });
    
    return () => {
      map.off('moveend');
    };
  }, [map, setMapCenter]);
  
  return null;
}

function App() {
  const [infrastructures, setInfrastructures] = useState<Infrastructure[]>(sampleInfrastructures);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedInfrastructure, setSelectedInfrastructure] = useState<Infrastructure | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]); // London as default
  const [mapZoom, setMapZoom] = useState(13);

  // Find user's location
  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please check your browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Add a new infrastructure at the current map center
  const addInfrastructure = () => {
    const name = prompt("Enter infrastructure name:");
    if (!name) return;
    
    const type = prompt("Enter infrastructure type (e.g., Healthcare, Energy, Transportation):");
    if (!type) return;
    
    const description = prompt("Enter a brief description:");
    if (!description) return;
    
    const newInfrastructure: Infrastructure = {
      id: infrastructures.length + 1,
      name,
      type,
      position: mapCenter,
      description
    };
    
    setInfrastructures([...infrastructures, newInfrastructure]);
    setSelectedInfrastructure(newInfrastructure);
  };

  // Focus on a specific infrastructure
  const focusOnInfrastructure = (infrastructure: Infrastructure) => {
    setSelectedInfrastructure(infrastructure);
    setMapCenter(infrastructure.position);
    setMapZoom(15);
  };

  return (
    <div className="map-container">
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map Events Handler */}
        <MapEvents setMapCenter={setMapCenter} />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        
        {/* Infrastructure markers */}
        {infrastructures.map((infra: Infrastructure) => (
          <Marker 
            key={infra.id} 
            position={infra.position}
            eventHandlers={{
              click: () => {
                setSelectedInfrastructure(infra);
              },
            }}
          >
            <Popup>
              <div>
                <h3>{infra.name}</h3>
                <p><strong>Type:</strong> {infra.type}</p>
                <p>{infra.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <LocationMarker />
      </MapContainer>
      
      {/* Controls */}
      <div className="controls">
        <button onClick={findMyLocation}>Find My Location</button>
        <button onClick={addInfrastructure}>Add Infrastructure</button>
      </div>
      
      {/* Infrastructure List */}
      <div className="infrastructure-list">
        <h3>Infrastructure List</h3>
        {infrastructures.map((infra: Infrastructure) => (
          <div 
            key={infra.id} 
            className="infrastructure-item"
            onClick={() => focusOnInfrastructure(infra)}
            style={{ 
              backgroundColor: selectedInfrastructure?.id === infra.id ? '#e6f7ff' : 'transparent',
              fontWeight: selectedInfrastructure?.id === infra.id ? 'bold' : 'normal'
            }}
          >
            <div>{infra.name}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>{infra.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App; 
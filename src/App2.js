import React, { useEffect } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css'
import L from 'leaflet';

const MagnimarMap = () => {
  const mapCenter = [0, 0];
  const zoom = -1
  const imageBounds = [[-4980, -3265.5], [4980, 3265.5]];



  useEffect(() => {
    const img = new Image();
    img.src = './magnimar.jpg';

    img.onload = function() {
      console.log("Image Width:", this.width);
      console.log("Image Height:", this.height);
    };

    // Optional: To handle potential errors, you can add an "onerror" event.
    img.onerror = function() {
      console.error("Error loading the image.");
    };
  }, []); // The empty dependency array ensures that this effect only runs once, similar to componentDidMount.


  return (
    <MapContainer center={mapCenter} zoom={zoom} minZoom={-5} maxZoom={10}style={{ width: '100%', height: '100vh' }} crs={L.CRS.Simple}>
      <TileLayer url="" />
      <ImageOverlay url="./magnimar.jpg" bounds={imageBounds} />
      {/* Add more layers or interactivity as needed */}
    </MapContainer>
  );
}

export default MagnimarMap;

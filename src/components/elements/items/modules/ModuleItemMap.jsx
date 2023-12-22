import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ children }) => children;

const ModuleItemMap = ({ position: { coordinates } }) => {
  const [, setZoom] = useState(13);
  const [, setBounds] = useState(null);
  const [lng, lat] = coordinates;

  return (
    <div className="map-container" style={{ widht: '100%', height: '400px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        }}
        defaultCenter={{
          lat,
          lng,
        }}
        defaultZoom={14}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        <Marker lat={lat} lng={lng}>
          <div
            className="restaurant-marker"
            style={{
              width: '40px',
              height: '65px',
              fill: '#e289ff',
              stroke: '#e289ff',
              strokeWidth: '2px',
              transition: 'fill .5s',
            }}
          >
            <svg viewBox="0 0 365 560" preserveAspectRatio="none">
              <path d="M182.9 551.7c0 .1.2.3.2.3s175.2-269 175.2-357.4c0-130.1-88.8-186.7-175.4-186.9C96.3 7.9 7.5 64.5 7.5 194.6 7.5 283 182.8 552 182.8 552l.1-.3zm-60.7-364.5c0-33.6 27.2-60.8 60.8-60.8 33.6 0 60.8 27.2 60.8 60.8S216.5 248 182.9 248c-33.5 0-60.7-27.2-60.7-60.8z" />
            </svg>
          </div>
        </Marker>
      </GoogleMapReact>
    </div>
  );
};

export default ModuleItemMap;

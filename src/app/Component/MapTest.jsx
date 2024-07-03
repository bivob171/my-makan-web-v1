"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

// Define a constant for the Google Maps API libraries
const LIBRARIES = ["places"];

// Define a constant for the Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyB2zI6llsCgJHl82vznsE0LL15lLV03CNI";

const MapTest = () => {
  const [searchBox, setSearchBox] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const mapRef = useRef(null);

  // Effect to initialize the search box and geolocation
  useEffect(() => {
    if (window.google) {
      const input = document.getElementById("location-input");
      const searchBox = new window.google.maps.places.Autocomplete(input);
      setSearchBox(searchBox);

      searchBox.addListener("place_changed", () => {
        const place = searchBox.getPlace();
        if (!place.geometry) {
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;

        setSelectedLocation({ lat, lng });
        setSelectedAddress(address);

        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
        }

        // Log country, state, and city names
        const addressComponents = place.address_components;
        let country = "";
        let state = "";
        let city = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("country")) {
            country = component.long_name;
          } else if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          } else if (
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
          ) {
            city = component.long_name;
          }
        });

        console.log(`Country: ${country}`);
        console.log(`State: ${state}`);
        console.log(`City: ${city}`);

        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(
            `Selected location is ${address}`
          );
          window.speechSynthesis.speak(utterance);
        } else {
          console.warn("Speech Synthesis not supported in this browser.");
        }
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({ lat, lng });

        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
        }
      });
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const latLng = new window.google.maps.LatLng(lat, lng);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        setSelectedLocation({ lat, lng });
        setSelectedAddress(address);

        const addressComponents = results[0].address_components;
        let country = "";
        let state = "";
        let city = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("country")) {
            country = component.long_name;
          } else if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          } else if (
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
          ) {
            city = component.long_name;
          }
        });

        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        console.log(`Address: ${address}`);
        console.log(`Country: ${country}`);
        console.log(`State: ${state}`);
        console.log(`City: ${city}`);

        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(
            `Selected location is ${address}`
          );
          window.speechSynthesis.speak(utterance);
        } else {
          console.warn("Speech Synthesis not supported in this browser.");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  }, []);

  return (
    <div>
      <div className="bg-white h-[250px] w-[350px] relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:p-0 md:p-0 p-2 rounded rounded-[10px]">
        <div className="ml-2 mt-2">
          <input
            id="location-input"
            type="text"
            value={searchText}
            placeholder="Search for a location"
            onChange={handleSearchChange}
            className="focus:outline-none input pl-3 mt-[10px] w-[300px] mb-[5px] h-[35px] border border-[2px]"
          />
        </div>

        <div className="mt-2">
          <LoadScript
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
            libraries={LIBRARIES}
            async
            onLoad={() => console.log("Google Maps API loaded successfully")}
          >
            <GoogleMap
              onLoad={(map) => {
                mapRef.current = map;
              }}
              mapContainerStyle={{ height: "250px", width: "350px" }}
              zoom={10}
              center={currentLocation || { lat: 0, lng: 0 }}
              onClick={handleMapClick}
            >
              {selectedLocation && (
                <MarkerF
                  position={selectedLocation}
                  title="Selected Location"
                  name="Selected Location"
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default MapTest;

"use client";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";
import { EditPostLocationValueContext } from "@/Context/EditpostValueContext";

const LIBRARIES = ["places"];
const GOOGLE_MAPS_API_KEY = "AIzaSyB2zI6llsCgJHl82vznsE0LL15lLV03CNI";

const EditMapPost = ({ setCurrentPanel, currentPanel }) => {
  const {
    lata,
    setLata,
    lon,
    setLon,
    formatted_address,
    setFormatted_address,
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
  } = useContext(EditPostLocationValueContext);

  const initialLocation = { lat: lata, lng: lon };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [searchText, setSearchText] = useState(formatted_address);
  const [searchBox, setSearchBox] = useState(null);
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        updateMapLocation({ lat, lng });
      });
    }
  }, []);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const searchBoxInstance = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      setSearchBox(searchBoxInstance);

      searchBoxInstance.addListener("place_changed", () => {
        const place = searchBoxInstance.getPlace();
        if (!place.geometry) {
          console.error("No geometry found for the place");
          return;
        }
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        updateMapLocation(location);
        extractAddressComponents(place);
      });
    }
  }, [isLoaded]);

  const updateMapLocation = (location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.panTo(location);
      mapRef.current.setZoom(15);
    }
  };

  const extractAddressComponents = (place) => {
    const address = place.formatted_address;
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

    setLata(location.lat);
    setLon(location.lng);
    setFormatted_address(address);
    setCountry(country);
    setState(state);
    setCity(city);
    setSearchText(address);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleMapClick = useCallback((e) => {
    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    updateMapLocation(location);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
      if (status === "OK" && results[0]) {
        extractAddressComponents(results[0]);
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  }, []);

  const handleSaveLocation = () => {
    if (
      selectedLocation.lat === "" ||
      selectedLocation.lng === "" ||
      searchText === "" ||
      country === "" ||
      state === "" ||
      city === ""
    ) {
      toast.error("The address is not selected.");
      return;
    }
    setLata(selectedLocation.lat);
    setLon(selectedLocation.lng);
    setCurrentPanel(currentPanel - 1);
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div>
      <div className="w-full">
        <div className="w-full flex justify-between gap-x-[30px]">
          <div className="w-full">
            <Input
              className={clsx(
                "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
              )}
              placeholder="Search for a location"
              id="location-input"
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              ref={inputRef}
            />
          </div>
          <Button
            onClick={handleSaveLocation}
            type="button"
            className="w-[90px] text-[18px] font-semibold rounded-md bg-[#5854EF] py-1 px-6 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#5954efef] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#5854EF]"
          >
            Save
          </Button>
        </div>

        <div className="my-2">
          {isLoaded ? (
            <GoogleMap
              onLoad={(map) => {
                mapRef.current = map;
                updateMapLocation(initialLocation);
              }}
              mapContainerStyle={{ height: "350px", width: "100%" }}
              zoom={10}
              center={initialLocation}
              onClick={handleMapClick}
            >
              {selectedLocation && (
                <MarkerF
                  position={selectedLocation}
                  title="Selected Location"
                  name="Selected Location"
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditMapPost;

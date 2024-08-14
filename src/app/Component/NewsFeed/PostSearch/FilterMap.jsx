"use client";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { Button, Dialog, DialogPanel, Input } from "@headlessui/react";
import clsx from "clsx";
import { PostLocationValueContext } from "@/Context/postValueContext";
import toast from "react-hot-toast";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";

const LIBRARIES = ["places"];
const GOOGLE_MAPS_API_KEY = "AIzaSyB2zI6llsCgJHl82vznsE0LL15lLV03CNI";

const FilterMap = ({
  filterMapOpen,
  setFilterMapOpen,
  open,
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
  setFilterCount,
  filterCount,
}) => {
  const pathname = usePathname();
  const [selectedlata, setSelectedLata] = useState("");
  const [selectedlon, setSelectedLon] = useState("");
  const [selectedformatted_address, setSelectedformatted_address] =
    useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSaveLocation = () => {
    if (
      selectedlata === "" ||
      selectedlon === "" ||
      selectedformatted_address === "" ||
      selectedCountry === "" ||
      selectedState === "" ||
      selectedCity === ""
    ) {
      toast.error("The address is not selected.");
      return;
    }
    setFormatted_address(selectedformatted_address);
    setCountry(selectedCountry);
    setState(selectedState);
    setCity(selectedCity);
    setLata(selectedlata);
    setLon(selectedlon);
    setFilterMapOpen(!filterMapOpen);
  };

  const [searchBox, setSearchBox] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

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
        setCurrentLocation({ lat, lng });

        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
        }
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

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;

        setSelectedLocation({ lat, lng });
        setSelectedAddress(address);
        setSearchText(address); // Update the search input with the selected address

        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(15); // Zoom in when a place is selected
        }

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

        setSelectedLata(lat);
        setSelectedLon(lng);
        setSelectedformatted_address(address);
        setSelectedCountry(country);
        setSelectedState(state);
        setSelectedCity(city);
      });
    }
  }, [isLoaded]);

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
        setSearchText(address); // Update the search input with the clicked location's address

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

        setSelectedLata(lat);
        setSelectedLon(lng);
        setSelectedformatted_address(address);
        setSelectedCountry(country);
        setSelectedState(state);
        setSelectedCity(city);
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  }, []);
  function close() {
    setFilterMapOpen(false);
  }

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    // <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-40 backdrop-blur-[10px]">
    //   <div
    //     transition
    //     className="w-full max-w-3xl rounded-xl bg-[#fff] backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 py-[27px]  px-1"
    //   >
    //     <div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full">
      <button
        type="button"
        onClick={close}
        className="absolute top-1 right-1 mb-1"
      >
        <XCircleIcon className="w-4 h-4 text-[red]" />
      </button>
      <div className="w-full flex justify-between gap-x-[20px]">
        <div className="w-full">
          <Input
            className={clsx(
              "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm text-[#444]"
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
          className="w-[60px] text-[16px] font-semibold rounded-md bg-[#5854EF] py-[1px] px-2 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#5954efef] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#5854EF]"
        >
          Save
        </Button>
      </div>

      <div className="my-2">
        {isLoaded ? (
          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
            }}
            mapContainerStyle={{ height: "350px", width: "100%" }}
            zoom={10}
            center={currentLocation || { lat: 0, lng: 0 }}
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
  );
};

export default FilterMap;

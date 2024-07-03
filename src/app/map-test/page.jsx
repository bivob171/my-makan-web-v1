// import MapTest from "../Component/MapTest";
import dynamic from "next/dynamic";

// Dynamically import the MapTest component
const MapTest = dynamic(() => import("../Component/MapTest"), { ssr: false });
export default function MapPageTest() {
  return (
    <div>
      <h1>Map Test Page</h1>
      <MapTest />
    </div>
  );
}

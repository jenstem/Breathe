import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-map/api";

export default function Home(){
    const {} = useLoadScript({
        googleMapsApiKey: AIzaSyD_D3TWiE3QS8UNDkIcMSTgtQXdMDiywP0;
    });

    return <div>Map</div>;
}

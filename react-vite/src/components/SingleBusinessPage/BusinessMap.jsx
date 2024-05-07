// import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { fetchGeocode } from '../../redux/maps';
import './SingleBusiness.css';
import './BusinessMap.css';
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function BusinessMap({ business }) {
    console.log("BUSINESS IN MAP", business);
    const dispatch = useDispatch();
    const mapRef = useRef(null)

    const geocode = Object.values(useSelector(state => state.maps))

    let lat;
    let lng;

    geocode.map(place => {
        lat = place.lat
        lng = place.lng
    })

    useEffect(() => {
        const runDispatches = async () => {

            await dispatch(fetchGeocode(business.address, business.city, business.state))

        }
        runDispatches()
    }, [dispatch, business.address, business.city, business.state])

    console.log("LAT", typeof (lng), lng);

    const initMap = useCallback(async () => {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        const position = new google.maps.LatLng(lat, lng);

        mapRef.current = new Map(document.getElementById("map"), {
            zoom: 18,
            center: position,
            mapId: "DEMO_MAP_ID",
        });

        const marker = new AdvancedMarkerElement({
            map: mapRef.current,
            position: position,
            title: `${business.name}`,
        });
        marker
    }, [business.name, lat, lng])


    useEffect(() => {
        if (lat !== undefined && lng !== undefined) initMap();
    }, [initMap, lat, lng])


    return (
        <>
            {/* {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={20}
                    center={defaultCenter}
                />
            )} */}

            <div id="map">
            </div>

        </>
    )
}

export default BusinessMap

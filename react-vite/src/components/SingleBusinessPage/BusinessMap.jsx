// import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { fetchGeocode } from '../../redux/maps';
import './SingleBusiness.css';
import './BusinessMap.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';




function BusinessMap({ business }) {
    console.log("BUSINESS IN MAP", business);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const geocode = Object.values(useSelector(state => state.maps))

    let lat = 0;
    let lng = 0;

    geocode.map(place => {
        lat = place.lat
        lng = place.lng
    })

    if (lat > 0 && lng > 0) setLoading(true)

    useEffect(() => {
        const runDispatches = async () => {

            await dispatch(fetchGeocode(business.address, business.city, business.state))

        }
        runDispatches()
    }, [dispatch, business.address, business.city, business.state])

    let map;

    console.log("LAT", typeof (lng), lng);

    async function initMap() {
        // The location of Uluru
        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        // const { LatLng } = await google.maps.importLibrary("core");

        const position = new google.maps.LatLng(lat, lng);
        // let latLng = new google.maps.LatLng(position.lat, position.lg);

        // The map, centered at Uluru
        map = new Map(document.getElementById("map"), {
            zoom: 18,
            center: position,
            mapId: "DEMO_MAP_ID",
        });

        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: `${business.name}`,
        });
        marker
    }

    initMap();



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
            {loading ? (
                <h1>Loading...</h1>
            ) : (

                <div id="map">
                </div>
            )}

        </>
    )
}

export default BusinessMap

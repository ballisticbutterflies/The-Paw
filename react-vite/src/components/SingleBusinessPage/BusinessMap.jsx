// import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { fetchGeocode } from '../../redux/maps';
import './SingleBusiness.css';
import './BusinessMap.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




function BusinessMap({ business }) {
    console.log("BUSINESS IN MAP", business);
    const dispatch = useDispatch();

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

    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: "AIzaSyBbMCWbhZBpVfKkdp8hqP5X6tt3BQMAdpo",
    // });

    // const mapStyles = {
    //     height: "200px",
    //     width: "100%"
    // };

    // const defaultCenter = {
    //     lat: lat, lng: lng
    // };
    // let map;

    // const loader = new Loader({
    //     apiKey: "AIzaSyBbMCWbhZBpVfKkdp8hqP5X6tt3BQMAdpo",
    //     version: "weekly"
    // });

    // loader.load().then(async () => {
    //     const { Map } = await google.maps.importLibrary("maps");

    //     map = new Map(document.getElementById("map"), {
    //         center: { lat: -34.397, lng: 150.644 },
    //         zoom: 8,
    //     });
    // });
    // Initialize and add the map
    let map;


    async function initMap() {
        // The location of Uluru
        const position = { lat: lat, lng: lng};
        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        // The map, centered at Uluru
        map = new Map(document.getElementById("map"), {
            zoom: 12,
            center: position,
            mapId: "DEMO_MAP_ID",
        });

        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            // title: "Uluru",
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

            <div id="map">
            </div>
        </>
    )
}

export default BusinessMap

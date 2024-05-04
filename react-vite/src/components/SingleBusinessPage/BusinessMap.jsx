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

    let map;

    geocode?.map(place => {
        lat = place?.lat
        lng = place?.lng
    })
    console.log("LAT", typeof (lng));

    async function initMap() {
        // The location of Uluru
        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        // const { LatLng } = await google.maps.importLibrary("core");

        const position = await google.maps.LatLng(lat, lng);
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

            <div id="map">
            </div>
        </>
    )
}

export default BusinessMap

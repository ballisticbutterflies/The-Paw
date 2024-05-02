import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { fetchGeocode } from '../../redux/maps';
import './SingleBusiness.css';
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

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBbMCWbhZBpVfKkdp8hqP5X6tt3BQMAdpo",
    });

    const mapStyles = {
        height: "200px",
        width: "100%"
    };

    const defaultCenter = {
        lat: lat, lng: lng
    };

    return (
        <>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={20}
                    center={defaultCenter}
                />
            )}
        </>
    )
}

export default BusinessMap

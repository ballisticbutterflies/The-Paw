import { GoogleMap, LoadScript } from '@react-google-maps/api';
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
        dispatch(fetchGeocode(business.address, business.city, business.state))
    }, [dispatch, business.address, business.city, business.state])

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: lat, lng: lng
    };

    return (
        <>
            <LoadScript googleMapsApiKey="AIzaSyBbMCWbhZBpVfKkdp8hqP5X6tt3BQMAdpo">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={18}
                    center={defaultCenter}
                />
            </LoadScript>
        </>
    )
}

export default BusinessMap

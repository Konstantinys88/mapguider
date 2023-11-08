import React from "react";
// import icon from './computer-solid.svg';

import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useCallback } from "react";

import { Icon } from "leaflet";
import './map.scss';

const MapComponent = () => {

    const positionSanJose = [37.3394, -121.895]; // [latitude, longitude] san-jose
    const zoomLevel = 14;

    const [latitudeCurent, setLatitudeCurent] = useState(37.3394);
    const [longitudeCurent, setLongitudeCurent] = useState(-121.895);

    const [loading, setLoading] = useState(true);

    console.log(latitudeCurent, longitudeCurent)

    useEffect(() => {
        pos();
        console.log('render')
    }, [latitudeCurent, longitudeCurent]);

    const pos = () => {

        const success = ({ coords }) => {
            const { latitude, longitude } = coords
            // const position = [latitude, longitude]
            setLatitudeCurent(latitude);
            setLongitudeCurent(longitude);
            setLoading(false)
        }

        const error = ({ message }) => {
            console.log(message) // при отказе в доступе получаем PositionError: User denied Geolocation
        }

        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true
        })
    }

    //Стили на иконки
    const iconTest = new Icon({
        iconUrl: 'https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png',
        iconSize: [50, 50],
    });

    const iconPerson = new Icon({
        iconUrl: 'https://w7.pngwing.com/pngs/587/702/png-transparent-attribution-icon-person-icon-male-icon-person.png',
        iconSize: [50, 50],
    });

    //расчет растояния 
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    const distanceMOWBKK = getDistanceFromLatLonInKm(latitudeCurent, longitudeCurent, 37.3394, -121.895)
    console.log(distanceMOWBKK);


    const renderCurentPosition = () => {
        return (
            <>
                <div className="map__leaflet-container">
                    <MapContainer
                        center={[latitudeCurent, longitudeCurent]}
                        zoom={zoomLevel}
                        scrollWheelZoom={true}>

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                        />
                        <Marker
                            position={[latitudeCurent, longitudeCurent]}
                            icon={iconPerson}>
                            <Popup>
                                <p>Ваша позиция</p>
                            </Popup>
                        </Marker>
                        <Marker
                            position={[37.3394, -121.88]}
                            icon={iconTest} >
                            <Popup>
                                <p>Test1</p>
                            </Popup>
                        </Marker>

                    </MapContainer>
                </div>
                <div className="map__curentPosition">
                    <p>Ваше текущее место положение </p>
                    <ul className="map__curentPositionBlock">
                        <li>Широта: {latitudeCurent}</li>
                        <li>Долгота: {longitudeCurent}</li>
                        <li>До Сан-Хосе : {Math.round(distanceMOWBKK)} кm</li>
                    </ul>
                </div>
            </>
        )
    }

    const curentPositinItem = renderCurentPosition();

    const loadingContent = loading ? "Идет занрузка" : null;
    const content = !(loading) ? curentPositinItem : null;

    return (
        <div className="map">
            {loadingContent}
            {content}
        </div>
    )
}

export default MapComponent;
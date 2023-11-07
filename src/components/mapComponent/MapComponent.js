import React from "react";
// import icon from './computer-solid.svg';

import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useCallback } from "react";


import { Icon } from "leaflet";



import './map.scss';

const MapComponent = () => {

    const positionSanJose = [37.3394, -121.895]; // [latitude, longitude] san-jose
    const zoomLevel = 12;


    const [latitudeCurent, setLatitudeCurent] = useState(37.3394);
    const [longitudeCurent, setLongitudeCurent] = useState(-121.895);
    const positionCurrent = [latitudeCurent, longitudeCurent];


    console.log(positionCurrent)

    useEffect(() => {
        pos();
        console.log('render')

    }, [positionCurrent]);


    const pos = () => {

        const success = async ({ coords }) => {
            // получаем широту и долготу
            const { latitude, longitude } = coords
            const position = [latitude, longitude]
            await setLatitudeCurent(latitude)
            await setLongitudeCurent(longitude)
        }

        const error = ({ message }) => {
            console.log(message) // при отказе в доступе получаем PositionError: User denied Geolocation
        }

        navigator.geolocation.getCurrentPosition(success, error, {
            // высокая точность
            enableHighAccuracy: true
        })
    }

    const renderCurentPosition = () => {
        return (
            <ul className="map__curentPositionBlock">
                <li>Широта: {latitudeCurent}</li>
                <li>Долгота: {longitudeCurent}</li>
            </ul>
        )
    }

    const curentPositinItem = renderCurentPosition();

    //Стили на иконки
    const iconTest = new Icon({
        iconUrl: 'https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png',
        iconSize: [50, 50],
        // iconAnchor: [40, 90],
        // popupAnchor: [-25, -40],
    });

    return (
        <div className="map">
            <div className="map__leaflet-container">
                <MapContainer
                    center={positionCurrent}
                    zoom={zoomLevel}
                    scrollWheelZoom={true}>

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                    />

                    <Marker
                        position={positionCurrent}
                        icon={iconTest}
                    >
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

                    <Marker position={[37.310, -121.88]} >
                        <Popup>
                            <p>Test2</p>
                        </Popup>
                    </Marker>

                </MapContainer>
            </div>
            <div className="map__curentPosition">
                <p>Ваше текущее место положение </p>
                {curentPositinItem}
            </div>
        </div>

    )
}

export default MapComponent;
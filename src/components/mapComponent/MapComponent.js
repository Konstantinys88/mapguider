import React from "react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useCallback } from "react";

import './map.scss';

const MapComponent = () => {

    const positionSanJose = [37.3394, -121.895]; // [latitude, longitude] san-jose
    const zoomLevel = 12;


    const [latitudeCurent, setLatitudeCurent] = useState();
    const [longitudeCurent, setLongitudeCurent] = useState();


    // console.log(latitudeCurent)
    // console.log(longitudeCurent)

    const positionCurrent = [latitudeCurent, longitudeCurent];
    console.log(positionCurrent)


    useEffect(() => {
        pos()
    }, []);


    const pos = () => {

        const success = ({ coords }) => {
            // получаем широту и долготу
            const { latitude, longitude } = coords
            const position = [latitude, longitude]
            // [широта, долгота]
            // console.log(position)
            setLatitudeCurent(latitude)
            setLongitudeCurent(longitude)
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

    const curentPositinItem = renderCurentPosition()

    return (
        <div className="map">
            <div className="map__leaflet-container">
                <MapContainer
                    center={positionSanJose}
                    zoom={zoomLevel}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        url='http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                    />
                    <Marker position={positionSanJose}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div className="map__curentPosition">
                <p>Ваше текущее место положение <br /> на карте оно на данный момент ни как не отобразится <br /> в маркер координаты тоже захардкожены</p>
                {curentPositinItem}
            </div>

        </div>

    )
}

export default MapComponent;
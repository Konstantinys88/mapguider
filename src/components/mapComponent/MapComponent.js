import React from "react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useCallback } from "react";

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
                    center={positionCurrent}
                    zoom={zoomLevel}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                    />
                    <Marker position={positionCurrent} >
                        <Popup>
                            <p>Ваша позиция</p>
                        </Popup>
                    </Marker>

                    <Marker position={[37.3394, -121.88]} >
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
                <p>Ваше текущее место положение <br /> на карте оно на данный момент ни как не отобразится <br /> в маркер координаты тоже захардкожены</p>
                {curentPositinItem}
            </div>
        </div>

    )
}

export default MapComponent;
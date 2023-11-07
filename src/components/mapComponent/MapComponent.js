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

    }, [latitudeCurent, longitudeCurent]);


    const pos = () => {

        const success = ({ coords }) => {
            // получаем широту и долготу
            const { latitude, longitude } = coords
            // const position = [latitude, longitude]
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

    //Стили на иконки
    const iconTest = new Icon({
        iconUrl: 'https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png',
        iconSize: [50, 50],
        // iconAnchor: [40, 90],
        // popupAnchor: [-25, -40],
    });

    const iconPerson = new Icon({
        iconUrl: 'https://w7.pngwing.com/pngs/587/702/png-transparent-attribution-icon-person-icon-male-icon-person.png',
        iconSize: [50, 50],
        // iconAnchor: [40, 90],
        // popupAnchor: [-25, -40],
    });



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
                            url='http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
                        />

                        <Marker
                            position={[latitudeCurent, longitudeCurent]}
                            icon={iconPerson}
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
                    <ul className="map__curentPositionBlock">
                        <li>Широта: {latitudeCurent}</li>
                        <li>Долгота: {longitudeCurent}</li>
                    </ul>
                </div>
            </>

        )
    }

    const curentPositinItem = renderCurentPosition();

    return (
        <div className="map">
            {curentPositinItem}
        </div>

    )
}

export default MapComponent;
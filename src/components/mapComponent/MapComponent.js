import React from "react";
// import icon from './computer-solid.svg';

import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useCallback } from "react";

import { Icon } from "leaflet";
import './map.scss';

const MapComponent = () => {

    const data = [
        {
            title: "Casa La Mar Coco",
            category: "Holiday home letting agency",
            address: "La Chorrera, Provincia de Guanacaste, Coco, Costa Rica",
            website: "airbnb.com",
            phone: "+506 8837 3951",
            worksTime: "Monday, Open 24 hours; Tuesday, Open 24 hours; Wednesday, Open 24 hours; Thursday, Open 24 hours; Friday, Open 24 hours; Saturday, 8 am to 4 pm; Sunday, 8 am to 12 pm",
            coords: {
                latitude: "10.5648666",
                longitude: "-85.689810"
            },
            imagUrl: "https://lh5.googleusercontent.com/p/AF1QipML-2njDEFPo9rPjfEReHhWtCRxpESFg9a2Ced3=w408-h272-k-no"
        },
        {
            title: "Test 2",
            category: "Holiday home letting agency",
            address: "La Chorrera, Provincia de Guanacaste, Coco, Costa Rica",
            website: "airbnb.com",
            phone: "+506 8837 3951",
            worksTime: "Monday, Open 24 hours; Tuesday, Open 24 hours; Wednesday, Open 24 hours; Thursday, Open 24 hours; Friday, Open 24 hours; Saturday, 8 am to 4 pm; Sunday, 8 am to 12 pm",
            coords: {
                latitude: "10.549177131029078",
                longitude: "-85.69998033376883"
            },
            imagUrl: "https://lh5.googleusercontent.com/p/AF1QipML-2njDEFPo9rPjfEReHhWtCRxpESFg9a2Ced3=w408-h272-k-no"
        },
        {
            title: "Test 3",
            category: "Holiday home letting agency",
            address: "La Chorrera, Provincia de Guanacaste, Coco, Costa Rica",
            website: "airbnb.com",
            phone: "+506 8837 3951",
            worksTime: "Monday, Open 24 hours; Tuesday, Open 24 hours; Wednesday, Open 24 hours; Thursday, Open 24 hours; Friday, Open 24 hours; Saturday, 8 am to 4 pm; Sunday, 8 am to 12 pm",
            coords: {
                latitude: " 10.542679803371538",
                longitude: "-85.68084009042305"
            },
            imagUrl: "https://lh5.googleusercontent.com/p/AF1QipML-2njDEFPo9rPjfEReHhWtCRxpESFg9a2Ced3=w408-h272-k-no"
        },
    ]

    const positionSanJose = [37.3394, -121.895]; // [latitude, longitude] san-jose
    const zoomLevel = 14;

    const [latitudeCurent, setLatitudeCurent] = useState(37.3394);
    const [longitudeCurent, setLongitudeCurent] = useState(-121.895);

    const [loading, setLoading] = useState(true);
    // console.log(latitudeCurent, longitudeCurent)

    useEffect(() => {
        pos();
        // console.log('render')
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
    // console.log(distanceMOWBKK);


    const renderCurentPosition = (arr) => {
        const itemMarkers = arr.map((item, index) => {

            let iconMarker = iconTest; //

            return (
                <>
                    <Marker
                        key={index}
                        position={[+item.coords.latitude, +item.coords.longitude]}
                        icon={iconMarker}>
                        <Popup className="popupMarker">
                            <h1>{item.title}</h1>
                            <h3>Address: {item.address}</h3>
                            <h3>Website: <a href={item.website}>{item.website}</a></h3>
                            <h3>Phone: {item.phone}</h3>
                            {/* <h3>Works Time: {item.worksTime}</h3> */}
                            <img className="popupMarker__img" src={item.imagUrl} alt="asd" />
                        </Popup>
                    </Marker>
                </>
            )
        })

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

                        {itemMarkers}

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

    const curentPositinItem = renderCurentPosition(data);

    const loadingContent = loading ? "Идет загрузка" : null;
    const content = !(loading) ? curentPositinItem : null;

    return (
        <div className="map">
            {loadingContent}
            {content}
        </div>
    )
}

export default MapComponent;
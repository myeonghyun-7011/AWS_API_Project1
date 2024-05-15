// Map.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MovieTheaters.css';

const MovieTheaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [searchedTheater, setSearchedTheater] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCNl2cKkT1Q3aLzqE8OJAtE-RXNowXPsOA
    &libraries=places`;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  const fetchData = async () => {
    try {
      const url = 'http://openapi.seoul.go.kr:8088/6d55677347646876353646457a5261/xml/';
      const response = await axios.get(url);
      const xmlData = new DOMParser().parseFromString(response.data, 'text/xml');
      const theaterNodes = xmlData.querySelectorAll('row');
      const theaterData = Array.from(theaterNodes).map(node => ({
        name: node.querySelector('THM_NM').textContent,
        address: node.querySelector('REFINE_LOTNO_ADDR').textContent,
        lat: parseFloat(node.querySelector('YCODE').textContent),
        lng: parseFloat(node.querySelector('XCODE').textContent)
      }));
      setTheaters(theaterData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 12
    });
    const service = new window.google.maps.places.PlacesService(mapInstance);
    setMap(mapInstance);
    setPlacesService(service);
    const infoWindowInstance = new window.google.maps.InfoWindow();
    setInfoWindow(infoWindowInstance);
  };

  const handleSearch = () => {
    if (!placesService || !searchQuery.trim()) return;

    placesService.textSearch({
      query: searchQuery.trim() + ' 영화관'
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        if (results.length > 0) {
          const theater = results[0];
          setSearchedTheater(theater);
          map.setCenter(theater.geometry.location);
          map.setZoom(15);
          const marker = new window.google.maps.Marker({
            position: theater.geometry.location,
            map: map,
            title: theater.name
          });
          marker.addListener('click', () => {
            infoWindow.setContent(`
              <div>
                <strong>${theater.name}</strong><br>
                ${theater.formatted_address}
              </div>
            `);
            infoWindow.open(map, marker);
          });
          setMarkers([marker]);
        } else {
          setSearchedTheater(null);
          console.log('No theaters found');
        }
      } else {
        console.error('Places service error:', status);
      }
    });
  };

  return (
    <div className="map-container">
      <h1 className="map-title">서울시 영화관 위치</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="영화관 이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>
      <div id="map" className="map"></div>
    </div>
  );
};

export default MovieTheaters;

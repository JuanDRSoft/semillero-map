import React from "react";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const myLocation = () => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

          map.setCenter([longitude, latitude]);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  const inMedellin = () => {
    fetch("data/medellin.geojson")
      .then((response) => response.json())
      .then((data) => {
        const polygon = data.features;
        console.log(polygon);

        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-74.5, 40],
          zoom: 9,
        });

        let arrayPolygons = [];

        for (let i = 0; i < polygon.length; i++) {
          for (let e = 0; e < polygon[i].coordinates[0].length; e++) {
            // arrayPolygons.push(polygon[i].coordinates[0]);
          }
        }

        console.log(arrayPolygons);

        map.on("load", () => {
          for (let i = 0; i < polygon.length; i++) {
            map.addSource(`polygon${i}`, {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: polygon[i].coordinates,
                },
              },
            });

            map.addLayer({
              id: `polygon${i}`,
              type: "fill",
              source: `polygon${i}`,
              layout: {},
              paint: {
                "fill-color": "#355a5a",
                "fill-opacity": 0.5,
                "fill-outline-color": "black",
              },
            });
          }
        });

        map.setCenter([-75.572144, 6.253854]);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  useEffect(() => {
    if (location.search == "") {
      myLocation();
    } else if (location.search == "?locate=medellin") {
      inMedellin();
    }
  }, [location]);

  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}>
      {/* Contenedor del mapa */}
    </div>
  );
};

export default Home;

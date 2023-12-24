import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  useEffect(() => {
    // Reemplaza 'your_mapbox_token_here' con tu propio token
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: "map", // ID del contenedor del mapa en tu HTML
      style: "mapbox://styles/mapbox/streets-v11", // Estilo del mapa, puedes cambiarlo
      center: [-74.5, 40], // Coordenadas del centro del mapa (longitud, latitud)
      zoom: 9, // Nivel de zoom inicial
    });

    // Obtener la ubicación actual del usuario
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
          // Coordenadas del polígono en la ubicación actual (ejemplo: cuadrado de 0.01 grados)
          const polygonCoordinates = [
            [longitude - 0.005, latitude - 0.005],
            [longitude - 0.005, latitude + 0.005],
            [longitude + 0.005, latitude + 0.005],
            [longitude + 0.005, latitude - 0.005],
            [longitude - 0.005, latitude - 0.005],
          ];

          // Añade el polígono al mapa
          map.on("load", () => {
            map.addSource("polygon", {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [polygonCoordinates],
                },
              },
            });

            map.addLayer({
              id: "polygon",
              type: "fill",
              source: "polygon",
              layout: {},
              paint: {
                "fill-color": "#355a5a",
                "fill-opacity": 0.5,
              },
            });

            // Centra el mapa en la ubicación actual
            map.setCenter([longitude, latitude]);
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}>
      {/* Contenedor del mapa */}
    </div>
  );
}

export default App;

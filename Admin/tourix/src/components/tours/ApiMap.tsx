import React, { useState } from "react";
import { GoogleMap, useLoadScript, Autocomplete, Marker, Libraries } from "@react-google-maps/api";
import { TextField, Box, CircularProgress } from "@mui/material";

const libraries: Libraries = ["places"];

const mapContainerStyle = {
    width: "100%",
    height: "400px",
};

const center = {
    lat: 21.161908, 
    lng: -86.8515279,
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

interface MapWithSearchProps {
    apiKey: string;
    onLocationChange: (lat: number, lng: number) => void;
}

const MapWithSearch: React.FC<MapWithSearchProps> = ({ apiKey, onLocationChange }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    // Estado para almacenar la posición del marcador
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

    // Función que se ejecuta cuando el mapa se carga
    const onLoad = (mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    };

    // Función que se ejecuta cuando Autocomplete está listo
    const onAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
        setAutocomplete(autocompleteInstance);
    };

    // Función que se ejecuta cuando cambia la búsqueda
    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                const location = place.geometry.location;
                const newPosition = { lat: location.lat(), lng: location.lng() };

                map?.panTo(newPosition);
                map?.setZoom(14);
                setMarkerPosition(newPosition);

                // Llama a la función onLocationChange para enviar las coordenadas al componente padre
                onLocationChange(newPosition.lat, newPosition.lng);
            }
        }
    };

    // Función que se ejecuta cuando el usuario mueve el marcador
    const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const newPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            setMarkerPosition(newPosition);
            onLocationChange(newPosition.lat, newPosition.lng); // Llama a onLocationChange aquí también
        }
    };

    if (loadError) return <div>Error al cargar Google Maps</div>;
    if (!isLoaded) return <CircularProgress />;

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
        }}>
            <Box sx={{ background: 'white', padding: '15px', boxShadow: '0 0 5px #d3d3d3', borderRadius: '15px' }}>    
                {/* Buscador de Localidades */}
                <Autocomplete
                    onLoad={onAutocompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                >
                    <TextField
                        label="Buscar localidad"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                </Autocomplete>
            </Box>

            {/* Mapa de Google */}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onLoad={onLoad}
            >
                {/* Colocamos un marcador en la posición seleccionada si existe */}
                {markerPosition && (
                    <Marker
                        position={markerPosition}
                        draggable={true} // Permite que el marcador sea movible
                        onDragEnd={handleMarkerDragEnd} // Evento cuando el usuario suelta el marcador
                    />
                )}
            </GoogleMap>
        </Box>
    );
};

export default MapWithSearch;

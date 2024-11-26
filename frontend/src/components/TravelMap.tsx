import React, { useEffect, useRef, useState } from 'react';
import { googleAPIKey } from '..';

// Load Google Maps API script
const loadScript = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => {
      resolve();
    };
    document.body.appendChild(script);
  });
};

const TravelMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const initMap = async () => {
      await loadScript(`https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}&libraries=places`);

      if (mapRef.current) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
          zoom: 12,
        });
        setMap(mapInstance);

        const service = new window.google.maps.DirectionsService();
        const renderer = new window.google.maps.DirectionsRenderer();
        renderer.setMap(mapInstance);
        
        setDirectionsService(service);
        setDirectionsRenderer(renderer);
      }
    };

    initMap();
  }, []);

  const handleCalculateRoute = () => {
    if (directionsService && directionsRenderer) {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: new Date(Date.now()), // for the time you want to calculate the route
            trafficModel: google.maps.TrafficModel.BEST_GUESS, // Use the TrafficModel enum
          },
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRenderer.setDirections(result);
            const route = result.routes[0];
            if (route && route.legs && route.legs.length > 0) {
              const leg = route.legs[0];
              if (leg.distance && leg.duration) {
                setRouteInfo({
                  distance: leg.distance.text,
                  duration: leg.duration.text,
                });
              }
            }
          } else {
            alert('Directions request failed due to ' + status);
          }
        }
      );
    }
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const fetchSuggestions = (input: string) => {
    if (input.length > 2 && directionsService) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions!.map(prediction => prediction.description));
        } else {
          setSuggestions([]);
        }
      });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setOrigin(suggestion);
    setSuggestions([]);
  };

  return (
    <div >
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
      <input
        type="text"
        value={origin}
        onChange={handleOriginChange}
        placeholder="Origin"
      />
      <input
        type="text"
        value={destination}
        onChange={handleDestinationChange}
        placeholder="Destination"
      />
      <button onClick={handleCalculateRoute}>Calculate Route</button>
      {routeInfo && (
        <div>
          <p>Distance: {routeInfo.distance}</p>
          <p>Duration: {routeInfo.duration}</p>
        </div>
      )}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TravelMap;
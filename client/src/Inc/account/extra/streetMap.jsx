import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import * as NodeGeocoder from 'node-geocoder';
import fetchS from 'node-fetch';

const containerStyle = {
	width: '80%',
	minWidth: '100%',
	minHeight: '80%',
	height: '320px'
};

const MapWithAMarker = ({ handlePosition, center, handleCountry }) => {
	// Get Loaction from lat and lng
	const fetch = fetchS.bind();
	const options = {
		provider: 'google',
		fetch: fetch,
		apiKey: 'AIzaSyB5hlCCROooAjmVavVJvlc9oyOT8IGttCI'
	};
	const GeoCoder = NodeGeocoder(options);

	async function handleLocation({ latLng }) {
		try {
			const res = await GeoCoder.reverse({ lat: latLng.lat(), lon: latLng.lng() });
			handlePosition({ lat: latLng.lat(), lng: latLng.lng() });
			const { country } = res[0];
			handleCountry(country);
		} catch (e) {
			console.log(e);
		}
	}
	// getting Center Location from props
	const centerPosition = { lat: parseFloat(center.lat), lng: parseFloat(center.lng) };
	return (
		<LoadScript googleMapsApiKey='AIzaSyB5hlCCROooAjmVavVJvlc9oyOT8IGttCI'>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={centerPosition}
				zoom={10}
				onClick={e => {
					handleLocation(e);
				}}
			>
				<Marker position={center} />
			</GoogleMap>
		</LoadScript>
	);
};

export default MapWithAMarker;

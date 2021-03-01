import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import * as NodeGeocoder from 'node-geocoder';
import fetchS from 'node-fetch';

const containerStyle = {
	width: '400px',
	height: '400px'
};

// to Edit initial Center
const center = {
	lat: -3.745,
	lng: -38.523
};

const MapWithAMarker = props => {
	const fetch = fetchS.bind();
	const options = {
		provider: 'google',
		fetch: fetch,
		apiKey: 'AIzaSyB5hlCCROooAjmVavVJvlc9oyOT8IGttCI'
	};

	const GeoCoder = NodeGeocoder(options);

	async function handleLocation(event) {
		try {
			console.log(event.latLng.lat());
			console.log(event.latLng.lng());
			const res = await GeoCoder.reverse({ lat: event.latLng.lat(), lon: event.latLng.lng() });
			// use only Country
			const { country, city } = res[0];
			console.log(country, city);
		} catch (e) {
			console.log(e);
		}
	}

	const centerPosition = { lat: parseFloat(props.center.lat), lng: parseFloat(props.center.lng) };
	return (
		<LoadScript googleMapsApiKey='AIzaSyB5hlCCROooAjmVavVJvlc9oyOT8IGttCI'>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				onClick={e => {
					handleLocation(e);
				}}
			>
				<Marker position={centerPosition.lat ? centerPosition : center} />
				{/* {console.log(centerPosition)} */}
			</GoogleMap>
		</LoadScript>
	);
};

export default MapWithAMarker;

import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '400px',
	height: '400px'
};

// to Edit initial Center
const center = {
	lat: -3.745,
	lng: -38.523
};

const MapWithAMarker = (props) => {
	const centerPosition = { lat: parseFloat(props.center.lat), lng: parseFloat(props.center.lng) };
	return (
		<LoadScript googleMapsApiKey="AIzaSyB5hlCCROooAjmVavVJvlc9oyOT8IGttCI">
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={props.onClick}>
				<Marker position={centerPosition.lat ? centerPosition : center} />
				{/* {console.log(centerPosition)} */}
			</GoogleMap>
		</LoadScript>
	);
};

export default MapWithAMarker;

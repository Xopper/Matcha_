import axios from 'axios';

// Cpitalize first Letter
export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

export function getAge(date) {
	let dob = new Date(date);
	//calculate month difference from current date in time
	let month_diff = Date.now() - dob.getTime();

	//convert the calculated difference in date format
	let age_dt = new Date(month_diff);

	//extract year from date
	let year = age_dt.getUTCFullYear();

	//now calculate the age of the user
	let age = Math.abs(year - 1970);
	return age;
}

export function toTimeStamp(time) {
	// var myDate = '26-02-2012';
	time = time.split('-');
	const newDate = new Date(time[2], time[1] - 1, time[0]);
	return newDate.getTime();
}

export function isValidDate(str) {
	// STRING FORMAT yyyy-mm-dd
	if (str === '' || str === null) {
		return false;
	}

	// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
	const m = str.match(/(\d{4})-(\d{2})-(\d{2})/);

	// STR IS NOT FIT m IS NOT OBJECT
	if (m === null || typeof m !== 'object') {
		return false;
	}

	// CHECK m TYPE
	if (typeof m !== 'object' && m !== null && m.size !== 3) {
		return false;
	}

	let ret = true; //RETURN VALUE
	const thisYear = new Date().getFullYear(); //YEAR NOW
	const minYear = 1900; //MIN YEAR

	// YEAR CHECK
	if (m[1].length < 4 || m[1] < minYear || m[1] > thisYear) {
		ret = false;
	}
	// MONTH CHECK
	if (m[2].length < 2 || m[2] < 1 || m[2] > 12) {
		ret = false;
	}
	// DAY CHECK
	if (m[3].length < 2 || m[3] < 1 || m[3] > 31) {
		ret = false;
	}

	return ret;
}

export function computeDistance([prevLat, prevLong], [lat, long]) {
	const prevLatInRad = toRad(prevLat);
	const prevLongInRad = toRad(prevLong);
	const latInRad = toRad(lat);
	const longInRad = toRad(long);

	return (
		// In kilometers
		6377.830272 *
		Math.acos(
			Math.sin(prevLatInRad) * Math.sin(latInRad) +
				Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad)
		)
	);
}

export function toRad(angle) {
	return (angle * Math.PI) / 180;
}

export function getCommonElms(arrayOne, arrayTwo) {
	let count = 0;
	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayTwo.includes(arrayOne[i])) count++;
	}
	return count;
}

export function getInstance(token) {
	return axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
}

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

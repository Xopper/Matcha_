import _ from "lodash";

export function validateInfos(dob) {
	// const errors = {};
	if (!_.isDate(dob)) {
		console.log("invalide date of birth");
	}
}

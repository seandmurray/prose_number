/* jshint esversion: 6 */
// Copyright (c) 2019 Seán D. Murray
// SEE MIT LICENSE FILE
const isit = require('prose_isit');

exports.between = (number, min, max, inclusive = false) => {
	if (isit.notNumber(number)) throw new Error('A valid number is required?');
	if (isit.notBoolean(inclusive)) throw new Error('Inclusive must be a valid boolean value?');

	if (isit.aNumber(min) && inclusive) min--;
	if (isit.aNumber(max) && inclusive) max++;

	if (isit.aNumber(min) && isit.aNumber(max)) {
		if (min >= max) throw new Error('The min must be less than the max, exclusive!');
		if ((min < number) && (max > number)) {
			return true;
		}
		return false;
	}
	else if (isit.aNumber(min) && isit.nil(max)) {
		if (min < number) {
			return true;
		}
		return false;
	}
	else if (isit.nil(min) && isit.aNumber(max)) {
		if (max > number) {
			return true;
		}
		return false;
	}
	throw new Error('Min and max can be: both valid numbers, number and nil or nil and a number.');
};

exports.notBetween = (number, min, max, inclusive = false) => {
	return exports.between(number, min, max, inclusive) ? false : true;
};

exports.greaterthan = (number, min, inclusive) => {
	return exports.between(number, min, null, inclusive);
};

exports.lessthan = (number, max, inclusive) => {
	return exports.between(number, null, max, inclusive);
};

exports.zeroPositive = (number) => {
	return exports.between(number, 0, null, true);
};

exports.nonzeroPositive = (number) => {
	return exports.between(number, 0, null);
};

exports.zeroNegative = (number) => {
	return exports.between(number, null, 0, true);
};

exports.nonzeroNegative = (number) => {
	return exports.between(number, null, 0);
};

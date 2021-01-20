export const scale = (inMax, inMin, outMax, outMin, number) => {
	var percent = (number - inMin) / (inMax - inMin);
	return percent * (outMax - outMin) + outMin;
}
export const scale = (inMax, inMin, outMax, outMin, number) => {
	var percent = (number - inMin) / (inMax - inMin);
	return percent * (outMax - outMin) + outMin;
}

export const max = (a, b) => a >= b ? a : b
export const maxArray = (array) => array.reduce(max, 0)

export const min = (a, b) => a <= b ? a : b
export const minArray = (array) => array.reduce(min, 0)

export const diff = (a, b) => Math.abs(a - b)
export const diffArray = (array) => diff(maxArray(array), minArray(array))

export const sum = (a, b) => a + b
export const sumArray = (array) => array.reduce(sum)

export const avArray = (array) => sumArray(array)/(array.length)
export const medianArray = array => minArray(array) + (diffArray(array))
export const getDate = () => {
	const today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedToday = dd + '/' + mm + '/' + yyyy;
	return formattedToday;
}

export const stringifyObject = (stub) => {
	let str = '';				
	for(const [key, value] of Object.entries(stub)) {
		str += `${key}:${value}|`;
	}
	str += '\n';
	return str;
}

export const getTime = () => {
	var d = new Date();
	var n = d.toLocaleTimeString();	
	return n;
}

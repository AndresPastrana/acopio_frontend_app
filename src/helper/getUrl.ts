export function getURL(envVariables: Array<string>) {
	let url = "";

	envVariables.forEach((variableName) => {
		const value = import.meta.env[`VITE_${variableName}`];
		url += value;
	});

	return url;
}

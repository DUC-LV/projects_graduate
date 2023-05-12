export const urlImageTop100 = 'https://www.exeter.ac.uk/v8media/recruitmentsites/ksp-icons/greenicons/T4_Top_100_transparent.png';

export const convertSlug = (TXT:string) => {
	return TXT.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
}

export const convertDuration = (seconds: number) =>{
	return new Date(seconds * 1000).toLocaleTimeString('en-GB', {
		timeZone:'Etc/UTC',
		hour12: false,
		minute: '2-digit',
		second: '2-digit'
	});
}

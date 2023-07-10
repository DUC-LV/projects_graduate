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

export const getFullTimeFromDatetime = (dt: number) => {
    const datetime = new Date(dt * 1000);
    return `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`
}

export const urlStreamingSongDefault = "https://mp3-320s1-zmp3.zmdcdn.me/08ddfa665927b079e936/2658987883638204786?authen=exp=1686325005~acl=/08ddfa665927b079e936/*~hmac=7a3062f767d530b57594f94238c298be&fs=MTY4NjE1MjIwNTExM3x3ZWJWNnwxMDE0NzEzMjExfDEdUngNTMdUngMjIzLjgw"

export const textNamePackage = "Âm nhạc không giới hạn"

export const textIntroduce = "Dịch vụ nghe nhạc Online chất lượng cao, kết hợp cùng các tiện ích dành riêng cho thành viên Premium"

export const imagePlaylistCreateByUser = "https://t.ctcdn.com.br/EE2NIW-3mH9dpX755eEo64cbmds=/512x288/smart/filters:format(webp)/i436354.jpeg";

export const artistNameCreateByUser = "Nhiều nghệ sĩ";

export const descriptionPlaylistCreateByUser = "Nghe nhạc giúp chúng ta giải tỏa mọi căng thẳng trong cuộc sống, giảm bớt những áp lực. Giúp chúng ta cảm thấy thoải mái hơn."

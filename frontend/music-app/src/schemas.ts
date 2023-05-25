export interface CurrentUserData {
	id?: string | number;
	userName?: string;
	email?: string;
}

export interface DataPlaylists {
	id?: string | number;
	title?: string;
	thumbnail?: string;
	thumbnail_m?: string;
	sort_description?: string;
	artist_names?: string;
}

export interface DataStreaming {
	title?: string;
	thumbnail?: string;
	thumbnail_m?: string;
	id?: string | number;
	thumbnail_h?: string;
	thumbnail_v?: string;
}

export interface DataPodCastCategory {
	id?: string | number;
	title?: string;
	thumbnail?: string;
	name?: string;
}

export interface DataPodCast {
	id?: string | number;
	title?: string;
	thumbnail?: string;
	thumbnail_m?: string;
}

export interface DataBannerHub {
	id?: string | number;
	cover?: string;
	title?: string;
	thumbnail?: string;
}

export interface DataTopicHub {
	id?: string | number;
	cover?: string;
	title?: string;
	thumbnail?: string;
	thumbnail_r?: string;
	thumbnail_has_text?: string;
}

export interface DataHeaderPlaylist {
	id?: string | number,
	thumbnail_m?: string,
	title?: string,
	artist_names?: string,
	sort_description?: string,
	follow?: Array<any>,
}

export interface DataPodcastEpisode {
	id?: string | number;
	title?: string;
	description?: string;
	thumbnail?: string;
	thumbnail_m?: string;
	duration?: number;
	release_date?: number;
	follow?: Array<any>;
}


export interface CurrentUserData {
	id?: string | number;
	userName?: string;
	email?: string;
}

export interface DataPlaylists {
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
	title?: string;
	thumbnail?: string;
	name?: string;
}

export interface DataPodCast {
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

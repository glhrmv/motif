import { Axios } from 'axios';

export const BASE_URL = "http://ws.audioscrobbler.com/2.0/";
export const USER_TOP_ALBUMS = "user.getTopAlbums";
export const USER_RECENT_TRACKS = "user.getRecentTracks";

export const instance = new Axios({
  baseURL: BASE_URL,
  params: {
    format: 'json',
    api_key: process.env.LASTFM_API_KEY
  }
});

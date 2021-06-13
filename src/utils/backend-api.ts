import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { dayjs } from "@/utils/time";
import querystring from "querystring";
import { CHANNEL_URL_REGEX, VIDEO_URL_REGEX } from "./consts";
import { Playlist, PlaylistList } from "./types";

export const API_BASE_URL =
    process.env.NODE_ENV === "development" ? "https://staging.holodex.net/api" : `${window.location.origin}/api`;
// export const API_BASE_URL = "http://localhost:2434";

export const axiosInstance = (() => {
    const instance = axios.create({ baseURL: `${API_BASE_URL}/v2` });
    axiosRetry(instance, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === "ECONNABORTED",
        shouldResetTimeout: true,
    });
    return instance;
})();

export default {
    channels(query) {
        const q = querystring.stringify(query);
        return axiosInstance.get(`/channels?${q}`);
    },
    videos(query) {
        const q = querystring.stringify(query);
        // console.log(`/videos?${q}`);
        return axiosInstance.get(`/videos?${q}`);
    },
    live(query) {
        const q = querystring.stringify(query);
        return axiosInstance.get(`/live?${q}`).then((res) =>
            res.data
                // .concat(res.data.upcoming)
                // filter out streams that was goes unlisted if stream hasn't gone live 2 hours after scheduled
                .filter((live) => !(!live.start_actual && dayjs().isAfter(dayjs(live.start_scheduled).add(2, "h")))),
        );
    },
    channel(id) {
        return axiosInstance.get(`/channels/${id}`);
    },
    /**
     * Fetches a video
     * @param id the ID of the video
     * @param lang the acceptable subtitle languages
     * @param c whether to also provide comments, 1 to activate
     * @returns
     */
    video(id: string, lang?: string, c?: 1) {
        const q = querystring.stringify({ lang, c });
        return axiosInstance.get(`/videos/${id}?${q}`);
    },
    comments(videoId) {
        return axiosInstance.get(`/videos/${videoId}/comments`);
    },
    // eslint-disable-next-line camelcase
    videoLiveChat(id, type, time_start) {
        const q = querystring.stringify({ type, time_start });
        return axiosInstance.get(`/videos/${id}/live_chat?${q}`);
    },
    videoLiveChatSummary(id) {
        return axiosInstance.get(`/videos/${id}/live_chat/summary`);
    },
    clips(query) {
        const q = querystring.stringify(query);
        return axiosInstance.get(`/clips?${q}`);
    },
    searchAutocomplete(query) {
        const channelId = query.match(CHANNEL_URL_REGEX);
        const videoId = query.match(VIDEO_URL_REGEX);

        if (channelId && !channelId[0].includes("/c/"))
            return axiosInstance.get(`/search/autocomplete?q=${channelId[1]}`);

        if (videoId) return { data: [{ type: "video url", value: `${videoId[5]}` }] };

        return axiosInstance.get(`/search/autocomplete?q=${query}`);
    },
    searchVideo(queryObject) {
        return axiosInstance.post("/search/videoSearch", queryObject);
    },
    searchComments(queryObject) {
        return axiosInstance.post("/search/commentSearch", queryObject);
    },
    searchChannel(queryObject) {
        return axiosInstance.post("/search/channelSearch", queryObject);
    },
    channelVideos(channelId, { type = "videos", query }) {
        const q = querystring.stringify(query);
        return axiosInstance.get(`/channels/${channelId}/${type}?${q}`);
    },
    login(jwt, authToken, service) {
        return axiosInstance.post(
            "/user/login",
            { token: authToken, service },
            {
                headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
            },
        );
    },
    loginIsValid(jwt): Promise<false | AxiosResponse<any>> {
        return axiosInstance
            .get("/user/check", {
                headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
            })
            .catch(() => false);
    },
    resetAPIKey(jwt) {
        return (
            axiosInstance
                .get("/user/createKey", {
                    headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
                })
                // eslint-disable-next-line no-alert
                .catch(() => alert("something went wrong creating your key..."))
        );
    },
    favorites(jwt) {
        return axiosInstance.get("/users/favorites", {
            headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
        });
    },
    favoritesVideos(jwt, query) {
        const q = querystring.stringify(query);
        return axiosInstance.get(`/users/videos?${q}`, {
            headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
        });
    },
    favoritesLive(jwt) {
        // const q = querystring.stringify(query);
        return axiosInstance
            .get("/users/live", {
                headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
            })
            .then((res) =>
                res.data
                    // .concat(res.data.upcoming)
                    // filter out streams that was goes unlisted if stream hasn't gone live 2 hours after scheduled
                    .filter((live) => !(!live.start_actual && dayjs().isAfter(dayjs(live.start_scheduled).add(2, "h"))))
                    // get currently live and upcoming lives within the next 3 weeks
                    .filter((live) => dayjs(live.start_scheduled).isBefore(dayjs().add(3, "w"))),
            );
    },
    patchFavorites(jwt, operations) {
        return axiosInstance.patch("/users/favorites", operations, {
            headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
        });
    },
    topics() {
        // gets topics from backend
        return axiosInstance.get("/topics");
    },
    topicSet(topicId, videoId, jwt) {
        return axiosInstance.post(
            "/topics/video",
            { videoId, topicId },
            {
                headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
            },
        );
    },
    rotation() {
        return axiosInstance.get("/rotation");
    },
    songListByVideo(channelId, videoId, allowCache) {
        const dt = allowCache ? "_" : Date.now();
        return axiosInstance.post(`/songs/latest?c=${dt}`, { channel_id: channelId, video_id: videoId, limit: 999 });
    },
    tryCreateSong(songObj, jwt) {
        return axiosInstance.put("/songs", songObj, {
            headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
        });
    },
    deleteSong(songObj, jwt) {
        return axiosInstance.delete("/songs", {
            data: { ...songObj },

            headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
        });
    },
    chatHistory(id, query) {
        const q = querystring.stringify(query);
        return axiosInstance.get(`/chat/${id}/history?${q}`);
    },
    getMentions(videoId) {
        return axiosInstance.get(`videos/${videoId}/mentions`);
    },
    deleteMentions(videoId, channelIds, jwt) {
        return axiosInstance.delete(`videos/${videoId}/mentions`, {
            data: {
                channel_ids: channelIds,
            },

            headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
        });
    },
    addMention(videoId, channelId, jwt) {
        return axiosInstance.post(
            `videos/${videoId}/mentions`,
            {
                channel_id: channelId,
            },
            {
                headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
            },
        );
    },
    /**
     * Fetches song lists up to LIMIT count with offset. Always ordered by available_at date.
     * @param {{org?, channel_id?, video_id?, q?}} condition one of the conditions
     * @param {number} offset
     * @param {number} limit
     */
    songListByCondition(condition, offset, limit) {
        return axiosInstance.post("/songs/latest", { ...condition, offset, limit });
    },
    trackSongPlay(channelId, videoId, name) {
        const urlsafe = querystring.stringify({ n: name });
        return axiosInstance.get(`/songs/record/${channelId}/${videoId}?${urlsafe}`);
    },
    /**
     * Grabs top 20 songs from API.
     * @param {*} org = org name
     * @param {*} channelId = channel ID. only org name OR channel ID should be supplied, never both.
     * @param {*} type type = 'w' for weekly, 'm' for monthly.
     */
    topSongs(org, channelId, type) {
        const q = querystring.stringify(org ? { org, type } : { channel_id: channelId, type });
        return axiosInstance.get(`/songs/top20?${q}`);
    },
    getPlaylistList(jwt: string) {
        if (!jwt) throw new Error("Not authorized");
        return axiosInstance.get<PlaylistList>("/users/playlists", {
            headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
        });
    },
    getPlaylist(id: string | number) {
        if (!id) throw new Error("Arg bad");
        return axiosInstance.get<Playlist>(`/playlist/${id}`);
    },
    savePlaylist(obj: Playlist, jwt: string) {
        return axiosInstance.post("/playlist/", obj, {
            headers: jwt ? { Authorization: `BEARER ${jwt}` } : {},
        });
    },
};

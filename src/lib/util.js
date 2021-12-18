import axios from 'axios'
export function generateAuthURL(spotifyCredentials, redirectPath) {
    let redirect_uri = "";
    if (process.env.NODE_ENV === 'production') {
        redirect_uri = `https://www.wrappedwhenever.com/${redirectPath}`;
    } else {
        redirect_uri = `http://localhost:3000/${redirectPath}`;
    }

    console.log(redirect_uri)

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(spotifyCredentials.client_id);
    url += '&scope=' + encodeURIComponent(spotifyCredentials.scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

    return url
}

export function getHashParams() {
    var hashParams = {};
    if (typeof window !== "undefined") {
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
    }
    return hashParams;
}

export async function fetchUserInfo(accessToken) {
    return axios.get('https://api.spotify.com/v1/artists/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    })
}

export async function fetchTopItemsOffset(accessToken, item, term, limit, offset) {
    return axios.get(`https://api.spotify.com/v1/me/top/${item}`, {
        params: {
            time_range: term,
            limit: limit,
            offset: offset,
        },
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export async function fetchArtistInfo(accessToken, artistId) {
    return axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
}

export async function postCreatePlaylist(accessToken, userData, data) {
    return axios.post(`https://api.spotify.com/v1/users/${userData.id}/playlists`, data, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
}

export async function postAddTrackToPlaylist(accessToken, playlistId, trackURIs) {
    return axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, trackURIs, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
}
export const generateRequestData = (accessToken) => {
    return {
        userData: {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        },
        shortTermTracks: {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/tracks',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                time_range: 'short_term',
                limit: 50,
            }
        },
        mediumTermTracks: {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/tracks',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                time_range: 'medium_term',
                limit: 50,
            }
        },
        longTermTracks: {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/tracks',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                time_range: 'long_term',
                limit: 50,
            }
        },
        shortTermArtists: {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                time_range: 'short_term',
                limit: 50,
            }
        },
        mediumTermArtists: {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                time_range: 'medium_term',
                limit: 50,
            }
        },
        longTermArtists: {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            params: {
                time_range: 'long_term',
                limit: 50,
            }
        }
    }
}
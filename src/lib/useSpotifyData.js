import { useEffect, useState } from 'react'
import { useQuery } from './useQuery'
import { generateRequestData } from './spotifyRequests'

const removeExtraTrackAttributes = (tracks) => {
    return tracks.map(({ available_markets, disc_number, duration_ms, external_ids, external_urls, preview_url, track_number, album, artists, ...rest }) => {
        return {
            image: typeof album.images[0] !== 'undefined' ? album.images[0].url : 'none',
            albumName: album.name,
            artist: artists[0].name,
            ...rest
        }
    })
}

const removeExtraArtistAttributes = (artists) => {
    return artists.map(({ external_urls, uri, images, ...rest }) => {
        return {
            image: images[0].url,
            ...rest
        }
    })
}

export const useSpotifyData = (accessToken) => {
    const requests = generateRequestData(accessToken)

    const [data, setData] = useState({
        short_term: {
            tracks: {},
            artists: {},
        },
        medium_term: {
            tracks: {},
            artists: {},
        },
        long_term: {
            tracks: {},
            artists: {},
        }
    })

    const [userData, isUserDataLoading] = useQuery(requests.userData)
    const [shortTermTracks, isShortTermTracksLoading] = useQuery(requests.shortTermTracks)
    const [mediumTermTracks, isMediumTermTracksLoading] = useQuery(requests.mediumTermTracks)
    const [longTermTracks, isLongTermTracksLoading] = useQuery(requests.longTermTracks)
    const [shortTermArtists, isShortTermArtistsLoading] = useQuery(requests.shortTermArtists)
    const [mediumTermArtists, isMediumTermArtistsLoading] = useQuery(requests.mediumTermArtists)
    const [longTermArtists, isLongTermArtistsLoading] = useQuery(requests.longTermArtists)

    useEffect(() => {
        if (isUserDataLoading) {
            let updatedData = Object.assign(data)
            updatedData['user'] = userData
            setData(updatedData)
        }
    }, [isUserDataLoading])

    useEffect(() => {
        if (isUserDataLoading && isShortTermTracksLoading && isMediumTermTracksLoading && isLongTermTracksLoading && isShortTermArtistsLoading && isMediumTermArtistsLoading && isLongTermArtistsLoading) {
            let updatedData = Object.assign(data)
            updatedData.short_term = {
                tracks: removeExtraTrackAttributes(shortTermTracks.items),
                artists: removeExtraArtistAttributes(shortTermArtists.items),
            }
            updatedData.medium_term = {
                tracks: removeExtraTrackAttributes(mediumTermTracks.items),
                artists: removeExtraArtistAttributes(mediumTermArtists.items),
            }
            updatedData.long_term = {
                tracks: removeExtraTrackAttributes(longTermTracks.items),
                artists: removeExtraArtistAttributes(longTermArtists.items),
            }
            setData(updatedData)
        }
    }, [isUserDataLoading, isShortTermTracksLoading, isMediumTermTracksLoading, isLongTermTracksLoading, isShortTermArtistsLoading, isMediumTermArtistsLoading, isLongTermArtistsLoading])

    return { data }
}
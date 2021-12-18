import { useEffect, useState } from 'react'
import { useQuery } from './useQuery'
import { generateRequestData } from './spotifyRequests'

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
                tracks: shortTermTracks,
                artists: shortTermArtists,
            }
            updatedData.medium_term = {
                tracks: mediumTermTracks,
                artists: mediumTermArtists,
            }
            updatedData.long_term = {
                tracks: longTermTracks,
                artists: longTermArtists,
            }
            setData(updatedData)
        }
    }, [isUserDataLoading, isShortTermTracksLoading, isMediumTermTracksLoading, isLongTermTracksLoading, isShortTermArtistsLoading, isMediumTermArtistsLoading, isLongTermArtistsLoading])

    return { data }
}
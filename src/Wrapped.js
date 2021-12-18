import React, { useEffect } from 'react'
import { getHashParams } from './lib/util'
import { useQuery } from './lib/useQuery'
import { useSpotifyData } from './lib/useSpotifyData'


export default function Wrapped() {
    const params = getHashParams()
    const accessToken = params.access_token

    const { data } = useSpotifyData(accessToken)

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div>
            <h1>Wrapped</h1>
        </div>
    )
}

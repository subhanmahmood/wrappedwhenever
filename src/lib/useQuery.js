import React, { useState, useEffect } from "react";
import axios from 'axios'

export const useQuery = ({ method, url, headers, params, body }) => {
    const [loaded, setLoaded] = useState(false);
    const [apiData, setApiData] = useState({});
    useEffect(() => {

        var formattedURL = new URL(url)
        if (params) {
            Object.keys(params).forEach(key => formattedURL.searchParams.append(key, params[key]))
        }
        
        fetch(formattedURL, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(res =>  {
                if(res.status >= 200 && res.status <= 299) {
                    return res.json()
                } else {
                    if(res.status === 401) {
                        throw Error('bad or expired token')
                    } else if (res.status === 403) {
                        throw Error('bad oauth request')
                    } else if (res.status === 429) {
                        throw Error('rate limit')
                    }
                }
            })
            .then(body => {
                setApiData(body)
                setLoaded(true)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // useEffect(() => {
    //     console.log(apiData)
    // }, [apiData])

    return [ apiData, loaded ]
}
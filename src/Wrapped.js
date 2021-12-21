import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getHashParams } from './lib/util'
import { useSpotifyData } from './lib/useSpotifyData'
import cn from 'classnames'
import { Item } from './components/Item'
import { MusicNoteIcon, UserGroupIcon } from '@heroicons/react/solid'
import "./Wrapped.css"

function NavButton({ Icon, active, onClick }) {
    return (
        <a
            onClick={onClick}
            className={
                cn(
                    "h-16 md:w-24 md:h-24 flex flex-grow items-center justify-center transition-all hover:bg-gray-100",
                    { "fill-gray-500": active }
                )
            }
        >
            <div className="h-8 w-8 relative">
                <Icon className={cn("fill-gray-400 hover:fill-gray-500 hover:bg-gray-100",
                    { "fill-gray-600": active })} />
            </div>
        </a>
    )
}



export default function Wrapped() {
    const params = getHashParams()
    const accessToken = params.access_token

    const { data, loaded } = useSpotifyData(accessToken)

    const resources = [{
        label: "artists",
        icon: UserGroupIcon
    }, {
        label: "tracks",
        icon: MusicNoteIcon
    }]
    const [currentResource, setCurrentResource] = useState(0)
    const [termCount, setTermCount] = useState(0)
    const terms = {
        'short_term': 'Last month',
        'medium_term': 'Last 6 months',
        'long_term': 'All time'
    }

    useEffect(() => {
        console.log(data)
        console.log(data[Object.keys(terms)[termCount]][resources[currentResource].label])
    }, [data])

    return (
        <>
            {loaded ?
                <div className="flex flex-col-reverse md:flex-row font-sans w-full md:h-full">
                    <aside className="self-stretch border-t border-gray-100 md:flex-shrink sticky bottom-0 bg-white z-10 md:h-screen md:flex-col md:justify-between">
                        <div className="flex flex-row md:flex-col">
                            {
                                resources.map((res, i) => {
                                    return (
                                        <NavButton key={i} Icon={res.icon} active={i === currentResource} onClick={() => setCurrentResource(i)} />
                                    )
                                })
                            }
                        </div>
                        <a className="w-24 h-24 hidden md:flex items-center justify-center">
                            <img className="rounded-full inline object-cover w-16 h-16 hover:p-0.5 border-4 border-gray-300" alt="user profile picture" src={data.user.images[0].url} />
                        </a>
                    </aside>
                    <main className="w-full md:max-h-screen bg-gray-100">
                        <div className="container flex flex-col h-full mx-auto md:pt-8 md:px-8">
                            <div className="sticky top-0 z-30 md:rounded-xl w-full bg-cover bg-center h-48 md:h-72 p-4 text-white flex flex-col-reverse shadow-xl" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)' }}>
                                <div className="w-full md:w-9/12 md:mx-auto mb-8">
                                    <h1 className="font-semibold text-5xl">Your Top <span className="capitalize">{resources[currentResource].label}</span></h1>
                                </div>
                            </div>
                            <div className="w-full flex-1 flex flex-col md:w-9/12 md:mx-auto bg-white overflow-scroll mb-0 no-scrollbar" style={{ scrollPadding: 'auto' }}>
                                <div className="flex-grow">
                                    <div className="flex flex-row sticky top-0 bg-white z-10 border-b border-gray-100">
                                        {
                                            Object.keys(terms).map((term, i) => {
                                                return (
                                                    <a
                                                        key={i}
                                                        className={cn("transition-all py-3 px-5 flex-grow text-center text-gray-500 hover:text-gray-800",
                                                            { "font-medium border-b-2 border-gray-500": termCount === i })}
                                                        onClick={() => setTermCount(i)}>
                                                        {terms[term]}
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        data[resources[currentResource].label][Object.keys(terms)[termCount]].map((track, i) => {
                                            return <Item data={track} i={i} key={i} />
                                        })
                                    }
                                </div>
                                <AnimatePresence>
                                    {
                                        resources[currentResource].label === 'tracks' &&
                                        <motion.div
                                            className="flex flex-col sticky bottom-0"
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 50, opacity: 0 }}
                                        >
                                            <div className="hidden md:flex h-16 bg-gradient-to-t from-gray-100 to-transparent"></div>
                                            <div className="flex-grow flex flex-row items-center justify-center px-6 py-4 border-t-2 border-gray-100 bg-white">
                                                <div className="flex-col flex-grow hidden md:flex">
                                                    <p className="font-medium text-gray-800">Get your personalised playlist</p>
                                                    <p className="text-gray-500 text-sm">Made from your top 100 tracks</p>
                                                </div>
                                                <button
                                                    className="rounded-md py-2 px-3 bg-green-500 text-white font-medium hover:bg-green-700"
                                                    onClick={() => console.log('')}
                                                >
                                                    Create your playlist
                                                </button>
                                            </div>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                    </main>
                </div>
                : <h1>Loading...</h1>
            }
        </>
    )
}

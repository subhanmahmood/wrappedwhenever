import { motion, useAnimation } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

export const Item = ({ data, i }) => {
    const boxVariants = {
        hidden: {
            opacity: 0,
            y: -20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
            }
        }
    }
    return (
        <AnimatedSection variants={boxVariants}>
            <div className="flex flex-row space-x-4 items-center px-6 py-4 hover:bg-gray-50 group transition-all">
                <div style={{ minWidth: 22 }}>
                    <p className="text-gray-400 text-right mr-2 transform transition-all group-hover:-translate-y-2">{i + 1}</p>
                </div>
                <div className="shadow-md group-hover:shadow-xl rounded">
                    {
                        data.image !== 'none' ?
                            <img
                                alt={data.name}
                                layout="fill"
                                src={data.image}
                                className="object-cover h-12 w-12 rounded"
                                loading="lazy"
                            />
                            : <></>
                    }
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex flex-row items-center">
                        <p className="text-gray-800 font-medium truncate ">{data.name}</p>
                        {
                            data.explicit ?
                                <span style={{ fontSize: '0.5rem' }} className="text-gray-400 border border-gray-400 rounded px-2 py-0.5 ml-2">EXPLICIT</span>
                                : <></>
                        }
                    </div>
                    <p className="text-gray-500 text-sm">{
                        data.type === 'artist' ?
                            <span className="flex flex-row flex-wrap">
                                {[data.genres[0]].map((genre, i) => {
                                    return (<span key={i} className="rounded px-2 py-0.5 mr-2 mt-1 text-gray-400 border border-gray-400 text-sm">{genre}</span>)
                                })}
                            </span>
                            : <>{data.artist} • {data.albumName}</>
                    }</p>
                </div>
            </div>
        </AnimatedSection>
    )
}
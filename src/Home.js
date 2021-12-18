import { useCurrentHeight } from './lib/useCurrentHeight';
import { generateAuthURL } from './lib/util';

export default function Home() {
  const height = useCurrentHeight();

  const spotifyCredentials = {
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    scope: "user-top-read playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative",
  }

  const authURL = generateAuthURL(spotifyCredentials, 'wrapped')

  return (
    <>
      <div style={{ height: `${height}px` }} className="flex flex-col justify-center items-center font-sans">
        <div className="rounded-lg shadow-md bg-white p-6 border border-gray-100 flex flex-col items-center md:max-w-md">
          <div className="text-center px-5">
            <h1 className="text-3xl font-semibold">See your Spotify Wrapped now</h1>
            <p className="text-xl mt-3">Your top tracks, artists and genres all in one place</p>
          </div>
          <a className="cursor-pointer mt-4 font-medium px-5 py-3 rounded-full bg-green-500 text-white" href={authURL}>Sign in with Spotify</a>
        </div>
      </div>
    </>
  )
}

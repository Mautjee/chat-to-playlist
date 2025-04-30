import { MainContainer } from "@/components/";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat to Playlist - Convert Spotify links to playlists</title>
        <meta
          name="description"
          content="Turn Spotify links shared in your chats into custom playlists. Upload your chat export, extract songs, and create a playlist in seconds."
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* Open Graph / Social Media Preview Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://chat-to-playlist.vercel.app/"
        />
        <meta
          property="og:title"
          content="Chat to Playlist - Convert Spotify links to playlists"
        />
        <meta
          property="og:description"
          content="Turn Spotify links shared in your chats into custom playlists. Upload your chat export, extract songs, and create a playlist in seconds."
        />
        <meta
          property="og:image"
          content="https://chat-to-playlist.vercel.app/og-image.png"
        />
        <script
          defer
          data-domain="chat-to-playlist.sooth.dev"
          src="http://plausible.sooth.dev/js/script.js"
        ></script>
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        <MainContainer />
      </main>
    </>
  );
}


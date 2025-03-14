import { MainContainer } from "@/components/";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat to Playlist - Convert Spotify links to playlists</title>
        <meta name="description" content="Turn Spotify links shared in your chats into custom playlists. Upload your chat export, extract songs, and create a playlist in seconds." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center">
        <MainContainer />
      </main>
    </>
  );
}
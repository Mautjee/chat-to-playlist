import { MainContainer } from "@/components/";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat-to-playlist</title>
        <meta name="description" content="Chat to playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1DB954] to-[#191414]">
        <MainContainer />
      </main>
    </>
  );
}

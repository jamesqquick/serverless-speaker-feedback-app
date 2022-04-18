import type { GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import prisma from '../lib/prisma'
import { Talk } from '@prisma/client'
import Link from 'next/link'
import TalkCard from '../components/TalkCard'
import { useUser } from '@auth0/nextjs-auth0'


type HomePageProps = {
  talks: Talk[]
}
const Home: NextPage<HomePageProps> = ( { talks }) => {
    const { user, error, isLoading } = useUser();

  return (
    <div >
      <Head>
        <title>James Q Quick Talks</title>
        <meta name="description" content="List of talks and feedback from James Q Quick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-6xl text-gray-200 mb-10 font-bold text-center">
          <span className="font-light text-gray-400">#</span>JQQ<span className="text-teal-200 ">Talks</span>
        </h1>

        { user && 
          <div className="flex justify-end">
            <Link href="/dashboard">
             <a className="text-right inline-block text-lg font-bold bg-teal-200 
            text-teal-900 rounded-lg mb-4 p-4 hover:bg-teal-300 hover:-translate-y-[2px] transition-all">Add a Talk</a>
            </Link>
          </div>
        }
        {talks.map(talk => (
          <TalkCard talk={talk} key={talk.id}/>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps(context:GetStaticPropsContext) {
  const talks = await prisma.talk.findMany({
    orderBy: {
      date: 'desc'
    }
  });
  const formattedTalks = talks.map( (talk: Talk) => ({
    ...talk,
    date: talk.date.toString(),
    createdAt: talk.createdAt.toString()
  }))
  return {
    props: {talks: formattedTalks},
    revalidate: 60,

  }
}

export default Home

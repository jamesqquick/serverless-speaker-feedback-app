import { Talk } from '@prisma/client'
import type { GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Reviews from '../../components/Reviews'
import ReviewForm from '../../components/ReviewForm'
import prisma from '../../lib/prisma'
import Tweets from '../../components/Tweets'

type TalkPageProps = {
  talk: Talk
}
const Home: NextPage<TalkPageProps> = ({talk}) => {
  return (
    <div >
      <Head>
        <title>James Q Quick Talks - {talk.title} at {talk.conference}</title>
        <meta name="description" content={talk.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

      <h1 className="text-white text-4xl mb-12 font-bold text-center">
          {talk.title}
      </h1>
      <p className="text-gray-200 text-xl mb-1">
        <span className="text-gray-400 text-lg">Conference:</span> {talk.conference}</p>
      <p className="text-xl text-gray-200 mb-1">
        <span className="text-gray-400 text-lg">Date:</span> Some date
      </p>
      <p className="text-gray-200 text-xl mb-1">
        <span className="text-gray-400 text-lg">Slides: </span> 
        <Link href={talk.slidesLink}>
          <a className=" inline-block text-white underline">Get&apos;em here</a>
        </Link>
      </p>
      <p className="text-gray-400 text-lg">Description:</p> 
      <p className="text-xl text-gray-200 mb-1">
        {talk.description}
      </p>
      <ReviewForm talkId={talk.id}/>
      <Reviews talkId={talk.id}/>
      <Tweets/>
      </main>
    </div>
  )
}

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
  if(!params || typeof params.slug !== "string") throw new Error("Soemthing bad");
  const slug = params.slug || '';
  const talk = await prisma.talk.findUnique({
    where: {
      slug
    }
  })

  if(!talk) throw new Error("Couln't find that talk")

  return { 
    props: { talk },
    revalidate: 60
  }
}

export const getStaticPaths = async  () => {
  const talks = await prisma.talk.findMany();
  const paths = talks.map((talk) => ({
      params: { slug: talk.slug }
    }
  ));
  return {paths, fallback: 'blocking'};
}

export default Home

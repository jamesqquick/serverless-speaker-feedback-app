import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import TalkForm from '../components/TalkForm'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Add A New James Q Quick Talk</title>
        <meta name="description" content="Add A New Talk" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
       
        <h1 className="text-4xl text-gray-200 mb-10 font-bold">
          Add a New Talk
        </h1>
        <TalkForm/>
      </main>
    </div>
  )
}

export default withPageAuthRequired(Home)

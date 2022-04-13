import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../lib/swr'
import { Tweet } from '../lib/twitter'
import TwitterCard from './TwitterCard'

export default function Tweets() {

  const { data, error } = useSWR<{data:Tweet[]}>(`/api/tweets`, fetcher)
  console.log(data);
  return (
    <div className="mt-16">
        <h2 className="text-4xl font-bold text-white mb-10 text-center">
          Tweets
        </h2>
        {data?.data && data.data.map( (tweet:Tweet) => (
          <TwitterCard tweet={tweet}  key={tweet.id}/>
        ))}
    </div>
  )
}

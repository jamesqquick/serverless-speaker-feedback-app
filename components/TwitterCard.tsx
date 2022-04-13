import moment from 'moment'
import React from 'react'
import { Tweet } from '../lib/twitter'

type CardProps = {
  tweet: Tweet
}
export default function TwitterCard({tweet}: CardProps) {
  const formattedDate = moment(tweet.createdAt).fromNow();
  return (
    <div className="py-4 px-8 mb-4 shadow-md bg-gray-700 rounded-md">
      <div className="md:flex gap-2 my-2">
        <p className="text-gray-200">{tweet.user.name}</p>
        <p className="text-gray-400">{tweet.user.username} | {formattedDate}</p>
      </div>
      <p className="text-gray-200">{tweet.text}</p>
    </div>
  )
}

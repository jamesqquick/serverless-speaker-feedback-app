import { Review } from '@prisma/client'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../lib/swr'
import ReviewCard from './ReviewCard'

type ReviewsProps = {
  talkId: number
}

export default function Reviews({talkId}: ReviewsProps) {

  const { data, error } = useSWR(`/api/reviews?talkId=${talkId}`, fetcher)
  console.log(data)
  return (
    <div className="mt-16">
        <h2 className="text-4xl font-bold text-white mb-10 text-center">
          Reviews
        </h2>
        <div className="grid md:grid-cols-2 gap-2">
            {data?.data && data.data.map( (review:Review) => (
                <ReviewCard review={review} key={review.id}/>
                ))}
        </div>
    </div>
  )
}

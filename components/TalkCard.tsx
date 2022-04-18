import { Talk } from '@prisma/client'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'

type CardProps = {
  talk: Talk
}
export default function TalkCard({talk}: CardProps) {
  return (
    <div className="py-6 px-8 mb-6 shadow-md bg-gray-700 rounded-md">
      <h2 className="text-white text-4xl">
          {talk.title}
      </h2>
      <p className="text-gray-200 text-md">{talk.conference}</p>
      <p className="text-md text-gray-200 ">
        {moment(talk.date).format("MM/DD/YYYY")}
      </p>
      <p className="text-xl text-teal-200 text-right hover:text-teal-300">
        <Link href={`/talks/${talk.slug}`} >
          <a >More details</a>
        </Link>
      </p>
      
        
    </div>
  )
}

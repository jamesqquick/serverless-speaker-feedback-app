import { Review } from '@prisma/client'
import React from 'react'

type CardProps = {
  review: Review
}
export default function ReviewCard({review}: CardProps) {
  return (
    <div className="py-4 px-8 shadow-md bg-gray-700 rounded-md">
      <div className="flex gap-4 my-6">

        {[1,2,3,4,5].map( (index) => (
          <svg key={index}
          aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className={`w-4   
          ${index <= review.rating ? 'text-teal-200' : 'text-gray-100'} mr-1 scale-[2] `} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
          </svg>
        ))}
      </div>
      {/* UPDATE */}
      <p className="text-gray-200 font-bold text-sm mb-1">{review?.name || 'anonymous'}</p>
      <p className="text-gray-200 text-lg">{review.text}</p>
    </div>
  )
}

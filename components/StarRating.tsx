import React, { useState } from 'react';

type StarRatingProps = {
  ratingChanged: Function
}

export default function StarRating({ ratingChanged }: StarRatingProps) {
  const [rating, setRating] = useState(4);
  const stars = [1, 2, 3, 4, 5];

  const handleMouseEnter = (index:number) => {
    setRating(index);
    ratingChanged(index + 1);
  };

  return (
    <div className="flex gap-4 ml-2">
      {stars.map((_, index) => (
          <svg key={index} onClick={() => handleMouseEnter(index)}
          onMouseEnter={() =>handleMouseEnter(index)}
          aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className={`w-4   
          ${index <= rating ? 'text-teal-200' : 'text-gray-100'} mr-1 scale-[2] `} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
          </svg>
      ))}
    </div>
  );
}
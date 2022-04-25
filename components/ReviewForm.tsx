import React, { useState } from 'react'
import StarRating from './StarRating';


type CommentFormProps = {
  talkId: number
}
const ReviewForm = ({talkId}: CommentFormProps) => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(rating, text);
    try {
      const res = await fetch('/api/reviews', {
        method: "POST",
        body: JSON.stringify({rating, text, talkId, name})
      })
      await res.json();
      setRating(1);
      setText("");
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="mt-16">
        <h2 className="text-4xl font-bold text-white mb-10 text-center">
          Add a Review
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col"> 
          <div className="mb-4">
            <label className="text-md font-bold text-gray-300 mb-1 block" htmlFor="name">Name</label>
            <input className="border-2 rounded-md text-lg px-4 py-3 w-full" onChange={(e) => setName(e.target.value)} type="text" name="name" value={name}  />
          </div> 
           <div className="mb-4">
              <label className="text-md font-bold text-gray-300 mb-2 block" htmlFor="description">What did you think? Tell me everything 👇</label>
              <textarea className="border-2 rounded-md text-lg px-4 py-3 w-full" onChange={(e) => setText(e.target.value)} name="text" value={text} rows={5} />
            </div> 
            <div className="mb-8">
              <label className="text-md font-bold text-gray-300 mb-6 block" htmlFor="description">What rating would you give? (hover to select)</label>
              <StarRating ratingChanged={setRating}/>
            </div>
          <button className="text-lg font-bold bg-teal-200 
            text-teal-900 rounded-lg mb-4 p-4 hover:-translate-y-[2px] hover:bg-teal-300 transition-all self-end">
            Submit
          </button> 
        </form>
    </div>
  )
}

export default ReviewForm

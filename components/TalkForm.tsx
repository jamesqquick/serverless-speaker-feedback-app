import Router from 'next/router';
import React, { useState } from 'react'

const TalkForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slidesLink, setSlidesLink] = useState("");
  const [conference, setConference] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/talks', {
        method: "POST",
        body: JSON.stringify({title, description, slidesLink, conference})
      })
      if(res.status !== 200) {
        return;
      }
      const { data } = await res.json();
      console.log(data);
      Router.push(`/talks/${data.slug}`)
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="text-md font-bold text-gray-300 mb-1 block" htmlFor="conference">Conference</label>
        <input className="border-2 rounded-md text-lg px-4 py-3 w-full" onChange={(e) => setConference(e.target.value)} type="text" name="conference" value={conference}  />
      </div> 
      <div className="mb-4">
        <label className="text-md font-bold text-gray-300 mb-1 block" htmlFor="title">Talk Title</label>
        <input className="border-2 rounded-md text-lg px-4 py-3 w-full" onChange={(e) => setTitle(e.target.value)} type="text" name="title" value={title}  />
      </div> 
      <div className="mb-4">
        <label className="text-md font-bold text-gray-300 mb-1 block" htmlFor="slidesLink">Slides Link</label>
        <input className="border-2 rounded-md text-lg px-4 py-3 w-full" onChange={(e) => setSlidesLink(e.target.value)} type="text" name="slidesLink" value={slidesLink} />
      </div>
      <div className="mb-4">
        <label className="text-md font-bold text-gray-300 mb-1 block" htmlFor="description">Talk Description</label>
        <textarea className="border-2 rounded-md text-lg px-4 py-3 w-full" onChange={(e) => setDescription(e.target.value)} name="description" value={description} rows={5} />
      </div> 
      <button className="text-lg font-bold bg-teal-200 
          text-teal-900 rounded-lg mb-4 p-4 hover:-translate-y-[2px] hover:bg-teal-300 transition-all">
            Submit
      </button> 
    </form>
  )}

export default TalkForm

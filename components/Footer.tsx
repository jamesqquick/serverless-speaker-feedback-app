import React from 'react'

export default function Footer() {
  return (
    <footer className="fixed w-full py-4 px-10 bottom-0 bg-gray-800 text-white flex flex-col items-center gap-2">
        <a className="underline" href="https://github.com/jamesqquick/serverless-speaker-feedback-app">Check out the source code</a>
        <div className="flex md:flex-row flex-col items-center gap-2">
            <p className="flex md:flex-row flex-col  items-center">Built with 🧡</p>
            <a className="underline font-bold" href="https://nextjs.org/">Next.js</a> 
            <a className="underline font-bold" href="https://vercel.com/">Vercel</a>
            <a className="underline font-bold" href="https://planetscale.com/">PlanetScale</a>
            <a className="underline font-bold" href="https://prisma.io/">Prisma</a>
            <a className="underline font-bold" href="https://tailwindcss.com/">Tailwind</a>
        </div>
    </footer>
  )
}

import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link';
import React from 'react'

export default function Navbar() {
  const {user} = useUser();
  return (
    <div className="flex flex-column gap-2 my-4">
      <Link href="/">
        <a className="my-5 inline-block text-white">Go Home</a>
      </Link>
      {user &&
        <Link href="/api/auth/logout">
          <a className="my-5 inline-block text-white">Logout</a>
        </Link>
      }
    </div>
  )
}

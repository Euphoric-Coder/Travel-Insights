import React from 'react'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-xl">Page not found</p>
          <p className="text-gray-500">But you can still find me on <a href="https://github.com/josh-collins" className="underline">GitHub</a></p>
    </div>
  )
}

export default PageNotFound
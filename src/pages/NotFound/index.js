import React from 'react'
import { Link } from 'react-router-dom'
import Layout from "@components/Layout";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
        <div className="flex flex-col items-center">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold uppercase font-nidus_sans__reguar tracking-widest">Page Not Found</h1>
          <div className="mt-6">
            <Link to="/" className="text-green text-xl sm:text-2xl underline uppercase font-nidus_sans__reguar tracking-widest cursor-pointer">Go Home</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageNotFound;
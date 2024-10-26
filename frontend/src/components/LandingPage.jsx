import React from 'react'
import Layout from './Layout'

const LandingPage = () => {
  return (
    <Layout>
        <div className='flex items-center justify-center h-full w-full'>
            <div className='h-full w-[60%] bg-yellow-200'></div>
            <div className='h-full w-[40%] bg-green-200'></div>
        </div>
    </Layout>
  )
}

export default LandingPage
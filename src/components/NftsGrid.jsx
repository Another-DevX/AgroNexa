import Image from 'next/image'
import React from 'react'

const NftsGrid = ({ nfts }) => {
  return (
    <div className='flex flex-col gap-5 w-full md:grid md:grid-cols-2'>
          {
            nfts.map((nft) => {
              return (
                <span key={nft.name} className='bg-white shadow-md rounded-md w-5/6 md:w-auto flex flex-col justify-center items-center'>
                  <img src={nft.img} className='w-full full rounded-t-md'/>
                  <h3 className='text-xl md:text-4xl font-bold m-5 text-center'>{nft.name}</h3>
                  <p className='text-md md:text-base text-center'>{nft.description}</p>
                  <button className='py-2 px-4 rounded-md bg-blue-400 shadow-sm my-5 w-4/6 text-white font-bold'>Adquirir</button>
                </span>
              )
            })
          }
    </div>
  )
}

export default NftsGrid
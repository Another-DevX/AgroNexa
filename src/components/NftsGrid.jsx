import Image from 'next/image'
import React from 'react'

const NftsGrid = ({ nfts }) => {
  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-4'>
      <li className='bg-gray-600'>
        <ul>
          {
            nfts.map((nft) => {
              return (
                <div key={nft.name} className='rounded-sm'>
                  <img height={100} width={200} src={nft.img}/>
                </div>
              )
            })
          }
        </ul>
      </li>
    </div>
  )
}

export default NftsGrid
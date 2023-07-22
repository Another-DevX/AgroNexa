import Image from 'next/image'
import React from 'react'

const NftsGrid = ({ nfts }) => {
  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-4'>
          {
            nfts.map((nft) => {
              return (
                <div key={nft.name} className=''>
                  <img src={nft.img} className='w-10 h-20 rounded-sm'/>
                  <h3 className='text-xs text-center'>{nft.name}</h3>
                </div>
              )
            })
          }
    </div>
  )
}

export default NftsGrid
import Image from 'next/image'
import React from 'react'

const NftsGrid = ({ nfts }) => {
  return (
    <div className='flex flex-col gap-10'>
          {
            nfts.map((nft) => {
              return (
                <div key={nft.name} className='flex flex-col items-center'>
                  <img src={nft.img} className='w-46 h-80 rounded-sm'/>
                  <h3 className='text-xs text-center'>{nft.name}</h3>
                </div>
              )
            })
          }
    </div>
  )
}

export default NftsGrid
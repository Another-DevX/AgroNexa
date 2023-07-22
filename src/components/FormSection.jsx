import React from 'react'

const FormSection = ({ type }) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className='font-bold text-lg'>{type}</h2>
      <input className='px-2 py-1' type="text" placeholder={type} required/>
      </div>
  )
}

export default FormSection
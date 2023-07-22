import React from 'react'

const FormSection = ({ type }) => {
  return (
    <div className="flex flex-col gap-1 w-60">
      <h2 className='font-bold text-lg'>{type}</h2>
      <input className='px-2 py-1 rounded-sm text-gray-500' type="text" id={type} name={type} placeholder={type} required/>
    </div>
  )
}

export default FormSection
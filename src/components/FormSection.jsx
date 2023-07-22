import React from 'react'

const FormSection = ({ type }) => {
  return (
    <div className="flex flex-col gap-1 w-60">
      <input className='px-2 py-1 bg-transparent text-gray-900 text-sm border-2 rounded-xs  border-blue-900 ...' type="text" id={type} name={type} placeholder={`enter your ${type}`} required/>
    </div>
  )
}

export default FormSection
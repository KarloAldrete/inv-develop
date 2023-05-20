import React from 'react'

export const Input = ({children, placeHolder, label, name, value, onChange}) => {
  return (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
            {label}
        </label>
        { children ??   
            <input 
            onChange={onChange}
            value={value}
            name={name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id={label} type="text" 
            placeholder={placeHolder} />
        }
    </div>
  )
}


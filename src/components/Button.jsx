import React from "react";

function Button({
    childern,
    type='button',
    bgColour='bg-blue-600',
    textColour='text-white',
    className='',
    ...props
}){
    return (
        <button className={`px-4 py2 rounded-lg ${className} ${bgColour} ${textColour} `} {...props}>
            {childern}
        </button>
    )
}
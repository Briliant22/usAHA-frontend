import React from 'react'
import { tv } from 'tailwind-variants'
import Image from 'next/image'

const filterButtonStyle = tv({
    base: 'flex gap-2 w-1/4 justify-center rounded-full p-2',
    variants:{
        isActive: {
            true: 'bg-[#4082E5]',
            false: ''
        }
    }
})

const textButtonStyle = tv({
    base: '',
    variants:{
        isActive: {
            true: 'text-white',
            false: 'text-[#7C89A8]'
        }
    }
})

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean,
    icon_path: string,
    label: string
}

export const FilterButton = ({isActive, icon_path, label, ...props}: FilterButtonProps) => {
    const imageType = isActive ? 'Active' : '';
    return (
    <button className={filterButtonStyle({isActive})} {...props}>
        <Image
            src={icon_path + imageType + '.svg'}
            alt={label}
            width={21}
            height={21}
        />
        <p className={textButtonStyle({isActive})}>{label}</p>
    </button>
  )
}
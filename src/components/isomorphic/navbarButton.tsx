import React from 'react'
import { tv } from 'tailwind-variants'

const navbarButtonStyle = tv({
    base: 'aspect-square w-20 mx-auto flex flex-col justify-center items-center pb-1',
    variants:{
        isActive: {
            true: 'bg-[#2F6BC5] rounded-full',
            false: ''
        }
    }
})

interface NavbarButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    isActive: boolean,
    icon: React.ReactNode,
    label: string
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({isActive, icon, label, ...props}) => {
  return (
    <div className={navbarButtonStyle({isActive})} {...props}>
      <div className="flex items-center justify-center w-8 h-8">
        {icon}
      </div>
      <p className="text-white font-semibold text-center text-xs w-14 font-inter">
        {label}
      </p>
    </div>
  )
}
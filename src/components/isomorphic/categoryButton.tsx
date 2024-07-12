import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import Image from 'next/image'

const categoryButtonStyle = tv({
    base: 'flex items-center m-4 justify-center gap-3 px-4 py-2 rounded-full transition-colors duration-200 border',
    variants: {
        isActive: {
            true: 'bg-[#4082E5]',
            false: 'bg-white hover:bg-gray-100'
        }
    }
})

const textButtonStyle = tv({
    base: 'text-sm font-medium',
    variants: {
        isActive: {
            true: 'text-white',
            false: 'text-[#7C89A8]'
        }
    }
})

interface CategoryButtonProps extends 
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof categoryButtonStyle> {
    icon_path: string;
    label: string;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
    isActive = false,
    icon_path,
    label,
    className,
    ...props
}) => {
    const imageType = isActive ? 'Active' : '';
    return (
        <button 
            className={categoryButtonStyle({ isActive, className })} 
            {...props}
        >
            <Image
                src={`${icon_path}${imageType}.svg`}
                alt={label}
                width={21}
                height={21}
            />
            <span className={textButtonStyle({ isActive })}>{label}</span>
        </button>
    )
}
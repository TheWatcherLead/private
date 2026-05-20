'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-sans font-medium rounded transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1117]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Sizes
          size === 'sm' && 'text-xs px-3 py-2 min-h-[36px]',
          size === 'md' && 'text-sm px-5 py-2.5 min-h-[44px]',
          size === 'lg' && 'text-base px-7 py-3.5 min-h-[52px]',
          // Variants
          variant === 'primary' && 'bg-[#C9A96E] text-[#0F1117] hover:bg-[#B8935A] active:bg-[#A67E48]',
          variant === 'secondary' && 'bg-[#1A1F2E] text-[#F5F0E8] border border-[#2E3447] hover:border-[#C9A96E] hover:text-[#C9A96E]',
          variant === 'ghost' && 'bg-transparent text-[#C9A96E] border border-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0F1117]',
          variant === 'danger' && 'bg-[#E05252] text-white hover:bg-[#C94040]',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            {children}
          </span>
        ) : children}
      </button>
    )
  }
)
Button.displayName = 'Button'

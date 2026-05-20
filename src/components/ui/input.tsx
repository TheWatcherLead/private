import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, required, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-sans text-sm font-medium text-[#F5F0E8]">
            {label}
            {required && <span className="text-[#E05252] ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(
            'w-full font-sans text-sm bg-[#1A1F2E] text-[#F5F0E8] border rounded px-4 py-3 min-h-[44px]',
            'transition-colors duration-200 outline-none placeholder:text-[#A89F94]',
            error
              ? 'border-[#E05252] focus:border-[#E05252]'
              : 'border-[#2E3447] focus:border-[#C9A96E]',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} role="alert" className="font-sans text-xs text-[#E05252]">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="font-sans text-xs text-[#A89F94]">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

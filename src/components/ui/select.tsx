import { SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, placeholder, id, required, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-sans text-sm font-medium text-[#F5F0E8]">
            {label}
            {required && <span className="text-[#E05252] ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              'w-full appearance-none font-sans text-sm bg-[#1A1F2E] text-[#F5F0E8] border rounded px-4 py-3 pr-10 min-h-[44px]',
              'transition-colors duration-200 outline-none cursor-pointer',
              error
                ? 'border-[#E05252] focus:border-[#E05252]'
                : 'border-[#2E3447] focus:border-[#C9A96E]',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(({ value, label }) => (
              <option key={value} value={value} className="bg-[#1A1F2E]">
                {label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89F94] pointer-events-none"
            aria-hidden="true"
          />
        </div>
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
Select.displayName = 'Select'

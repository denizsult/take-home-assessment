import React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
              error && "border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-2 text-sm">
            <label 
              htmlFor={props.id} 
              className={cn(
                "font-medium text-gray-700",
                props.disabled && "text-gray-400"
              )}
            >
              {label}
            </label>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
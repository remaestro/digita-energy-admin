import { View, Text, Pressable } from 'react-native'
import { cn } from '../utils/cn'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  className?: string
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  className,
}: ButtonProps) {
  const baseStyles = 'py-3 px-6 rounded-lg items-center justify-center'
  
  const variantStyles = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-gray-600 active:bg-gray-700',
    outline: 'border-2 border-primary-600 active:bg-primary-50',
  }

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-primary-600',
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        disabled && 'opacity-50',
        className
      )}
    >
      <Text className={cn('font-semibold text-base', textStyles[variant])}>
        {title}
      </Text>
    </Pressable>
  )
}

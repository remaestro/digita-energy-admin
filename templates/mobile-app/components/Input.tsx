import { View, TextInput, Text } from 'react-native'
import { cn } from '../utils/cn'

interface InputProps {
  label?: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  error?: string
  className?: string
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  className,
}: InputProps) {
  return (
    <View className={cn('mb-4', className)}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className={cn(
          'border border-gray-300 rounded-lg px-4 py-3 text-base',
          error && 'border-red-500'
        )}
        placeholderTextColor="#9ca3af"
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  )
}

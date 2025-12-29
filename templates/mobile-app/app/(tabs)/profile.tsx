import { View, Text } from 'react-native'

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <View className="bg-white rounded-lg p-8 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Profile</Text>
        <Text className="text-gray-600">Your profile information here</Text>
      </View>
    </View>
  )
}

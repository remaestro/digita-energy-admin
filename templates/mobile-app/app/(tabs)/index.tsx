import { View, Text, ScrollView } from 'react-native'

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to {{PROJECT_NAME}}
        </Text>
        
        <View className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Getting Started
          </Text>
          <Text className="text-gray-600">
            Start building your mobile app with React Native and Expo!
          </Text>
        </View>

        <View className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Features
          </Text>
          <Text className="text-gray-600 mb-2">✅ Expo Router for navigation</Text>
          <Text className="text-gray-600 mb-2">✅ NativeWind for styling</Text>
          <Text className="text-gray-600 mb-2">✅ Supabase integration</Text>
          <Text className="text-gray-600 mb-2">✅ TypeScript support</Text>
          <Text className="text-gray-600">✅ TanStack Query for data</Text>
        </View>
      </View>
    </ScrollView>
  )
}

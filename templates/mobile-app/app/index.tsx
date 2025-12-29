import { View, Text, Pressable } from 'react-native'
import { Link } from 'expo-router'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="max-w-md px-6">
        <Text className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Welcome to{'\n'}
          <Text className="text-primary-600">{{PROJECT_NAME}}</Text>
        </Text>
        
        <Text className="text-lg text-gray-600 mb-8 text-center">
          {{PROJECT_DESCRIPTION}}
        </Text>

        <Link href="/(tabs)" asChild>
          <Pressable className="bg-primary-600 rounded-lg py-4 px-6 active:bg-primary-700">
            <Text className="text-white text-center text-lg font-semibold">
              Get Started
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

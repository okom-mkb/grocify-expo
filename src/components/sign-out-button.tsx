import { useClerk } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { Pressable, Text } from 'react-native'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/')
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <Pressable
      className="bg-[#0a7ea4] active:opacity-70 py-3 px-6 rounded-lg items-center mt-2 w-full"
      onPress={handleSignOut}
    >
      <Text className="text-white font-semibold text-base">Sign out</Text>
    </Pressable>
  )
}

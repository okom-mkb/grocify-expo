import { AuthView, useAuthViewState } from '@clerk/expo/native'
import { Redirect } from 'expo-router'

export default function SignInScreen() {
  const { isLoaded, isAuthFlowComplete } = useAuthViewState()

  if (!isLoaded) {
    return null
  }

  if (isAuthFlowComplete) {
    return <Redirect href="/(home)" />
  }

  return <AuthView mode="signInOrUp" isDismissible={false} />
}

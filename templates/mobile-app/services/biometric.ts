import * as LocalAuthentication from 'expo-local-authentication'

export const biometricAuth = {
  async isAvailable() {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    const enrolled = await LocalAuthentication.isEnrolledAsync()
    return compatible && enrolled
  },

  async authenticate(promptMessage = 'Authenticate to continue') {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Use passcode',
      })
      return result.success
    } catch (error) {
      console.error('Biometric authentication error:', error)
      return false
    }
  },

  async getSupportedTypes() {
    return await LocalAuthentication.supportedAuthenticationTypesAsync()
  },
}

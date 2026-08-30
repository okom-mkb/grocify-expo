import { useColorScheme } from 'react-native';
import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context';

export type ThemedViewProps = SafeAreaViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = colorScheme === 'dark' 
    ? (darkColor ?? '#151718') 
    : (lightColor ?? '#fff');

  return <SafeAreaView style={[{ backgroundColor, flex: 1 }, style]} {...otherProps} />;
}

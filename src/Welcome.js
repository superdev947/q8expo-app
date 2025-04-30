import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import WelcomeScreen from './containers/AuthScreen/WelcomeScreen'
import PrivacyPolicyScreen from './containers/AuthScreen/PrivacyPolicyScreen'

const RootStack = createStackNavigator(
	{
		WelcomeScreen: {
			screen: WelcomeScreen,
			navigationOptions: { headerShown: false },
		},
		PrivacyPolicyScreen: {
			screen: PrivacyPolicyScreen,
			navigationOptions: { headerShown: false },
		},
	},
	{
		initialRouteName: 'WelcomeScreen',
	}
)

export default createAppContainer(RootStack)
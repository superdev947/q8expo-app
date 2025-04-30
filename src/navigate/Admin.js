import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../containers/AdminScreens/HomeScreen'
import ScannScreen from '../containers/AdminScreens/ScannScreen'

const HomeNavigator = createStackNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
			navigationOptions: { headerShown: false },
		},
		ScannScreen: {
			screen: ScannScreen,
			navigationOptions: { headerShown: false },
		},
	})

export default createAppContainer(HomeNavigator)
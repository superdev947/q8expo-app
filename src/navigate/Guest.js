import SideMenu from './SideMenu'
import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from '../containers/AuthScreen/LoginScreen'
import CreatAccountScreen from '../containers/AuthScreen/CreatAccountScreen'
import ForgetScreen from '../containers/AuthScreen/ForgetScreen'
import VerificationScreen from '../containers/AuthScreen/VerificationScreen'
import ResetpasswordScreen from '../containers/AuthScreen/ResetpasswordScreen'
import OffersScreen from '../containers/MainScreens/OffersScreen'
import DetailScreen from '../containers/MainScreens/DetailScreen'
import HomeScreen from '../containers/MainScreens/HomeScreen'
import CategoriesScreen from '../containers/MainScreens/CategoriesScreen'
import LocationScreen from '../containers/MainScreens/LocationScreen'
import PrivacyPolicyScreen from '../containers/MainScreens/PrivacyPolicyScreen'
import { LAYOUT } from '../constants'

const HomeNavigator = createStackNavigator(
	{
		LoginScreen: {
			screen: LoginScreen,
			navigationOptions: { headerShown: false },
		},
		CreatAccountScreen: {
			screen: CreatAccountScreen,
			navigationOptions: { headerShown: false },
		},
		ForgetScreen: {
			screen: ForgetScreen,
			navigationOptions: { headerShown: false },
		},
		VerificationScreen: {
			screen: VerificationScreen,
			navigationOptions: { headerShown: false },
		},
		ResetpasswordScreen: {
			screen: ResetpasswordScreen,
			navigationOptions: { headerShown: false },
		},

		HomeScreen: {
			screen: HomeScreen,
			navigationOptions: { headerShown: false },
		},
		CategoriesScreen: {
			screen: CategoriesScreen,
			navigationOptions: { headerShown: false },
		},
		OffersScreen: {
			screen: OffersScreen,
			navigationOptions: { headerShown: false },
		},
		DetailScreen: {
			screen: DetailScreen,
			navigationOptions: { headerShown: false },
		},
		LocationScreen: {
			screen: LocationScreen,
			navigationOptions: { headerShown: false },
		},
		PrivacyPolicyScreen: {
			screen: PrivacyPolicyScreen,
			navigationOptions: { headerShown: false },
		},
	},
	{
		initialRouteName: 'HomeScreen',
	}
)

const RootStack = createDrawerNavigator({
	Home: {
		screen: HomeNavigator,
	},
}, {
	contentComponent: SideMenu,
	drawerWidth: LAYOUT.window.width * .7,
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
})

export default createAppContainer(RootStack)
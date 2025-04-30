import SideMenu from './SideMenu'
import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../containers/MainScreens/HomeScreen'
import CategoriesScreen from '../containers/MainScreens/CategoriesScreen'
import OffersScreen from '../containers/MainScreens/OffersScreen'
import MyOffersScreen from '../containers/MainScreens/MyOffersScreen'
import DetailScreen from '../containers/MainScreens/DetailScreen'
import LocationScreen from '../containers/MainScreens/LocationScreen'
import MembershipScreen from '../containers/MainScreens/MembershipScreen'
import MyProfileScreen from '../containers/MainScreens/MyProfileScreen'
import PrivacyPolicyScreen from '../containers/MainScreens/PrivacyPolicyScreen'
import CreateScreen from '../containers/MainScreens/CreateScreen'
import CartScreen from '../containers/MainScreens/CartScreen'
import DiscountScreen from '../containers/MainScreens/DiscountScreen'
import { LAYOUT } from '../constants'

const HomeNavigator = createStackNavigator(
	{
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
		MyOffersScreen: {
			screen: MyOffersScreen,
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
		MembershipScreen: {
			screen: MembershipScreen,
			navigationOptions: { headerShown: false },
		},
		MyProfileScreen: {
			screen: MyProfileScreen,
			navigationOptions: { headerShown: false },
		},
		PrivacyPolicyScreen: {
			screen: PrivacyPolicyScreen,
			navigationOptions: { headerShown: false },
		},
		CreateScreen: {
			screen: CreateScreen,
			navigationOptions: { headerShown: false },
		},
		CartScreen: {
			screen: CartScreen,
			navigationOptions: { headerShown: false },
		},
		DiscountScreen: {
			screen: DiscountScreen,
			navigationOptions: { headerShown: false },
		},
	})

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
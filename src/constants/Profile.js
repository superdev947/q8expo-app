import React from "react"
import { StyleSheet } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { COLOR } from "./Color"
import { LAYOUT } from "./Layout"
const thisStyle = StyleSheet.create({
  icon: {
    marginHorizontal: LAYOUT.window.width * 0.03,
    textAlign: 'center',
    color: COLOR.whiteColor,
    fontSize: LAYOUT.window.width * 0.05
  }
})


export const Profile = [
  {
    id: "Home",
    title: "Home",
    navLink: "HomeScreen",
    role: ['Seller', 'Customer', 'Guest'],
    icon: <SimpleLineIcons name="home" style={thisStyle.icon} />,
  },
  {
    id: "Cart",
    title: "Cart",
    navLink: "CartScreen",
    role: ['Seller', 'Customer'],
    icon: <SimpleLineIcons name="basket" style={thisStyle.icon} />,
  },
  {
    id: "My Profile",
    title: "My Profile",
    navLink: "MyProfileScreen",
    role: ['Seller', 'Customer'],
    icon: <SimpleLineIcons name="user" style={thisStyle.icon} />,
  },
  {
    id: "Membership",
    title: "Membership",
    navLink: "MembershipScreen",
    role: ['Seller', 'Customer'],
    icon: <FontAwesome5 name="chess-king" style={thisStyle.icon} />,
  },
  {
    id: "Discount",
    title: "Discount",
    navLink: "DiscountScreen",
    role: ['Seller', 'Customer'],
    icon: <SimpleLineIcons name="badge" style={thisStyle.icon} />,
  },
  {
    id: "Privacy Policy",
    title: "Privacy Policy",
    navLink: "PrivacyPolicyScreen",
    role: ['Seller', 'Customer', 'Guest'],
    icon: <SimpleLineIcons name="book-open" style={thisStyle.icon} />,
  },
  {
    id: "My Offers",
    title: "My Offers",
    navLink: "MyOffersScreen",
    role: ['Seller'],
    icon: <SimpleLineIcons name="tag" style={thisStyle.icon} />,
  },
  {
    id: "LOG IN",
    title: "LOG IN",
    navLink: "LoginScreen",
    role: ['Guest'],
    icon: <SimpleLineIcons name="login" style={thisStyle.icon} />,
  },
  {
    id: "CREATE ACCOUNT",
    title: "CREATE ACCOUNT",
    navLink: "CreatAccountScreen",
    role: ['Guest'],
    icon: <SimpleLineIcons name="user" style={thisStyle.icon} />,
  },
  // {
  //   id: "Customer Support",
  //   title: "Customer Support",
  //   navLink: "CustomerSupportScreen",
  //   role:['Seller','Customer'],
  //   icon:<SimpleLineIcons name="earphones-alt" style={thisStyle.icon}/>,
  // },
  // {
  //   id: "Rate Our App",
  //   title: "Rate Our App",
  //   navLink: "RateOurAppScreen",
  //   role:['Seller','Customer'],
  //   icon: <SimpleLineIcons style={thisStyle.icon} name="star"/>,
  // },
  // {
  //   id: "Make a Suggestion",
  //   title: "Make a Suggestion",
  //   navLink: "SuggestionScreen",
  //   role:['Seller','Customer'],
  //   icon: <SimpleLineIcons style={thisStyle.icon} name="note"/>,
  // },
]


import React from "react"
import { StyleSheet } from "react-native"
import normalize from 'react-native-normalize'
import { COLOR } from "./Color"
import { LAYOUT } from "./Layout"
export * from './Color'
export * from './Layout'
export * from './Root'
export * from './Profile'
export * from './Slides'
export const LocalizationContext = React.createContext();
export const Styles = StyleSheet.create({

    authButtonText: {
        color: COLOR.whiteColor,
        fontSize: normalize(14),
        padding: normalize(5),
        textAlign: 'center',
    },

    authButton: {
        minHeight: normalize(40),
        paddingVertical: normalize(10),
        marginTop: normalize(15),
        alignItems: 'center',
        borderRadius: normalize(25),
        width: LAYOUT.window.width * 0.8,
    },

    BoxShadow: {
        backgroundColor: COLOR.whiteColor,
        shadowOffset: { width: 1, height: 3 },
        shadowColor: COLOR.greyColor,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
    TDL: {
        textDecorationLine: 'underline'
    },

    Hidden: {
        overflow: 'hidden'
    },


    //=====================================Align====================================
    Tcenter: {
        textAlign: 'center'
    },
    Tleft: {
        textAlign: 'left'
    },
    Tright: {
        textAlign: 'right'
    },
    ROW: {
        flexDirection: 'row'
    },
    Wrap: {
        flexWrap: 'wrap'
    },
    Jbetween: {
        justifyContent: 'space-between'
    },
    Jcenter: {
        justifyContent: 'center'
    },
    Jstart: {
        justifyContent: 'flex-start'
    },
    Jend: {
        justifyContent: 'flex-end'
    },
    Acenter: {
        alignItems: 'center'
    },
    Astart: {
        alignItems: 'flex-start'
    },
    Aend: {
        alignItems: 'flex-end'
    },

    PABS: {
        position: 'absolute'
    },
    //=====================================Align====================================
    //=====================================fontWeight====================================
    FW400: {
        fontWeight: '400'
    },
    FW700: {
        fontWeight: '700'
    },
    FWBold: {
        fontWeight: 'bold'
    },
    //=====================================fontWeight====================================


    //=====================================fontSize====================================
    F10: {
        fontSize: normalize(10)
    },
    F14: {
        fontSize: normalize(14)
    },
    F15: {
        fontSize: normalize(15)
    },
    F16: {
        fontSize: normalize(16)
    },
    F17: {
        fontSize: normalize(17)
    },
    F18: {
        fontSize: normalize(18)
    },
    F19: {
        fontSize: normalize(19)
    },
    F20: {
        fontSize: normalize(20)
    },
    F21: {
        fontSize: normalize(21)
    },
    F22: {
        fontSize: normalize(22)
    },
    F23: {
        fontSize: normalize(23)
    },
    F24: {
        fontSize: normalize(24)
    },
    F25: {
        fontSize: normalize(25)
    },
    F26: {
        fontSize: normalize(26)
    },
    F27: {
        fontSize: normalize(27)
    },
    F28: {
        fontSize: normalize(28)
    },
    F30: {
        fontSize: normalize(30)
    },
    F35: {
        fontSize: normalize(35)
    },
    F40: {
        fontSize: normalize(40)
    },
    F70: {
        fontSize: normalize(70)
    },
    //=====================================fontSize====================================


    //=====================================margin====================================
    M0: {
        margin: 0
    },
    M5: {
        margin: normalize(5)
    },
    M10: {
        margin: normalize(10)
    },
    M20: {
        margin: normalize(20)
    },
    M30: {
        margin: normalize(30)
    },
    M40: {
        margin: normalize(40)
    },
    M50: {
        margin: normalize(50)
    },

    MT5: {
        marginTop: normalize(5)
    },
    MT10: {
        marginTop: normalize(10)
    },
    MT15: {
        marginTop: normalize(15)
    },
    MT20: {
        marginTop: normalize(20)
    },
    MT30: {
        marginTop: normalize(30)
    },
    MT40: {
        marginTop: normalize(40)
    },
    MT50: {
        marginTop: normalize(50)
    },

    MB10: {
        marginBottom: normalize(10)
    },
    MB20: {
        marginBottom: normalize(20)
    },
    MB30: {
        marginBottom: normalize(30)
    },
    MB40: {
        marginBottom: normalize(40)
    },
    MB50: {
        marginBottom: normalize(50)
    },
    MB60: {
        marginBottom: normalize(60)
    },
    MB70: {
        marginBottom: normalize(70)
    },

    MV5: {
        marginVertical: normalize(5)
    },
    MV10: {
        marginVertical: normalize(10)
    },
    MV10: {
        marginVertical: normalize(10)
    },
    MV15: {
        marginVertical: normalize(15)
    },
    MV20: {
        marginVertical: normalize(20)
    },
    MV30: {
        marginVertical: normalize(30)
    },
    MV40: {
        marginVertical: normalize(40)
    },
    MV50: {
        marginVertical: normalize(50)
    },

    MH5: {
        marginHorizontal: normalize(5)
    },
    MH10: {
        marginHorizontal: normalize(10)
    },
    MH20: {
        marginHorizontal: normalize(20)
    },
    MH30: {
        marginHorizontal: normalize(30)
    },
    MH40: {
        marginHorizontal: normalize(40)
    },
    MH50: {
        marginHorizontal: normalize(50)
    },

    MR10: {
        marginRight: normalize(10)
    },
    MR20: {
        marginRight: normalize(20)
    },
    MR30: {
        marginRight: normalize(30)
    },
    MR40: {
        marginRight: normalize(40)
    },
    MR50: {
        marginRight: normalize(50)
    },

    ML10: {
        marginLeft: normalize(10)
    },
    ML15: {
        marginLeft: normalize(15)
    },
    ML20: {
        marginLeft: normalize(20)
    },
    ML30: {
        marginLeft: normalize(30)
    },
    ML40: {
        marginLeft: normalize(40)
    },
    ML50: {
        marginLeft: normalize(50)
    },
    //=====================================margin====================================


    //=====================================padding====================================
    P5: {
        padding: normalize(5)
    },
    P10: {
        padding: normalize(10)
    },
    P20: {
        padding: normalize(20)
    },
    P30: {
        padding: normalize(30)
    },

    PT5: {
        paddingTop: normalize(5)
    },
    PT10: {
        paddingTop: normalize(10)
    },
    PT15: {
        paddingTop: normalize(15)
    },
    PT20: {
        paddingTop: normalize(20)
    },
    PT25: {
        paddingTop: normalize(25)
    },
    PT30: {
        paddingTop: normalize(30)
    },
    PT40: {
        paddingTop: normalize(40)
    },
    PT50: {
        paddingTop: normalize(50)
    },

    PB10: {
        paddingBottom: normalize(10)
    },
    PB20: {
        paddingBottom: normalize(20)
    },
    PB30: {
        paddingBottom: normalize(30)
    },
    PB40: {
        paddingBottom: normalize(40)
    },
    PB50: {
        paddingBottom: normalize(50)
    },

    PL5: {
        paddingLeft: normalize(5)
    },
    PL10: {
        paddingLeft: normalize(10)
    },
    PL20: {
        paddingLeft: normalize(20)
    },
    PL25: {
        paddingLeft: normalize(25)
    },
    PL30: {
        paddingLeft: normalize(30)
    },

    PR10: {
        paddingRight: normalize(10)
    },
    PR20: {
        paddingRight: normalize(20)
    },
    PR50: {
        paddingRight: normalize(50)
    },

    PV5: {
        paddingVertical: normalize(5)
    },
    PV10: {
        paddingVertical: normalize(10)
    },
    PV15: {
        paddingVertical: normalize(15)
    },
    PV20: {
        paddingVertical: normalize(20)
    },

    PH5: {
        paddingHorizontal: normalize(5)
    },
    PH10: {
        paddingHorizontal: normalize(10)
    },
    PH15: {
        paddingHorizontal: normalize(15)
    },
    PH20: {
        paddingHorizontal: normalize(20)
    },
    PH30: {
        paddingHorizontal: normalize(30)
    },
    PH40: {
        paddingHorizontal: normalize(40)
    },
    PH50: {
        paddingHorizontal: normalize(50)
    },
    //=====================================padding====================================

    //=====================================height====================================
    H30: {
        height: normalize(30)
    },
    H40: {
        height: normalize(40)
    },
    H50: {
        height: normalize(50)
    },
    H55: {
        height: normalize(55)
    },
    H100: {
        height: normalize(100)
    },
    H200: {
        height: normalize(200)
    },
    H100P: {
        height: '100%'
    },
    //=====================================height====================================

    //=====================================width====================================
    W25P: {
        width: '25%'
    },
    W33P: {
        width: '33.33%'
    },
    W50P: {
        width: '50%'
    },
    W75P: {
        width: '75%'
    },
    W100P: {
        width: '100%'
    },
    //=====================================width====================================


    //=====================================color====================================
    CLW: {
        color: COLOR.whiteColor
    },
    CLGR1: {
        color: COLOR.grey1Color
    },
    CLR: {
        color: COLOR.redColor
    },
    //=====================================color====================================


    //=====================================backgroundColor====================================
    baseBackground: {
        backgroundColor: COLOR.baseBackground
    },
    //=====================================backgroundColor====================================

    //=====================================Fab====================================
    fabCover: {
        flex: 2,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    fabContainer: {
        width: normalize(50),
        height: normalize(50)
    },
    fab: {
        backgroundColor: '#5067FF',
        width: normalize(50),
        height: normalize(50)
    },
    addcartIconCover: {
        width: normalize(50),
        height: normalize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    addcartIcon: {
        fontSize: normalize(25),
        color: COLOR.whiteColor
    },
    IconBadgeStyle: {
        width: normalize(23),
        height: normalize(23),
        backgroundColor: '#FF00EE'
    },
    IconDiscountStyle: {
        width: normalize(23),
        height: normalize(23),
        backgroundColor: COLOR.greenColor,
        elevation: 5
    },
    inputIcon: {
        fontSize: normalize(22),
        color: COLOR.grey1Color
    },
    //=====================================Fab====================================
    //=====================================Header====================================
    HeaderIconLeft: {
        fontSize: LAYOUT.window.width * 0.06,
        color: COLOR.whiteColor,
    },
    HeaderIconRight: {
        fontSize: LAYOUT.window.width * 0.05,
        color: COLOR.whiteColor,
    },
    headerList: {
        height: LAYOUT.window.height * 0.07,
        width: LAYOUT.window.width,
        paddingLeft: LAYOUT.window.width * 0.04,
        borderBottomWidth: 3,
        borderBottomColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerListTitle: {
        marginLeft: LAYOUT.window.width * 0.04,
        height: LAYOUT.window.height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerListTitleText: {
        maxWidth: LAYOUT.window.width * 0.72,
        height: LAYOUT.window.height * 0.045,
        marginTop: LAYOUT.window.height * 0.025,
        color: COLOR.greyColor,
        fontSize: LAYOUT.window.width * 0.03
    },
    rightBorder: {
        width: '100%',
        height: 3,
        borderRadius: 1,
        alignItems: 'center',
    },
    filterButton: {
        width: LAYOUT.window.width * 0.2,
        alignItems: 'center',
        backgroundColor: COLOR.whiteColor,
    },
    filterIcon: {
        fontSize: LAYOUT.window.width * 0.04,
        color: COLOR.greyColor,
    },
    filterIcon1: {
        fontSize: LAYOUT.window.width * 0.04,
        color: COLOR.greenColor,
    },
    //=====================================Header====================================
    //=====================================Content====================================
    itemList: {
        marginHorizontal: LAYOUT.window.width * 0.05,
        width: LAYOUT.window.width * 0.9,
        alignItems: 'center',
    },
    //=====================================Content====================================
})
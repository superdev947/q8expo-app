import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import ToggleSwitch from 'toggle-switch-react-native'
import { COLOR, LAYOUT, LocalizationContext, Profile } from '../constants'
import { logOut } from '../redux/actions/authActions'
import { navigate } from '../redux/services/navigator'
import normalize from 'react-native-normalize'
import Flag from 'react-native-flags'

class SideMenu extends Component {
  static contextType = LocalizationContext
  render() {
    const { user, authToken } = this.props
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={COLOR.linearGradient1Color}
          style={styles.bottom}>
          <Image source={LAYOUT.icon} style={styles.logo} />
          <View style={{ width: '100%', height: LAYOUT.window.height * 0.55 }}>
            <ScrollView>
              {
                Profile.map((item, key) => (
                  <View key={key}>
                    {
                      (item.role.findIndex(data => data === (user && authToken ? user.role : 'Guest'))) > -1 ?
                        <TouchableOpacity style={styles.profileItemBox} onPress={() => navigate(item.navLink)}>
                          {item.icon}
                          <Text style={styles.profileItemText}>{this.context.t(item.title)}</Text>
                        </TouchableOpacity> : null
                    }
                  </View>
                ))
              }
            </ScrollView>
          </View>
          {user && authToken ?
            <TouchableOpacity style={styles.profileItemBox} onPress={() => this.props.logOut()}>
              <Ionicons name="ios-power" size={LAYOUT.window.width * 0.07} style={styles.logoutButtonIcon} />
              <Text style={styles.logoutButtonText}>{this.context.t('LOG OUT')}</Text>
            </TouchableOpacity>
            : null}
          <View style={[{ justifyContent: 'flex-start', width: '100%', position: 'absolute', bottom: 20, flexDirection: 'row' }]}>
            <ToggleSwitch
              isOn={this.context.locale === 'en'}
              size="medium"
              label={(this.context.locale === 'en' ? 'English' : 'Arabic')}
              labelStyle={{ color: '#fff' }}
              onColor={COLOR.inputLabelColor}
              offColor={COLOR.blueColor6}
              onToggle={() => this.context.setLocale(this.context.locale === 'en' ? 'arabic' : 'en')}
            />
            <View style={{ marginLeft: normalize(20) }}>
              {this.context.locale === 'en' ? <Flag code="US" size={32} /> : <Flag code="KW" size={32} />}
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  logo: {
    marginVertical: LAYOUT.window.height * 0.03,
    width: LAYOUT.window.width * 0.3,
    height: LAYOUT.window.width * 0.3,
    borderRadius: 120,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    width: LAYOUT.window.width * 0.7
  },
  bottom: {
    width: '100%',
    height: LAYOUT.window.height,
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: LAYOUT.window.width * 0.05,
    paddingVertical: LAYOUT.window.height * 0.04,
  },
  profileItemBox: {
    width: '100%',
    height: LAYOUT.window.height * 0.048,
    marginVertical: LAYOUT.window.height * 0.01,
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileItemText: {
    color: COLOR.whiteColor,
    fontSize: LAYOUT.window.width * 0.03
  },
  logoutButtonIcon: {
    marginHorizontal: LAYOUT.window.width * 0.04,
    textAlign: 'center',
    color: COLOR.whiteColor
  },
  logoutButtonText: {
    color: COLOR.whiteColor,
    fontSize: LAYOUT.window.width * 0.035,
  },
})

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authToken: state.appData.authToken,
})

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
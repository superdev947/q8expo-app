import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { Headers } from "../../components"
import { LAYOUT, COLOR, DEV, Styles, LocalizationContext } from "../../constants"
import { userinfoLoad } from "../../redux/actions/authActions"
import { membershipsLoad } from "../../redux/actions/membershipsActions"
import { Request } from '../../redux/services'

export class MembershipScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      img: '',
      fullname: '',
      location: '',
      membership: null,
    }
  }
  componentDidMount() {
    if (this.props.user) {
      this.initSetstate()
      this.props.userinfoLoad(this.props.user)
      this.props.membershipsLoad()
    }
  }

  componentDidUpdate(e) {
    if (e.user !== this.props.user) {
      this.initSetstate()
    }
  }

  initSetstate() {
    var { user } = this.props
    var img = { uri: DEV.IMAGE_URL + (user.img ? user.img : LAYOUT.avatar) }
    this.setState({
      id: user.id,
      img: img,
      fullname: user.fullname,
      location: user.location,
      membership: user.membership,
    })
  }

  userSave(membership) {
    this.setState({ membership })
    this.usersUpdate({ membership }, this.state.id)
  }

  usersUpdate = (req, id) => async () => {
    return await Request('put', `users/${id}`, req)
      .then(res => {
        alert(this.context.t('profile-success'))
      })
      .catch(err => console.log(err))
  }

  render() {
    const { img, fullname, location, membership } = this.state
    const { membershipsData } = this.props
    return (
      <Container>
        <Headers
          title={this.context.t('Membership')}
          screen={this.props.navigation.openDrawer}
          leftLabel={<Icon type="MaterialCommunityIcons" name="menu" style={styles.HeaderIconLeft} />}
        />
        <Content contentContainerStyle={styles.Acenter}>
          <View style={styles.profileBox}>
            {img ? <Image source={img} style={styles.avatarImage} /> : null}
            <View style={styles.profileTextBox}>
              <Text style={styles.userNameText}>{fullname}</Text>
              <Text style={styles.locationText}><Icon type="SimpleLineIcons" name="location-pin" style={styles.locationIcon} />{location}</Text>
            </View>
          </View>
          <View style={styles.membershipBox}>
            <Text style={styles.membershipBoxText}>{this.context.t('Membership Plan')}</Text>
            {
              membershipsData && membershipsData.length ? membershipsData.map((item, key) => (
                <View key={key} style={styles.membershipItem}>
                  <View style={styles.membershipItemTextBox}>
                    <Text style={styles.membershipItemTitle1}>{item.title}</Text>
                    <Text style={styles.membershipItemTitle2}>{item.desc}</Text>
                    <Text style={styles.membershipItemTitle2}>{this.context.t('days', { date: item.date })}</Text>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.radioButton} onPress={() => this.userSave(item.title)}>
                      {
                        membership === item.title ?
                          <LinearGradient colors={COLOR.linearGradient1Color} style={styles.radioButtonIcon} /> :
                          <LinearGradient colors={COLOR.linearGradient3Color} style={styles.radioButtonIconA} />
                      }
                    </TouchableOpacity>
                  </View>
                </View>
              )) : null
            }
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  membershipsData: state.memberships.membershipsData
})

const mapDispatchToProps = {
  userinfoLoad, membershipsLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipScreen)


const styles = StyleSheet.create({
  ...Styles,
  profileBox: {
    width: LAYOUT.window.width * 0.9,
    height: LAYOUT.window.height * 0.2,
    marginHorizontal: LAYOUT.window.width * 0.05,
    marginVertical: LAYOUT.window.height * 0.04,
    paddingHorizontal: LAYOUT.window.width * 0.05,
    borderRadius: LAYOUT.window.height * 0.015,
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  userNameText: {
    color: COLOR.green2Color,
    fontSize: LAYOUT.window.width * 0.045,
    fontWeight: '700'
  },
  locationText: {
    color: COLOR.grey1Color,
    fontSize: LAYOUT.window.width * 0.028,
    fontWeight: '600'
  },
  profileTextBox: {
    paddingHorizontal: LAYOUT.window.width * 0.03,
  },
  avatarImage: {
    width: LAYOUT.window.width * 0.22,
    height: LAYOUT.window.width * 0.22,
    borderRadius: LAYOUT.window.width * 0.11,
    resizeMode: 'cover'
  },
  membershipBox: {
    width: LAYOUT.window.width * 0.9,
    height: LAYOUT.window.height * 0.5,
    marginHorizontal: LAYOUT.window.width * 0.05,
    marginVertical: LAYOUT.window.height * 0.04,
  },
  membershipBoxText: {
    color: COLOR.green3Color,
    fontSize: LAYOUT.window.width * 0.04,
    marginHorizontal: LAYOUT.window.width * 0.1,
    marginBottom: LAYOUT.window.height * 0.02,
    fontWeight: '700',
  },
  membershipItem: {
    width: LAYOUT.window.width * 0.9,
    height: LAYOUT.window.height * 0.108,
    marginVertical: LAYOUT.window.height * 0.015,
    paddingHorizontal: LAYOUT.window.width * 0.05,
    borderRadius: LAYOUT.window.height * 0.015,
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: { width: 1, height: 3 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  membershipItemTextBox: {
    width: LAYOUT.window.width * 0.7,
    justifyContent: 'center',
    height: '100%',
  },
  membershipItemTitle1: {
    color: COLOR.greyColor,
    fontWeight: '700',
    fontSize: LAYOUT.window.width * 0.035,
  },
  membershipItemTitle2: {
    color: COLOR.greyColor,
    fontSize: LAYOUT.window.width * 0.018,
  },

  radioButtonIcon: {
    marginHorizontal: LAYOUT.window.width * 0.03,
    width: LAYOUT.window.width * 0.05,
    height: LAYOUT.window.width * 0.05,
    borderRadius: LAYOUT.window.width * 0.05,
  },
  radioButtonIconA: {
    marginHorizontal: LAYOUT.window.width * 0.03,
    width: LAYOUT.window.width * 0.05,
    height: LAYOUT.window.width * 0.05,
    borderRadius: LAYOUT.window.width * 0.05,
    borderRadius: LAYOUT.window.width * 0.03,
  },
  radioButton: {
    flexDirection: 'row',
    width: LAYOUT.window.width * 0.8,
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: LAYOUT.window.width * 0.03,
    color: COLOR.redColor,
  }
})
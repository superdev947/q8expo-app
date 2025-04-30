import React from 'react'
import { connect } from 'react-redux'
import normalize from 'react-native-normalize'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import { LAYOUT, COLOR, DEV, Styles, LocalizationContext } from "../../constants"
import { Headers, InputBox } from "../../components"
import { userinfoLoad } from "../../redux/actions/authActions"
import { Request } from '../../redux/services'


export class MyProfileScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      img: '',
      username: '',
      fullname: '',
      phone: '',
      location: '',
      isimg: false,
    }
    this._isMounted = false
  }

  async componentDidMount() {
    this._isMounted = true
    if (this.props.user) {
      this.initSetstate()
      this.props.userinfoLoad(this.props.user)
    }
  }

  componentDidUpdate(e) {
    if (e.user !== this.props.user) {
      this.initSetstate()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  initSetstate() {
    var { user } = this.props
    var img = { uri: DEV.IMAGE_URL + (user.img ? user.img : LAYOUT.avatar) }
    this.setState({
      id: user.id,
      img: img,
      username: user.username,
      fullname: user.fullname,
      phone: user.phone,
      location: user.location,
    })
  }

  userSave() {
    var user = this.state
    const formData = new FormData()
    formData.append('id', user.id)
    formData.append('username', user.username)
    formData.append('fullname', user.fullname)
    formData.append('phone', user.phone)
    formData.append('location', user.location)
    if (this.state.isimg) {
      formData.append('image', {
        uri: user.img.uri,
        type: "image/png",
        name: Math.random() + '.png',
      })
    }
    this.usersUpdate(formData, user.id)
  }

  usersUpdate = (req, id) => {
    Request('put', `users/${id}`, req)
      .then(res => {
        alert(this.context.t('profile-success'))
      })
      .catch(err => console.log(err))
  }

  async _pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      })
      if (!result.cancelled) {
        this.setState({ img: result, isimg: true })
      }
    }
    catch (E) {
      console.log(E)
    }
  }

  getLocation({ longitude, latitude }) {
    this.setState({ location: longitude + "," + latitude })
  }

  render() {
    const { img, username, fullname, phone, location } = this.state
    return (
      <Container style={styles.baseBackground}>
        <Headers
          title={this.context.t('My Profile')}
          screen={this.props.navigation.openDrawer}
          leftLabel={<Icon type="MaterialCommunityIcons" name="menu" style={styles.HeaderIconLeft} />}
        />
        <Content contentContainerStyle={styles.content}>
          <View style={styles.profileBox}>
            <View>
              {img ? <Image source={img} style={styles.avatarImage} /> : null}
            </View>
            <TouchableOpacity onPress={() => this._pickImage()} style={styles.iconCover}>
              <Icon type="Feather" name="edit" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <InputBox
              style={{ width: LAYOUT.window.width * 0.82 }}
              placeholder={this.context.t('User Name')}
              leftLabel={<Icon type="SimpleLineIcons" name="user" style={styles.inputIcon} />}
              onChangeText={(e) => this.setState({ username: e })}
              value={username}
            />
          </View>
          <View style={styles.box}>
            <InputBox
              style={{ width: LAYOUT.window.width * 0.82 }}
              placeholder={this.context.t('Full Name')}
              leftLabel={<Icon type="SimpleLineIcons" name="user-following" style={styles.inputIcon} />}
              onChangeText={(e) => this.setState({ fullname: e })}
              value={fullname}
            />
          </View>
          <View style={styles.box}>
            <InputBox
              style={{ width: LAYOUT.window.width * 0.82 }}
              placeholder={this.context.t('Phone')}
              leftLabel={<Icon type="SimpleLineIcons" name="phone" style={styles.inputIcon} />}
              onChangeText={(e) => this.setState({ phone: e })}
              value={phone}
            />
          </View>
          <View style={styles.box}>
            <InputBox
              style={{ width: LAYOUT.window.width * 0.82 }}
              placeholder={this.context.t('Location')}
              leftLabel={<Icon type="SimpleLineIcons" name="map" style={styles.inputIcon} />}
              onChangeText={(e) => this.setState({ location: e })}
              value={location}
            />
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => this.userSave()}>
              <LinearGradient
                start={[1, 1]}
                end={[0, 0]}
                colors={COLOR.linearGradientColor}
                style={styles.authButton}>
                <Text style={styles.authButtonText}>{this.context.t('SAVE')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  userinfoLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen)

const styles = StyleSheet.create({
  ...Styles,
  content: {
    paddingVertical: normalize(10),
    alignItems: 'center',
  },
  profileBox: {
    width: LAYOUT.window.width * 0.3,
    height: LAYOUT.window.width * 0.3,
    borderRadius: LAYOUT.window.width * 0.15,
    borderWidth: normalize(5),
    borderColor: COLOR.greenColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: LAYOUT.window.width * 0.28,
    height: LAYOUT.window.width * 0.28,
    borderRadius: LAYOUT.window.width * 0.14,
    resizeMode: 'cover'
  },
  box: {
    marginVertical: LAYOUT.window.height * 0.005
  },
  editIcon: {
    fontSize: normalize(20),
    zIndex: 10,
    elevation: 10,
    color: COLOR.greenColor
  },
  iconCover: {
    backgroundColor: COLOR.whiteColor,
    position: 'absolute',
    padding: normalize(5),
    borderRadius: normalize(20),
    bottom: normalize(5),
    right: normalize(5),
  },
})
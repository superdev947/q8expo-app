import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, Share } from 'react-native'
import { Container, Content, Fab, Icon } from 'native-base'
import ImageViewer from 'react-native-image-zoom-viewer'
import { AirbnbRating } from 'react-native-elements'
import IconBadge from 'react-native-icon-badge'
import normalize from 'react-native-normalize'
import { Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import * as Linking from 'expo-linking'
import { Video } from 'expo-av'
import { AddCart } from '../../redux/actions/cartActions'
import { navigate } from '../../redux/services/navigator'
import { LAYOUT, COLOR, Styles, LocalizationContext } from "../../constants"
import { Headers } from "../../components"

export class DetailScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    let AllData = props.navigation.state.params ? props.navigation.state.params : {}
    this.state = {
      AllData: AllData,
      files: AllData.files,
      isOpen: false,
      imagestate: false,
      imageData: []
    }
  }

  imgView() {
    var imgA = []
    for (let i in this.state.files) {
      var data = {
        url: this.state.files[i],
        props: {}
      }
      imgA.push(data)
    }
    this.setState({ imageData: imgA, imagestate: !this.state.imagestate })
  }


  onShare = async () => {
    try {
      const result = await Share.share({
        title: this.state.AllData.title,
        url: this.state.AllData.link,
      })
      console.log(result)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {

        } else {

        }
      } else if (result.action === Share.dismissedAction) {

      }
    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    const { price, img, title, brand, details, rating, brandimg, operation_time, link } = this.state.AllData
    const isImage = img.indexOf('.mp4') > -1 || img.indexOf('.avi') > -1 ? false : true
    const { cartData, authToken } = this.props
    return (
      <Container>
        <Modal visible={this.state.imagestate} transparent={true} animationType="slide">
          <ImageViewer imageUrls={this.state.imageData} />
          <TouchableOpacity onPress={() => this.setState({ imagestate: !this.state.imagestate })} style={{ position: 'absolute', right: 20, top: 20 }}>
            <Ionicons name="ios-close-circle" size={30} color="white" />
          </TouchableOpacity>
        </Modal>
        <Headers
          title={this.context.t('Offer Details')}
          screen={() => this.props.navigation.goBack()}
          leftLabel={<Ionicons name="ios-arrow-back" style={styles.HeaderIconLeft} />}
        />
        <View style={styles.headerList}>
          <View style={styles.headerListTitle}>
            <Text style={styles.headerListTitleText}>{title}</Text>
            <LinearGradient
              start={[1, 1]}
              end={[0, 0]}
              colors={COLOR.linearGradientColor}
              style={styles.rightBorder}>
            </LinearGradient>
          </View>
          <View style={styles.Aend}>
            <TouchableOpacity style={styles.filterButton} onPress={() => this.onShare()}>
              <Fontisto name="share" style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Content contentContainerStyle={[styles.itemList, styles.PV15]} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.imageBox} onPress={() => this.imgView()}>
            {
              isImage ?
                <Image source={{ uri: img }} style={[styles.image, { resizeMode: 'contain' }]} /> :
                <Video
                  source={{ uri: img }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={styles.image}
                />
            }
          </TouchableOpacity>
          <View style={styles.markReviewBox}>
            <View style={styles.markBox}>
              <Image source={{ uri: brandimg }} style={styles.brandimg} />
            </View>
            <AirbnbRating
              showRating={false}
              defaultRating={rating}
              size={LAYOUT.window.width * 0.04}
            />
          </View>
          <View style={styles.textBox}>
            <Text style={[styles.itemTitle, styles.MT10]}>{this.context.t('title: ', { title: title })}</Text>
            <Text style={[styles.itemText, styles.MT10]}>{this.context.t('brand: ', { brand: brand })}</Text>
            <Text style={[styles.itemDesc, styles.MT10]}>{this.context.t('details: ', { details: details })}</Text>

            {
              link != 'null' && (
                <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.MT10}>
                  <Text style={[styles.itemDesc, { color: COLOR.blueColor }]}>{this.context.t('link: ', { link: link })}</Text>
                </TouchableOpacity>
              )
            }
            <View style={[styles.timeBox, styles.MT10]}>
              <View style={styles.ROW}>
                <Text style={styles.itemDesc}>{this.context.t('Service time: ', { operation_time: operation_time })} </Text>
              </View>
              <TouchableOpacity style={styles.pathBox} onPress={() => navigate('LocationScreen', this.state.AllData)}>
                <Image source={LAYOUT.path} style={styles.pathImage} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.itemDesc, { color: COLOR.blueColor }, styles.F20, styles.MV10]}>{price} KWD</Text>
          </View>
          {
            authToken ? (
              <TouchableOpacity onPress={() => this.props.AddCart(this.state.AllData)}>
                <LinearGradient
                  start={[1, 1]}
                  end={[0, 0]}
                  colors={COLOR.linearGradientColor}
                  style={[styles.authButton, styles.ROW, styles.Jcenter]}
                >
                  {
                    cartData.find(e => e.cart.id == this.state.AllData.id) ?
                      <>
                        <MaterialCommunityIcons name="cart-remove" style={styles.addcartIcon1} />
                        <Text style={styles.authButtonText}> {this.context.t('Remove Cart')}</Text>
                      </>
                      :
                      <>
                        <MaterialCommunityIcons name="cart-plus" style={styles.addcartIcon1} />
                        <Text style={styles.authButtonText}> {this.context.t('Add Cart')}</Text>
                      </>
                  }
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigate("LoginScreen")}>
                <LinearGradient
                  start={[1, 1]}
                  end={[0, 0]}
                  colors={COLOR.linearGradientColor}
                  style={[styles.authButton, styles.ROW, styles.Jcenter]}
                >
                  <TouchableOpacity>
                    <Text style={[styles.authButtonText]}> {this.context.t('LOG IN')} </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            )
          }

        </Content>
        <View style={styles.fabCover}>
          {
            authToken && (
              <Fab
                active={false}
                containerStyle={styles.fabContainer}
                style={styles.fab}
                position="bottomRight"
                onPress={() => navigate('CartScreen')}
              >
                <IconBadge
                  MainElement={
                    <View style={styles.addcartIconCover}>
                      <Icon type='AntDesign' name="shoppingcart" style={styles.addcartIcon} />
                    </View>
                  }
                  BadgeElement={<Text style={[styles.F10, styles.CLW]}>{cartData.length}</Text>}
                  IconBadgeStyle={styles.IconBadgeStyle}
                  Hidden={cartData.length == 0}
                />
              </Fab>
            )
          }
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  authToken: state.appData.authToken,
  cartData: state.cart.cartData,
  user: state.auth.user
})

const mapDispatchToProps = {
  AddCart
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)

const styles = StyleSheet.create({
  ...Styles,
  getOfferButton: {
    width: LAYOUT.window.width * 0.8,
    padding: LAYOUT.window.width * 0.05,
    marginTop: LAYOUT.window.height * 0.02,
    borderRadius: LAYOUT.window.width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  getOfferButtonText1: {
    fontSize: LAYOUT.window.width * 0.04,
    color: COLOR.whiteColor,
    fontWeight: '700',
  },
  getOfferButtonText2: {
    fontSize: LAYOUT.window.width * 0.02,
    color: COLOR.whiteColor,
  },
  addcartIcon1: {
    color: COLOR.whiteColor,
    fontSize: normalize(20)
  },
  imageBox: {
    marginTop: LAYOUT.window.height * 0.02,
    width: LAYOUT.window.width * 0.9,
    borderRadius: LAYOUT.window.width * 0.05,
    height: LAYOUT.window.width * 0.37,
  },
  image: {
    width: LAYOUT.window.width * 0.9,
    height: LAYOUT.window.width * 0.37,
  },
  brandimg: {
    width: LAYOUT.window.width * 0.2,
    height: LAYOUT.window.width * 0.08,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: LAYOUT.window.width * 0.045,
    color: COLOR.greyColor,
    fontWeight: '700',
  },
  itemText: {
    marginTop: 5,
    fontSize: LAYOUT.window.width * 0.035,
    fontWeight: '600',
    color: COLOR.greyColor
  },
  itemDesc: {
    fontSize: LAYOUT.window.width * 0.03,
    fontWeight: '600',
    color: COLOR.greyColor
  },
  pathImage: {
    resizeMode: 'contain',
    alignItems: 'center',
    width: LAYOUT.window.width * 0.05,
    height: LAYOUT.window.width * 0.05,
  },
  markReviewBox: {
    width: '100%',
    height: LAYOUT.window.height * 0.06,
    marginVertical: LAYOUT.window.height * 0.01,
    paddingHorizontal: LAYOUT.window.width * 0.03,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  markBox: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBox: {
    width: '100%',
    paddingHorizontal: LAYOUT.window.width * 0.03,
    overflow: 'hidden'
  },
  timeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemMarkC: {
    top: LAYOUT.window.width * 0.025,
    right: LAYOUT.window.width * 0.025,
    position: 'absolute',
    width: LAYOUT.window.width * 0.1,
    borderRadius: LAYOUT.window.width * 0.07,
    height: LAYOUT.window.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemPercentC: {
    color: COLOR.whiteColor,
    fontSize: LAYOUT.window.width * 0.03,
    fontWeight: '700'
  },
  typeC: {
    color: COLOR.whiteColor,
    fontSize: LAYOUT.window.width * 0.02
  },


  qrcodeImage: {
    width: LAYOUT.window.width * 0.17,
    height: LAYOUT.window.width * 0.17,
    resizeMode: 'cover'
  },



  modal: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  bottom: {
    width: '100%',
    height: LAYOUT.window.height * 0.6,
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
    bottom: 0,
    borderTopLeftRadius: LAYOUT.window.height * 0.04,
    borderTopRightRadius: LAYOUT.window.height * 0.04,
    alignItems: 'center'
  },
  modalClose: {
    backgroundColor: COLOR.blue1Color,
    height: '100%',
    width: '100%'
  },
  modalTitle: {
    color: COLOR.whiteColor,
    fontSize: LAYOUT.window.width * 0.045,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: LAYOUT.window.height * 0.09,
    marginBottom: LAYOUT.window.height * 0.05,
  },
  modalNumberText: {
    color: COLOR.whiteColor,
    fontSize: LAYOUT.window.width * 0.04,
    fontWeight: '500',
    marginTop: LAYOUT.window.height * 0.015,
  },
  modalDescText: {
    color: COLOR.whiteColor,
    fontSize: LAYOUT.window.width * 0.025,
    fontWeight: '500',
    marginTop: LAYOUT.window.height * 0.03,
    marginHorizontal: LAYOUT.window.height * 0.05
  },
  qrcode1Image: {
    width: LAYOUT.window.width * 0.26,
    height: LAYOUT.window.width * 0.26,
    resizeMode: 'cover'
  },
})
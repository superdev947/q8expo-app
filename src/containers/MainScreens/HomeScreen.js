import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Container, Content, Fab, Icon } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import IconBadge from 'react-native-icon-badge'
import { LAYOUT, COLOR, Styles, LocalizationContext } from "../../constants"
import { SListItem, Headers } from '../../components'
import { navigate, setNavigator } from '../../redux/services/navigator'
import { shopsLoad } from '../../redux/actions/shopsActions'
import { qrcodesLoad } from '../../redux/actions/qrcodesActions'

export class HomeScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    this.state = {
    }
    setNavigator(props.navigation)
  }

  componentDidMount() {
    this.props.shopsLoad()
    this.props.qrcodesLoad()
  }

  render() {
    const { cartData, authToken, shops } = this.props
    return (
      <Container>
        <Headers
          title={this.context.t('Home')}
          screen={this.props.navigation.openDrawer}
          leftLabel={<Icon type="MaterialCommunityIcons" name="menu" style={styles.HeaderIconLeft} />}
          rightLabel={!authToken && (
            <TouchableOpacity onPress={() => navigate('LoginScreen')}>
              <Icon type="SimpleLineIcons" name="login" style={styles.HeaderIconRight} />
            </TouchableOpacity>
          )}
        />
        <View style={[styles.itemList]}>
          <TouchableOpacity onPress={() => navigate('OffersScreen', { id: 'last', title: this.context.t('Latest') })}>
            <LinearGradient
              start={[1, 1]}
              end={[0, 0]}
              colors={COLOR.linearGradientColor}
              style={styles.Button}>
              <Text style={styles.ButtonText}>{this.context.t('Latest Offers')}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('OffersScreen', { id: 'featured', title: this.context.t('Featured') })}>
            <LinearGradient
              start={[1, 1]}
              end={[0, 0]}
              colors={COLOR.linearGradientColor}
              style={styles.Button}>
              <Text style={styles.ButtonText}>{this.context.t('Featured Offers')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Content contentContainerStyle={styles.itemList} showsVerticalScrollIndicator={false}>
          {shops.map((item, key) =>
            <SListItem item={item} type={1} key={key} />
          )}
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
  shops: state.shops.shopsData,
})

const mapDispatchToProps = {
  shopsLoad, qrcodesLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


const styles = StyleSheet.create({
  ...Styles,
  itemList: {
    marginHorizontal: LAYOUT.window.width * 0.03,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  Button: {
    padding: LAYOUT.window.width * 0.035,
    alignItems: 'center',
    borderRadius: LAYOUT.window.width * 0.055,
    width: LAYOUT.window.width * 0.41,
    margin: LAYOUT.window.width * 0.02,
  },
  ButtonText: {
    color: COLOR.whiteColor,
    fontSize: LAYOUT.fontSize1,
    textAlign: 'center',
  },
})
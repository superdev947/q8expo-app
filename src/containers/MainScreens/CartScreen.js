import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import NumericInput from 'react-native-numeric-input'
import { LinearGradient } from 'expo-linear-gradient'
import normalize from 'react-native-normalize'
import { Headers } from '../../components'
import { LAYOUT, COLOR, Styles, LocalizationContext } from "../../constants"
import { Checkout, AddCart, SetCount } from '../../redux/actions/cartActions'
import { Alert } from 'react-native'
import { Request } from '../../redux/services'

export class CartScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    for (const key in this.props.cartData) {
      this.setState({ [this.props.cartData[key].cart.id]: 1 })
    }
  }


  Checkout() {
    let CheckoutData = []
    for (const key in this.props.cartData) {
      let { cart, discount } = this.props.cartData[key]
      const count = this.props.counts[cart.id]
      CheckoutData.push({ productId: cart.id, count: (count ? count : 1), discountId: discount.discountId })
    }
    const totalAmount = this.props.cartData.reduce((a, { cart, discount }) => {
      const count = this.props.counts[cart.id]
      let percent = parseFloat(discount.discount != undefined ? discount.discount : 0)
      return (a + (cart.price - cart.price * (percent ? percent : 1) / 100) * (count ? count : 1))
    }, 0)
    Request('post', "carts/checkout", { CheckoutData, totalAmount })
      .then(async (res) => {
        if (res.status) {
          this.props.Checkout()
          if (res.code) {
            alert(this.context.t('checkout-message-1', { percent: res.data }))
          } else {
            alert(this.context.t('checkout-message-2'))
          }
        } else {
          alert(res.message)
        }
      })
  }

  removeCart = (cart) => {
    Alert.alert(
      this.context.t("Alert"),
      this.context.t("remove-alert"),
      [
        {
          text: this.context.t('Deny'),
          onPress: () => { },
          style: "cancel"
        },
        {
          text: this.context.t('Allow'),
          onPress: () => this.remove(cart)
        }
      ]
    )
  }

  remove(cart) {
    this.props.AddCart(cart)
    delete this.props.counts[cart.id]
  }

  setCount(cart, count) {
    this.props.SetCount({ ...this.props.counts, [cart]: count })
  }

  render() {
    const { cartData } = this.props
    const totalAmount = this.props.cartData.reduce((a, { cart, discount }) => {
      const count = this.props.counts[cart.id]
      let percent = parseFloat(discount.discount != undefined ? discount.discount : 0)
      return (a + (cart.price - cart.price * (percent ? percent : 1) / 100) * (count ? count : 1))
    }, 0)
    return (
      <Container>
        <Headers
          title={this.context.t("Cart")}
          screen={this.props.navigation.openDrawer}
          leftLabel={<Icon type="MaterialCommunityIcons" name="menu" style={styles.HeaderIconLeft} />}
        />
        <Content contentContainerStyle={[styles.PH20, styles.Acenter]}>
          <View style={{ minHeight: LAYOUT.window.height * 0.7 }}>
            {
              cartData.length ? cartData.map((data, key) => {
                let { cart, discount } = data
                let count = this.props.counts[cart.id]
                let percent = parseFloat(discount.discount != undefined ? discount.discount : 0)
                let price = (cart.price - cart.price * (percent ? percent : 1) / 100) * (count ? count : 1)
                return (
                  <View key={key} style={styles.item}>
                    <Image source={{ uri: cart.img }} style={styles.cartItemImg} />
                    <View style={styles.cartCover}>
                      <View style={[styles.ROW, styles.Jbetween]}>
                        <View>
                          <Text numberOfLines={1} style={styles.title}>{cart.title}</Text>
                          <Text numberOfLines={1} style={styles.brand}>{cart.brand}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.removeCart(cart)}>
                          <Icon type="FontAwesome" name="trash-o" style={styles.removeIcon} />
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.ROW, styles.Jbetween, styles.Aend]}>
                        <View style={[styles.MT10, styles.PH10]}>
                          <NumericInput minValue={1} initValue={count ? count : 1} value={count} onChange={e => this.setCount(cart.id, e)} />
                        </View>
                        <Text numberOfLines={1} style={styles.title}>{`$${price.toFixed(2)}`}</Text>
                      </View>
                    </View>
                  </View>
                )
              }) : null
            }
          </View>
          {
            cartData.length ?
              <View style={[styles.Jbetween, styles.ROW, { width: '100%' }]}>
                <Text numberOfLines={1} style={styles.title}>{this.context.t("Total")}</Text>
                <View style={styles.ROW}>
                  <Text numberOfLines={1} style={[styles.title, styles.F24]}>{`$${totalAmount.toFixed(2)}`}</Text>
                </View>
              </View> : null
          }
        </Content>
        <View style={[styles.Acenter, styles.MB20]}>
          {
            cartData.length ?
              <TouchableOpacity onPress={() => this.Checkout()}>
                <LinearGradient
                  start={[1, 1]}
                  end={[0, 0]}
                  colors={COLOR.linearGradientColor}
                  style={styles.authButton}>
                  <Text style={styles.authButtonText}>{this.context.t("Go to Checkout")}</Text>
                </LinearGradient>
              </TouchableOpacity> : null
          }
        </View>
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({
  cartData: state.cart.cartData,
  counts: state.cart.counts,
})

const mapDispatchToProps = {
  Checkout, AddCart, SetCount
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)


const styles = StyleSheet.create({
  ...Styles,
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(25),
  },
  cartItemImg: {
    padding: normalize(10),
    width: LAYOUT.window.width * 0.25,
    height: LAYOUT.window.width * 0.25,
    resizeMode: 'contain',
  },
  cartCover: {
    width: LAYOUT.window.width * 0.6,
    paddingHorizontal: normalize(10),
  },
  removeIcon: {
    color: COLOR.grey2Color,
    fontSize: normalize(24)
  },
  title: {
    color: COLOR.blackColor,
    fontSize: normalize(18),
    fontWeight: '700',
  },
  brand: {
    color: COLOR.grey2Color,
    fontSize: normalize(16),
    fontWeight: '400',
  },
})

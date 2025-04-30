import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import normalize from 'react-native-normalize'
import IconBadge from 'react-native-icon-badge'
import QRCode from 'react-native-qrcode-svg'
import { LAYOUT, COLOR, Styles, LocalizationContext } from "../../constants"
import { Headers } from '../../components'
import { discountsLoad, discountUse } from '../../redux/actions/discountsActions'
import { navigate } from '../../redux/services/navigator'

const width = LAYOUT.window.width - normalize(40)

export class DiscountScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.discountsLoad()
  }

  onUse(item) {
    navigate('OffersScreen', { shop: item.shop, id: item.category })
    this.props.discountUse(item)
  }

  render() {
    const { discountsData, user } = this.props
    return (
      <Container style={styles.baseBackground}>
        <Headers
          title={this.context.t("Discount")}
          screen={this.props.navigation.openDrawer}
          leftLabel={<Icon type="MaterialCommunityIcons" name="menu" style={styles.HeaderIconLeft} />}
        />
        <Content contentContainerStyle={[styles.Acenter, styles.PH30, styles.PV10]}>
          {
            discountsData.length ? discountsData.map((item, key) => (
              <IconBadge
                key={key}
                MainElement={
                  <View style={[styles.item]}>
                    <QRCode
                      value={`${JSON.stringify({ discountId: item.discountId, userId: user.id, type: 'qexpoQrcode' })}`}
                      logo={require('../../assets/icon.png')}
                      logoSize={normalize(30)}
                      size={width * .3}
                      logoBackgroundColor='transparent'
                    />
                    <View style={styles.descCover}>
                      <Text>{item.desc}</Text>
                      <View style={[styles.ROW, styles.Jbetween]}>
                        <Text>{this.context.t('Count')}: {item.count}</Text>
                        <View>
                          <TouchableOpacity style={styles.PL10} onPress={() => this.onUse(item)}>
                            <Icon type='SimpleLineIcons' name="basket" style={styles.filterIcon} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                }
                IconBadgeStyle={styles.IconDiscountStyle}
                BadgeElement={<Text style={[styles.F10, styles.CLW]}>{item.discount}%</Text>}
                Hidden={item.discount == 0}
              />
            )) : null
          }
        </Content>
      </Container>
    )
  }
}


const mapStateToProps = (state) => ({
  discountsData: state.discounts.discountsData,
  user: state.auth.user,
})

const mapDispatchToProps = {
  discountsLoad, discountUse
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountScreen)


const styles = StyleSheet.create({
  ...Styles,
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR.whiteColor,
    marginVertical: normalize(10),
    marginHorizontal: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(8),
    width: '100%',
    ...Styles.BoxShadow,
  },
  descCover: {
    width: width * .7,
    padding: normalize(5),
    paddingLeft: normalize(10),
    justifyContent: 'space-between'
  }
})

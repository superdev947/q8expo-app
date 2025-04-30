import React from 'react'
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, PixelRatio } from 'react-native'
import { Container, Content, Picker } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons'
import { LAYOUT, COLOR, DEV, Styles, LocalizationContext } from "../../constants"
import { OfferListItem, Headers } from '../../components'
import { connect } from 'react-redux'
import { brandsLoad } from "../../redux/actions/brandsActions"
import { productsLoad, productsDelete } from "../../redux/actions/productsActions"
import { navigate } from '../../redux/services/navigator'
import normalize from 'react-native-normalize'

export class OffersScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,

      brand: 'All',
      Brands: null,
      productsData: null,

      brand1: 'All',
      rating: null,
      sort: true,
    }
  }

  componentDidMount() {
    this.props.brandsLoad()
    this.props.productsLoad('MyOffers')
  }

  async componentDidUpdate(e) {
    if (e.brandsData !== this.props.brandsData) {
      var Brands = this.props.brandsData
      var BrandsData = [
        { label: `Brand (${Brands[0] != undefined ? Brands[0].title + ',' : ''} ${Brands[1] != undefined ? Brands[1].title + ',' : ''} etc)`, value: 'All' },
      ]
      for (let i in Brands) {
        BrandsData.push({
          value: Brands[i].id,
          label: Brands[i].title,
          img: DEV.IMAGE_URL + Brands[i].img,
        })
      }
      this.setState({ Brands: BrandsData })
    }
    if (e.productsData !== this.props.productsData) {
      this.setState({ productsData: this.props.productsData })
    }
  }

  filter(brand) {
    var productsData = this.props.productsData ? this.props.productsData : []
    if (brand === 'All') {
      this.setState({ productsData: productsData })
    } else {
      let data = productsData.filter(data => parseInt(data.brand) === parseInt(brand))
      this.setState({ productsData: data })
    }
    this.setState({ brand: brand })
  }

  filterSort() {
    const productsData = this.props.productsData ? this.props.productsData : []
    const { brand1, sort, rating } = this.state
    let filterData = []
    if (rating != null) {
      filterData = productsData.filter(e => e.rating === rating)
    } else {
      filterData = productsData
    }
    if (sort) {
      filterData = filterData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else {
      filterData = filterData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }
    if (brand1 === 'All') {
      this.setState({ productsData: filterData })
    } else {
      let data = filterData.filter(data => parseInt(data.brand) === parseInt(brand1))
      this.setState({ productsData: data })
    }
    this.setState({ isOpen: !this.state.isOpen })
  }


  isOpen() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  reLoad() {
    const productsData = this.props.productsData ? this.props.productsData : []
    this.setState({ brand1: 'All', brand: 'All', rating: null, sort: true, productsData })
  }

  render() {
    const { brand, Brands, productsData, brand1, sort, rating } = this.state
    return (
      <Container>
        <Headers
          screen={() => this.props.navigation.goBack()}
          title={this.context.t(`MyOffers`)}
          leftLabel={<Ionicons name="ios-arrow-back" size={LAYOUT.window.width * 0.06} color={COLOR.whiteColor} />}
        />
        <View style={styles.headerList}>
          <Picker style={[styles.picker]}
            mode='dropdown'
            itemStyle={styles.pickerItem}
            selectedValue={brand}
            onValueChange={(e) => this.filter(e)}
          >
            {Brands ? Brands.map((item, key) => (
              <Picker.Item key={key} color={COLOR.grey2Color} label={item.label} value={item.value} />
            )) : null}
          </Picker>
          <LinearGradient
            start={[1, 1]}
            end={[0, 0]}
            colors={COLOR.linearGradientColor}
            style={styles.rightBorder}>
          </LinearGradient>
          <LinearGradient
            start={[1, 1]}
            end={[0, 0]}
            colors={COLOR.linearGradientColor}
            style={styles.rightBorder}>
          </LinearGradient>
          <View style={styles.filterButton}>
            <TouchableOpacity onPress={() => this.isOpen()}>
              <FontAwesome5 name="sliders-h" size={LAYOUT.window.width * 0.04} color={COLOR.greenColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.reLoad()}>
              <FontAwesome5 name="redo-alt" size={LAYOUT.window.width * 0.04} color={COLOR.greenColor} />
            </TouchableOpacity>
          </View>
        </View>
        <Content>
          {
            productsData && Brands ? productsData.map((item, key) => (
              <OfferListItem role={'Seller'} productsDelete={(e) => this.props.productsDelete(e)} item={item} key={key} Brands={Brands} />
            )) : null
          }
        </Content>
        <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 10 }} onPress={() => navigate('CreateScreen')}>
          <LinearGradient
            start={[1, 1]}
            end={[0, 0]}
            colors={COLOR.linearGradientColor}
            style={styles.authButton}>
            <Text style={styles.authButtonText}>{this.context.t(`Post new Offer`)}</Text>
          </LinearGradient>
        </TouchableOpacity>
        {this.state.isOpen ?
          <View style={styles.modal}>
            <TouchableOpacity onPress={() => this.setState({ isOpen: !this.state.isOpen })} style={styles.modalClose}></TouchableOpacity>
            <LinearGradient
              colors={COLOR.linearGradient1Color}
              style={styles.bottom}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalTitleText}>{this.context.t(`Filter`)}</Text>
              </View>
              <View style={styles.filterBox}>
                <View style={styles.pickerBoxB}>
                  <Picker
                    mode='dropdown'
                    selectedValue={brand1}
                    style={[styles.pickerB]}
                    itemStyle={styles.pickerItemB}
                    onValueChange={(e) => this.setState({ brand1: e })}
                  >
                    {Brands ? Brands.map((item, key) => (
                      <Picker.Item key={key} color={COLOR.grey2Color} label={item.label} value={item.value} />
                    )) : null}
                  </Picker>
                </View>
                <View style={styles.pickerBoxB}>
                  <Picker
                    mode='dropdown'
                    selectedValue={rating}
                    style={[styles.pickerB]}
                    itemStyle={styles.pickerItemB}
                    onValueChange={(e) => this.setState({ rating: e })}
                  >
                    {LAYOUT.Ratings.map((item, key) => (
                      <Picker.Item key={key} color={COLOR.grey2Color} label={item.label} value={item.value} />
                    ))}
                  </Picker>
                </View>
                <View style={[styles.pickerBoxB]}>
                  <Picker
                    mode='dropdown'
                    selectedValue={sort}
                    style={[styles.pickerB]}
                    itemStyle={styles.pickerItemB}
                    onValueChange={(e) => this.setState({ sort: e })}
                  >
                    <Picker.Item color={COLOR.grey2Color} label={this.context.t('price ascending')} value={true} />
                    <Picker.Item color={COLOR.grey2Color} label={this.context.t('price descending')} value={false} />
                  </Picker>
                </View>
              </View>
              <View style={styles.filterButtonBox}>
                <TouchableOpacity style={styles.applyFilterButton} onPress={() => this.filterSort()}>
                  <Text style={styles.applyFilterButtonText}>{this.context.t(`Apply Filters`)}</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View> : null}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  brandsData: state.brands.brandsData,
  productsData: state.products.productsData,
  user: state.auth.user,
})

const mapDispatchToProps = {
  brandsLoad, productsLoad, productsDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersScreen)

const styles = StyleSheet.create({
  ...Styles,
  headerList: {
    height: LAYOUT.window.height * 0.07,
    width: LAYOUT.window.width,
    paddingLeft: LAYOUT.window.width * 0.04,
    borderBottomWidth: 3,
    borderBottomColor: '#F2F2F2',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: {
    width: LAYOUT.window.width * 0.55,
    minHeight: normalize(50)
  },
  pickerItem: {
    color: COLOR.whiteColor
  },
  rightBorder: {
    width: LAYOUT.window.width * 0.005,
    height: LAYOUT.window.height * 0.04,
    borderRadius: 1,
    alignItems: 'center',
  },
  filterButton: {
    width: LAYOUT.window.width * 0.4,
    alignItems: 'center',
    backgroundColor: COLOR.whiteColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: LAYOUT.window.width * 0.1,
  },

  modal: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  bottom: {
    width: '100%',
    height: LAYOUT.window.height * 0.55,
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    borderTopLeftRadius: LAYOUT.window.width * 0.05,
    borderTopRightRadius: LAYOUT.window.width * 0.05,
    alignItems: 'center'
  },
  modalClose: {
    backgroundColor: COLOR.blue1Color,
    height: '100%',
    width: '100%'
  },
  modalTitle: {
    width: '100%',
    height: LAYOUT.window.height * 0.07,
    borderTopLeftRadius: LAYOUT.window.width * 0.05,
    borderTopRightRadius: LAYOUT.window.width * 0.05,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLOR.grey4Color,
  },
  modalTitleText: {
    textAlign: 'center',
    color: COLOR.whiteColor,
    fontSize: LAYOUT.fontSize4,
    fontWeight: '600'
  },
  filterBox: {
    width: '100%',
    paddingHorizontal: LAYOUT.window.width * 0.08,
  },
  pickerBoxB: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.whiteColor,
    marginVertical: LAYOUT.window.height * 0.02,
    borderRadius: 10 / PixelRatio.get(),
    paddingHorizontal: LAYOUT.window.width * 0.02,

    shadowOffset: { width: 1, height: 3 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerB: {
    width: LAYOUT.window.width * 0.82,
    minHeight: normalize(50)
  },
  pickerItemB: {
    height: normalize(55),
    color: COLOR.whiteColor
  },
  filterButtonBox: {
    width: '100%',
    paddingHorizontal: LAYOUT.window.width * 0.08,
  },
  applyFilterButton: {
    padding: LAYOUT.window.width * 0.034,
    alignItems: 'center',
    borderRadius: LAYOUT.window.width * 0.055,
    width: LAYOUT.window.width * 0.8,
    margin: LAYOUT.window.width * 0.024,
    backgroundColor: COLOR.whiteColor
  },
  applyFilterButtonText: {
    color: COLOR.blue2Color,
    fontSize: LAYOUT.fontSize1,
    textAlign: 'center',
    fontWeight: '700'
  },
})
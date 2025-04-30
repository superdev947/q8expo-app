import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Modal, PixelRatio } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Container, Content, Picker, Icon } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import { Video } from 'expo-av'
import { LAYOUT, COLOR, Styles, LocalizationContext } from "../../constants"
import { InputBox, Headers, TextArea } from '../../components'
import { brandsLoad } from "../../redux/actions/brandsActions"
import { categoriesLoad } from "../../redux/actions/categoriesActions"
import { shopsLoad } from "../../redux/actions/shopsActions"
import { productsCreate, productsUpdate } from "../../redux/actions/productsActions"
import normalize from 'react-native-normalize'

export class CreateScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    var { id, title, price, status, rating, link, featured, shop, category, brand, location, operation_time, details, files } = props.navigation.state.params.item ? props.navigation.state.params.item : []
    this.state = {
      id: id,
      title: title,
      location: location,
      operation_time: operation_time,
      details: details,
      status: status,
      price: price ? price : 0,
      files: files ? files : null,
      filess: null,
      AllData: props.navigation.state.params,

      shop: shop,
      category: category,
      brand: brand,
      featured: featured != null ? featured : false,
      link: link != null ? link : false,
      rating: rating != null ? rating : false,


      Shops: [],
      Categories: [],
      Brands: [],

      file: [],
      isfile: false,

      mapstate: false,
      region: {
        latitude: LAYOUT.LATITUDE,
        longitude: LAYOUT.LONGITUDE,
        latitudeDelta: LAYOUT.LATITUDE_DELTA,
        longitudeDelta: LAYOUT.LONGITUDE_DELTA,
      }
    }
  }

  async componentDidMount() {
    this.props.brandsLoad()
    this.props.shopsLoad({})

    const success = async ({ coords }) => {
      const { latitude, longitude } = coords
      await this.setState({
        region: {
          latitude,
          longitude,
          latitudeDelta: LAYOUT.LATITUDE_DELTA,
          longitudeDelta: LAYOUT.LONGITUDE_DELTA,
        }
      })
    }
    const error = async (err) => {
      await console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    await navigator.geolocation.watchPosition(success, error, LAYOUT.options)
    await navigator.geolocation.getCurrentPosition(success, error, LAYOUT.options)
  }

  async componentDidUpdate(Prevprops, PrevState) {
    if (Prevprops.brandsData !== this.props.brandsData) {
      var Brands = this.props.brandsData
      var BrandsData = []
      for (let i in Brands) {
        BrandsData.push({
          value: Brands[i].id,
          label: Brands[i].title,
        })
      }
      this.setState({
        Brands: BrandsData,
        brand: BrandsData[0].value
      })
    }

    if (Prevprops.shopsData !== this.props.shopsData) {
      var Shops = []
      let permission = this.props.user.permission
      for (const key in permission) {
        if (permission[key].type === "shop") {
          let data = this.props.shopsData.find(e => e.id.toString() === permission[key].permission.toString())
          if (data) { Shops.push(data) }
        }
      }
      var ShopsData = []
      for (let i in Shops) {
        ShopsData.push({ value: Shops[i].id, label: Shops[i].title, img: Shops[i].img })
      }
      let shop = ShopsData.length && ShopsData[0].value ? ShopsData[0].value : 0
      this.setState({ Shops: ShopsData, shop: shop })
      this.props.categoriesLoad(shop)
    }

    if (Prevprops.categoriesData !== this.props.categoriesData) {
      var Categories = []
      let permission = this.props.user.permission
      for (const key in permission) {
        if (permission[key].type === "category") {
          let data = this.props.categoriesData.find(e => e.id.toString() === permission[key].permission.toString())
          if (data) { Categories.push(data) }
        }
      }
      var CategoriesData = []
      for (let i in Categories) {
        CategoriesData.push({
          value: Categories[i].id,
          label: Categories[i].title,
          shop: Categories[i].shop,
        })
      }
      this.setState({
        Categories: CategoriesData,
        category: CategoriesData.length ? CategoriesData[0].value : 0
      })
    }

    if (PrevState.shop !== this.state.shop) {
      this.props.categoriesLoad(this.state.shop)
    }
  }

  async _pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      })
      if (!result.cancelled) {

        if (!this.state.filess) {
          this.setState({ isfile: true, filess: [result] })
        } else {
          this.setState(prevState => ({
            isfile: true,
            filess: [...prevState.filess, result],
          }))
        }
        if (!this.state.files) {
          this.setState({ files: [result] })
        } else {
          this.setState(prevState => ({
            files: [...prevState.files, result],
          }))
        }
      }
    }
    catch (E) {
      console.log(E)
    }
  }

  onPublish = () => {
    if (
      this.state.title &&
      this.state.category &&
      this.state.operation_time &&
      this.state.details &&
      this.state.location &&
      this.state.brand &&
      this.state.price &&
      this.state.featured &&
      this.state.link &&
      this.state.rating &&
      this.state.filess &&
      this.state.isfile) {
      const formData = new FormData()
      formData.append('title', this.state.title)
      formData.append('category', this.state.category)
      formData.append('seller', this.props.user && this.props.user.id)
      formData.append('operation_time', this.state.operation_time)
      formData.append('details', this.state.details)
      formData.append('location', this.state.location)
      formData.append('brand', this.state.brand)
      formData.append('price', this.state.price)
      formData.append('featured', this.state.featured)
      formData.append('link', this.state.link)
      formData.append('rating', this.state.rating)
      if (this.state.filess && this.state.isfile) {
        for (const i in this.state.filess) {
          var files = this.state.filess[i].uri
          formData.append('files' + i, {
            uri: files,
            type: "image/" + files.split('.')[files.split('.').length - 1],
            name: Math.random() + '.' + files.split('.')[files.split('.').length - 1],
          }
          )
        }
      }
      if (this.state.AllData.state === 'update') {
        formData.append('id', this.state.id)
        formData.append('status', this.state.status)
        this.props.productsUpdate(formData, this.state.id)
      } else {
        formData.append('status', 'Pending')
        this.props.productsCreate(formData)
      }
    } else {
      alert(this.context.t('product-err'))
    }
  }

  getLocation({ longitude, latitude }) {
    this.setState({ location: longitude + "," + latitude })
  }

  render() {
    const { mapstate, region, Shops, shop, title, link, Categories, category, Brands, brand, location, operation_time, details, files, price, AllData } = this.state
    return (
      <Container>
        <Modal visible={mapstate} transparent={true} animationType="slide">
          <MapView
            onMapReady={() => this.getLocation(region)}
            showsUserLocation={true}
            followsUserLocation={true}
            region={region}
            showsMyLocationButton={true}
            style={StyleSheet.absoluteFill}
            textStyle={{ color: '#bc8b00' }}
            containerStyle={{ backgroundColor: 'white', borderColor: '#BC8B00' }}
          >
            <Marker
              draggable
              coordinate={region}
              title={this.context.t("You are here")}
              description={this.context.t("You are here")}
              pinColor='blue'
              onDragEnd={(e) => this.getLocation(e.nativeEvent.coordinate)}
            />
          </MapView>
          <TouchableOpacity onPress={() => this.setState({ mapstate: !mapstate })} style={{ position: 'absolute', left: 30, top: 50 }}>
            <Icon type="Ionicons" name="ios-close-circle" size={30} color="black" />
          </TouchableOpacity>
        </Modal>
        <Headers
          screen={() => this.props.navigation.goBack()}
          title={this.context.t(AllData.state === 'update' ? 'Update Offer' : 'Create Offer')}
          leftLabel={<Icon type="Ionicons" name="ios-arrow-back" style={styles.HeaderIconLeft} />}
        />
        <View style={styles.headerList}>
          <View style={styles.headerListTitle}>
            <Text style={styles.headerListTitleText}>{this.context.t(AllData.state === 'update' ? 'Update' : 'Create New')}</Text>
            <LinearGradient
              start={[1, 1]}
              end={[0, 0]}
              colors={COLOR.linearGradientColor}
              style={styles.rightBorder}>
            </LinearGradient>
          </View>
        </View>
        <Content contentContainerStyle={styles.Acenter}>
          <View style={styles.itemList}>
            <InputBox
              style={styles.InputBox}
              maxLength={100}
              placeholder={this.context.t('Offers Title Here')}
              onChangeText={(e) => this.setState({ title: e })}
              leftLabel={<Icon type="MaterialIcons" name="title" style={styles.inputIcon} />}
              value={title}
            />
            <InputBox
              maxLength={100}
              style={styles.InputBox}
              placeholder={this.context.t('Location')}
              onFocus={() => this.setState({ mapstate: !mapstate })}
              leftLabel={<Icon type="SimpleLineIcons" name="location-pin" style={styles.inputIcon} />}
              value={location}
            />
            <InputBox
              maxLength={100}
              style={styles.InputBox}
              placeholder={this.context.t('Price')}
              keyboardType='numeric'
              onChangeText={(e) => this.setState({ price: e })}
              leftLabel={<Icon type="FontAwesome" name="dollar" style={styles.inputIcon} />}
              value={price + ''}
            />
            <InputBox
              maxLength={100}
              style={styles.InputBox}
              placeholder={this.context.t('Link')}
              onChangeText={(e) => this.setState({ link: e })}
              leftLabel={<Icon type="AntDesign" name="link" style={styles.inputIcon} />}
              value={link}
            />
            <InputBox
              maxLength={100}
              style={styles.InputBox}
              placeholder={this.context.t('Operation Time')}
              leftLabel={<Icon type="SimpleLineIcons" name="calendar" style={styles.inputIcon} />}
              onChangeText={(e) => this.setState({ operation_time: e })}
              value={operation_time}
            />
            <Text style={styles.selectPickerText}>{this.context.t('Shop')}</Text>
            <View style={styles.pickerBoxB}>
              <Picker
                mode='dropdown'
                style={[styles.pickerB]}
                itemStyle={styles.pickerItemB}
                selectedValue={shop}
                onValueChange={(e) => this.setState({ shop: e })}
              >
                {Shops ? Shops.map((item, key) => (
                  <Picker.Item key={key} color={COLOR.grey2Color} label={item.label} value={item.value} />
                )) : null}
              </Picker>
            </View>
            <Text style={styles.selectPickerText}>{this.context.t('Category')}</Text>
            <View style={styles.pickerBoxB}>
              <Picker
                mode='dropdown'
                style={[styles.pickerB]}
                itemStyle={styles.pickerItemB}
                selectedValue={category}
                onValueChange={(e) => this.setState({ category: e })}
              >
                {Categories ? Categories.map((item, key) => (
                  <Picker.Item key={key} color={COLOR.grey2Color} label={item.label} value={item.value} />
                )) : null}
              </Picker>
            </View>
            <Text style={styles.selectPickerText}>{this.context.t('Brand')}</Text>
            <View style={styles.pickerBoxB}>
              <Picker
                mode='dropdown'
                style={[styles.pickerB]}
                itemStyle={styles.pickerItemB}
                selectedValue={brand}
                onValueChange={(e) => this.setState({ brand: e })}
              >
                {Brands ? Brands.map((item, key) => (
                  <Picker.Item key={key} color={COLOR.grey2Color} label={item.label} value={item.value} />
                )) : null}
              </Picker>
            </View>
          </View>
          <View style={{ width: LAYOUT.window.width * 0.9 }}>
            <View style={{ height: LAYOUT.window.height * 0.15 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={[styles.itemTypeBox]}>
                  {files && files.length ? files.map((item, key) => {
                    var Images = item.uri ? item.uri : item
                    var isImage = Images.indexOf('.mp4') > -1 || Images.indexOf('.avi') > -1 ? false : true
                    var item = item.uri ? { uri: item.uri } : { uri: item }
                    return (
                      <TouchableOpacity key={key} style={styles.itemTypeItem} onPress={() => this._pickImage()}>
                        {
                          isImage ? <Image source={item} style={[styles.itemTypeImage, { resizeMode: 'contain' }]} /> :
                            <Video
                              source={item}
                              rate={1.0}
                              volume={1.0}
                              isMuted={false}
                              resizeMode="cover"
                              shouldPlay
                              style={styles.itemTypeImage}
                            />
                        }
                      </TouchableOpacity>
                    )
                  }) : null}
                  {
                    files && files.length > 1 ?
                      <TouchableOpacity style={styles.itemTypeItem} onPress={() => this._pickImage()}>
                        <Image source={LAYOUT.imageIcon} style={styles.itemTypeIcon} />
                      </TouchableOpacity> :
                      <>
                        <TouchableOpacity style={styles.itemTypeItem} onPress={() => this._pickImage()}>
                          <Image source={LAYOUT.imageIcon} style={styles.itemTypeIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemTypeItem} onPress={() => this._pickImage()}>
                          <Image source={LAYOUT.videoIcon} style={styles.itemTypeIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemTypeItem} onPress={() => this._pickImage()}>
                          <Image source={LAYOUT.imageIcon} style={styles.itemTypeIcon} />
                        </TouchableOpacity>
                      </>
                  }
                </View>
              </ScrollView>
            </View>
          </View>
          <TextArea
            maxLength={250}
            style={styles.InputBox}
            placeholder={this.context.t('Details')}
            onChangeText={(e) => this.setState({ details: e })}
            value={details}
          />
          <View style={styles.buttonBox}>
            <TouchableOpacity onPress={() => this.onPublish()}>
              <LinearGradient
                start={[1, 1]}
                end={[0, 0]}
                colors={COLOR.linearGradientColor}
                style={styles.authButton}
              >
                <Text style={styles.authButtonText}>{this.context.t("Publish")}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  brandsData: state.brands.brandsData,
  productsData: state.products.productsData,
  categoriesData: state.categories.categoriesData,
  shopsData: state.shops.shopsData,
})

const mapDispatchToProps = {
  brandsLoad, categoriesLoad, productsCreate, productsUpdate, shopsLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen)

const styles = StyleSheet.create({
  ...Styles,

  headerList: {
    height: LAYOUT.window.height * 0.07,
    width: LAYOUT.window.width,
    paddingLeft: LAYOUT.window.width * 0.04,
    borderBottomWidth: 2,
    borderBottomColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemList: {
    marginVertical: LAYOUT.window.height * 0.015,
    width: LAYOUT.window.width,
    alignItems: 'center',
  },
  InputBox: {
    width: LAYOUT.window.width * 0.9,
    marginVertical: LAYOUT.window.height * 0.004
  },
  selectPickerText: {
    width: LAYOUT.window.width * 0.85,
    color: COLOR.greyColor,
    fontSize: LAYOUT.fontSize1
  },
  itemTypeBox: {
    height: LAYOUT.window.height * 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTypeItem: {
    marginHorizontal: LAYOUT.window.width * 0.02,
    width: LAYOUT.window.width * 0.33,
    height: LAYOUT.window.height * 0.13,
    borderRadius: LAYOUT.window.width * 0.03,

    backgroundColor: COLOR.whiteColor,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemTypeIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain'
  },
  itemTypeImage: {
    width: '90%',
    height: '90%',
  },
  buttonBox: {
    width: '100%',
    marginBottom: LAYOUT.window.height * 0.02,
    alignItems: 'center'
  },
  pickerBoxB: {
    width: LAYOUT.window.width * 0.88,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.whiteColor,
    marginVertical: LAYOUT.window.height * 0.015,
    borderRadius: 15 / PixelRatio.get(),
    paddingHorizontal: LAYOUT.window.width * 0.05,

    shadowOffset: { width: 5, height: 5 },
    shadowColor: COLOR.greyColor,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  pickerB: {
    width: LAYOUT.window.width * 0.82,
    minHeight: normalize(50),
  },
  pickerItemB: {
    height: normalize(55),
    color: COLOR.whiteColor
  },
  arrowWrapperB: {
    flex: 10,
    height: normalize(55),
    marginLeft: -LAYOUT.window.width * 0.1,
    justifyContent: 'center'
  },
  arrowB: {
    textAlign: 'center',
    color: COLOR.grey1Color,
    fontSize: LAYOUT.window.width * 0.05
  },
  inputIcon: {
    color: COLOR.grey1Color,
    fontSize: LAYOUT.window.width * 0.035
  },
})
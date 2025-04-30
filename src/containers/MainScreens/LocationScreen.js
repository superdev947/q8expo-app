import React, { Component } from "react"
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput } from "react-native"
import { Container, Icon } from "native-base"
import MapView, { Marker } from "react-native-maps"
import { Headers } from "../../components"
import { COLOR, LAYOUT, LocalizationContext, Styles } from "../../constants"

export class LocationScreen extends Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    const { location, title, details } = props.navigation.state.params
    var latitude = parseFloat(location.split(',')[1])
    var longitude = parseFloat(location.split(',')[0])
    this.state = {
      title: title ? title : '',
      details: details ? details : '',
      region: {
        latitude: !isNaN(latitude) ? latitude : 27,
        longitude: !isNaN(longitude) ? longitude : 77,
        latitudeDelta: LAYOUT.LATITUDE_DELTA,
        longitudeDelta: LAYOUT.LONGITUDE_DELTA,
      }
    }
  }
  render() {
    console.log(this.state.region)
    return (
      <Container>
        <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 100, alignItems: 'center' }}>
          <Headers
            title={this.context.t('Location')}
            screen={() => this.props.navigation.goBack()}
            leftLabel={<Icon type="Ionicons" name="ios-arrow-back" style={styles.HeaderIconLeft} />}
          />
          <View style={{ width: LAYOUT.window.width * 0.8, marginTop: LAYOUT.window.height * 0.03 }}>
            <View style={styles.bgP}>
              <View style={styles.inputLeft}>
                <Icon type="Ionicons" name="ios-search" style={[styles.F24, styles.CLGR1]} />
              </View>
              <TextInput
                placeholderTextColor={COLOR.placeholderTextColor}
                autoCapitalize="none"
                placeholder={this.context.t('Search location')}
                style={[styles.InputBox]}
              />
              <View style={styles.inputLeft}>
                <Icon type="SimpleLineIcons" name="location-pin" style={[styles.F23, styles.CLR]} />
              </View>
            </View>
          </View>
        </View>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={this.state.region}
          customMapStyle={[]}
          style={styles.mapView}
        >
          <Marker
            draggable
            coordinate={this.state.region}
            title={this.state.title}
            description={this.state.details}
            pinColor='red'
          />
        </MapView>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen)

const styles = StyleSheet.create({
  ...Styles,
  mapView: {
    width: LAYOUT.window.width,
    height: LAYOUT.window.height
  },
  bgP: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLOR.whiteColor,
    borderRadius: 10,
    width: "auto",
    padding: 11,
    paddingHorizontal: LAYOUT.window.width * 0.05,
    marginVertical: LAYOUT.window.height * 0.01,
  },
  inputLeft: {
    paddingHorizontal: LAYOUT.window.width * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  InputBox: {
    flex: 1,
    height: LAYOUT.window.height * 0.036,
    fontSize: LAYOUT.fontSize2,
    paddingHorizontal: LAYOUT.window.width * 0.02,
    color: COLOR.blackColor,
    fontWeight: '600',
  },
})
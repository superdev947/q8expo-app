import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Content, Fab, Icon } from 'native-base'
import IconBadge from 'react-native-icon-badge'
import { LAYOUT, Styles } from "../../constants"
import { ListItem, Headers } from '../../components'
import { navigate } from '../../redux/services/navigator'
import { categoriesLoad } from '../../redux/actions/categoriesActions'

class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.navigation.state.params
    }
  }

  componentDidMount() {
    this.props.categoriesLoad(this.state.id)
  }

  render() {
    const { cartData, categories, authToken } = this.props
    return (
      <Container>
        <Headers
          screen={() => this.props.navigation.goBack()}
          title={this.state.title}
          leftLabel={<Icon type="Ionicons" name="ios-arrow-back" style={styles.HeaderIconLeft} />}
        />
        <Content contentContainerStyle={styles.itemList} showsVerticalScrollIndicator={false}>
          {
            categories && categories.length ?
              categories.map((item, key) => (
                <ListItem key={key} item={item} type={1} />
              )) : null
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
  categories: state.categories.categoriesData,
})

const mapDispatchToProps = {
  categoriesLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen)


const styles = StyleSheet.create({
  ...Styles,
  itemList: {
    marginHorizontal: LAYOUT.window.width * 0.04,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import { LAYOUT, COLOR, Styles, LocalizationContext, } from "../../constants"
import { Headers } from "../../components"

class PrivacyPolicyScreen extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props)
    this.state = {
      activeMembership: 1
    }
  }

  render() {
    return (
      <Container>
        <Headers
          title={this.context.t('Privacy Policy')}
          screen={() => this.props.navigation.goBack()}
          leftLabel={<Icon type="Ionicons" name="ios-arrow-back" style={styles.HeaderIconLeft} />}
        />
        <Content>
          <View style={styles.termP}>
            <Text style={styles.title}>{this.context.t('Privacy Policy Title')}</Text>
            <Text style={styles.desc}>{this.context.t('Privacy Policy Desc')}</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({
  ...Styles,
  termP: {
    marginVertical: LAYOUT.window.height * 0.01,
    marginHorizontal: LAYOUT.window.width * 0.05,
    textAlign: 'center'
  },
  title: {
    fontSize: LAYOUT.fontSize6,
    color: COLOR.grey2Color,
  },
  desc: {
    marginTop: LAYOUT.window.height * 0.01,
    fontSize: LAYOUT.fontSize4,
    color: COLOR.grey2Color,
  },
})
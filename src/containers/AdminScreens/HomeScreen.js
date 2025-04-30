import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import { Headers } from '../../components'
import { COLOR, LAYOUT, LocalizationContext, Styles } from '../../constants'
import { logOut } from '../../redux/actions/authActions'
import normalize from 'react-native-normalize'
import { LinearGradient } from 'expo-linear-gradient'
import { Request } from '../../redux/services'

export default ({ navigation }) => {
  const { t } = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (navigation.state && navigation.state.params) {
      DiscountGetInfo()
    }
  }, [navigation.state]);

  const DiscountGetInfo = async () => {
    let data = JSON.parse(navigation.state.params)
    await Request('post', "discounts/getInfo", data)
      .then(async (res) => {
        if (res.status) {
          Alert.alert(
            "Alert", res.message,
            [
              {
                text: t("Deny"),
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: t("Allow"), onPress: DiscountUse }
            ]
          );
        } else {
          alert(res.message)
        }
      })
  }

  const DiscountUse = async () => {
    let data = JSON.parse(navigation.state.params)
    await Request('post', "discounts/use", data)
      .then(async (res) => {
        alert(res.message)
      })
  }

  return (
    <Container>
      <Headers
        title={t('Home')}
        leftLabel={<Icon type="MaterialCommunityIcons" name="menu" style={styles.HeaderIconLeft} />}
        rightLabel={
          <TouchableOpacity onPress={() => dispatch(logOut())}>
            <Icon type="SimpleLineIcons" name="logout" style={styles.HeaderIconRight} />
          </TouchableOpacity>
        }
      />
      <Content>
        <TouchableOpacity onPress={() => navigation.push('ScannScreen')}>
          <LinearGradient
            start={[1, 1]}
            end={[0, 0]}
            colors={COLOR.linearGradientColor}
            style={styles.getOfferButton}>
            <View>
              <Text style={styles.getOfferButtonText1}>{t('Use discount code')}</Text>
              <Text style={styles.getOfferButtonText2}>{t('Scan to avail of the discount code')}</Text>
            </View>
            <Image source={LAYOUT.qrcode} style={styles.qrcodeImage} />
          </LinearGradient>
        </TouchableOpacity>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  ...Styles,
  getOfferButton: {
    padding: normalize(20),
    marginHorizontal: normalize(20),
    marginVertical: normalize(20),
    borderRadius: normalize(20),
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
})

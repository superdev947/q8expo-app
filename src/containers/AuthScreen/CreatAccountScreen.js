import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome, Fontisto, Zocial, Entypo } from '@expo/vector-icons'
import CountryPicker from 'react-native-country-picker-modal'
import { COLOR, LAYOUT, LocalizationContext, Styles } from '../../constants'
import { InputBox } from '../../components'
import { Register } from '../../redux/actions/authActions'
import { validateEmail } from '../../redux/services'
import { navigate } from '../../redux/services/navigator'
import { Container, Content } from 'native-base'

export class CreatAccountScreen extends Component {
    static contextType = LocalizationContext
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            phone: '',
            countryCode: '',
            country: null,
            isCountryPicker: false,
            role: false
        }
    }

    onSelect = (country) => {
        this.setState({ countryCode: country.cca2, country: country.name, isCountryPicker: false })
    }

    Register() {
        if (!this.state.email || !validateEmail(this.state.email)) {
            alert(this.context.t("email-address-err"))
        } else if (!this.state.password) {
            alert(this.context.t("password-err"))
        } else if (!this.state.countryCode) {
            alert(this.context.t("country-err"))
        } else if (!this.state.phone) {
            alert(this.context.t("phone-err"))
        } else if (this.state.role) {
            this.props.Register({
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                country: this.state.country,
                status: 'Active',
                role: 'Seller',
            })
        } else {
            this.props.Register({
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                country: this.state.country,
                status: 'Active',
                role: 'Customer',
            })
            this.state = {}
        }
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Image source={LAYOUT.logo} style={styles.image} />
                    <View style={styles.buttonBox}>
                        <InputBox
                            style={{ width: LAYOUT.window.width * 0.8 }}
                            placeholder={this.context.t('Email Address')}
                            leftLabel={<Zocial name="email" style={styles.inputIcon} />}
                            onChangeText={(e) => this.setState({ email: e })}
                            value={this.state.email}
                        />
                        <InputBox
                            style={{ width: LAYOUT.window.width * 0.8 }}
                            placeholder={this.context.t('Password')}
                            secureTextEntry={true}
                            leftLabel={<Fontisto name="key" style={styles.inputIcon} />}
                            onChangeText={(e) => this.setState({ password: e })}
                            value={this.state.password}
                        />
                        <View style={{ width: LAYOUT.window.width * 0.8 }}>
                            <View style={styles.bgP}>
                                <View style={styles.InputBox}>
                                    <CountryPicker {...{
                                        onSelect: this.onSelect,
                                        countryCode: this.state.countryCode,
                                        withFilter: true,
                                        withCountryNameButton: true,
                                        withAlphaFilter: false,
                                        withCallingCode: true,
                                        withEmoji: false,
                                        theme: { fontSize: LAYOUT.fontSize2 },
                                        translation: 2,
                                        containerButtonStyle: { width: '100%', color: COLOR.greyColor, fontSize: LAYOUT.fontSize }
                                    }} visible={this.state.isCountryPicker}
                                    />
                                </View>
                                <TouchableOpacity style={styles.inputLeft} onPress={() => this.setState({ isCountryPicker: !this.state.isCountryPicker })}>
                                    <Entypo name="chevron-thin-down" style={styles.inputIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <InputBox
                            style={{ width: LAYOUT.window.width * 0.8 }}
                            placeholder={this.context.t('Phone')}
                            leftLabel={<FontAwesome name="phone" style={styles.inputIcon} />}
                            onChangeText={(e) => this.setState({ phone: e })}
                            value={this.state.phone}
                        />
                        <TouchableOpacity style={[styles.radioButton, { marginTop: LAYOUT.window.height * 0.01 }]} onPress={() => this.setState({ role: !this.state.role })}>
                            {
                                !this.state.role ?
                                    <LinearGradient
                                        start={[1, 1]}
                                        end={[0, 0]}
                                        colors={COLOR.linearGradient1Color}
                                        style={styles.radioButtonIcon}>
                                    </LinearGradient> :
                                    <LinearGradient
                                        start={[1, 1]}
                                        end={[0, 0]}
                                        colors={COLOR.linearGradient2Color}
                                        style={styles.radioButtonIconA}>
                                    </LinearGradient>
                            }
                            <Text style={styles.radioButtonText}>{this.context.t("I'm a Customer")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.radioButton} onPress={() => this.setState({ role: !this.state.role })}>
                            {
                                this.state.role ?
                                    <LinearGradient
                                        start={[1, 1]}
                                        end={[0, 0]}
                                        colors={COLOR.linearGradient1Color}
                                        style={styles.radioButtonIcon}>
                                    </LinearGradient> :
                                    <LinearGradient
                                        start={[1, 1]}
                                        end={[0, 0]}
                                        colors={COLOR.linearGradient2Color}
                                        style={styles.radioButtonIconA}>
                                    </LinearGradient>
                            }
                            <Text style={styles.radioButtonText}>{this.context.t("I'm a Seller")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.Register()}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.authButton}>
                                <Text style={styles.authButtonText}>{this.context.t("CREATE ACCOUNT")}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.authButton}>
                                <Text style={styles.authButtonText}>{this.context.t("LOG IN")}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    ...Styles,
    container: {
        padding: LAYOUT.window.width * 0.1,
        paddingLeft: LAYOUT.window.width * 0.15,
        paddingRight: LAYOUT.window.width * 0.15,
        alignItems: 'center',
    },
    image: {
        width: LAYOUT.window.width * 0.25,
        height: LAYOUT.window.width * 0.2,
        marginTop: LAYOUT.window.height * 0.04,
        resizeMode: 'contain'
    },
    radioButtonIcon: {
        marginHorizontal: LAYOUT.window.width * 0.03,
        width: LAYOUT.window.width * 0.03,
        height: LAYOUT.window.width * 0.03,
        borderRadius: LAYOUT.window.width * 0.03,
        borderWidth: 1.5,
        borderColor: COLOR.greenColor
    },
    radioButtonIconA: {
        marginHorizontal: LAYOUT.window.width * 0.03,
        width: LAYOUT.window.width * 0.03,
        height: LAYOUT.window.width * 0.03,
        borderRadius: LAYOUT.window.width * 0.03,
        borderWidth: 1.5,
        borderColor: COLOR.grey1Color
    },
    buttonBox: {
        width: '100%',
        marginTop: LAYOUT.window.height * 0.025,
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        width: LAYOUT.window.width * 0.8,
        marginVertical: LAYOUT.window.height * 0.005,
        alignItems: 'center',
    },
    radioButtonText: {
        fontSize: LAYOUT.fontSize1,
        color: COLOR.black1Color,
        textAlign: 'left',
        fontWeight: '500',
    },
    bgP: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: COLOR.whiteColor,
        borderRadius: 10,
        width: "auto",
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        marginVertical: LAYOUT.window.width * 0.02,

        shadowOffset: { width: 1, height: 3 },
        shadowColor: COLOR.greyColor,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
    inputLeft: {
        width: "auto",
        marginRight: LAYOUT.window.width * 0.01,
        justifyContent: "center",
        alignItems: "center",
    },
    InputBox: {
        justifyContent: "center",
        flex: 1,
        height: LAYOUT.window.height * 0.04,
        fontSize: LAYOUT.fontSize1,
        fontWeight: '600',
        color: COLOR.blackColor,
    },
})

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    Register
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatAccountScreen)
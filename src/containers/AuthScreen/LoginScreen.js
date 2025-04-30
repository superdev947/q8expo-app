import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { Fontisto, Zocial, AntDesign } from '@expo/vector-icons'
import { COLOR, LAYOUT, LocalizationContext, Styles } from '../../constants'
import { InputBox } from '../../components'
import { login } from '../../redux/actions/authActions'
import { navigate } from '../../redux/services/navigator'
import { validateEmail } from '../../redux/services'
import normalize from 'react-native-normalize'

class LoginScreen extends Component {
    static contextType = LocalizationContext
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            mode: 'app',
        }
    }

    login() {
        if (!this.state.email || !validateEmail(this.state.email)) {
            alert(this.context.t('email-address-err'))
        } else if (!this.state.password) {
            alert(this.context.t('password-err'))
        } else {
            this.props.login(this.state)
        }
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.content}>
                    <TouchableOpacity style={{ position: 'absolute', left: normalize(25), top: normalize(30) }} onPress={() => navigate('HomeScreen')}>
                        <AntDesign name="back" style={styles.inputIcon} />
                    </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => navigate('ForgetScreen')}>
                            <Text style={styles.forgetButtonText}>{this.context.t('Forget Password?')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.login()}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.authButton}>
                                <Text style={styles.authButtonText}>{this.context.t("LOG IN")}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('CreatAccountScreen')}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.authButton}>
                                <Text style={styles.authButtonText}>{this.context.t("CREATE ACCOUNT")}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
    ...Styles,
    content: {
        padding: LAYOUT.window.width * 0.1,
        paddingHorizontal: LAYOUT.window.width * 0.15,
        alignItems: 'center',
    },
    image: {
        width: LAYOUT.window.width * 0.25,
        height: LAYOUT.window.width * 0.2,
        marginTop: LAYOUT.window.height * 0.05,
        resizeMode: 'contain'
    },
    buttonBox: {
        width: '100%',
        marginTop: LAYOUT.window.height * 0.115,
        alignItems: 'center',
    },
    forgetButtonText: {
        marginTop: LAYOUT.window.height * 0.04,
        fontSize: LAYOUT.fontSize1,
        color: COLOR.greyColor,
        textAlign: 'center',
        fontWeight: '500'
    }
})


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'
import { COLOR, LAYOUT, LocalizationContext, Styles } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient'
import { Zocial } from '@expo/vector-icons'
import { navigate } from '../../redux/services/navigator'
import { sendMail } from '../../redux/actions/authActions'
import { InputBox } from '../../components'

export class ForgetScreen extends Component {
    static contextType = LocalizationContext
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            time: 30,
            status: true,
        }
    }

    sendMail() {
        if (this.state.email) {
            this.setState({ email: '', status: false })
            this.props.sendMail({ email: this.state.email })
            var counter = setInterval(timer, 1000)
            var me = this
            function timer() {
                me.setState({ time: me.state.time - 1 })
                if (me.state.time <= 0) {
                    me.setState({ time: 30, status: true })
                    clearInterval(counter)
                    return
                }
            }
        }
    }

    render() {
        const { email } = this.state
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.screenTitle}>{this.context.t('Forget Password?')}</Text>
                    <View style={styles.buttonBox}>
                        <InputBox
                            style={{ width: LAYOUT.window.width * 0.8 }}
                            placeholder={this.context.t('Email Address')}
                            leftLabel={<Zocial name="email" style={styles.inputIcon} />}
                            onChangeText={(e) => this.setState({ email: e })}
                            value={email}
                        />
                        {
                            this.state.status ?
                                <TouchableOpacity onPress={() => this.sendMail()}>
                                    <LinearGradient
                                        start={[1, 1]}
                                        end={[0, 0]}
                                        colors={COLOR.linearGradientColor}
                                        style={styles.authButton}>
                                        <Text style={styles.authButtonText}>{this.context.t('GET CODE')}</Text>
                                    </LinearGradient>
                                </TouchableOpacity> :
                                <View>
                                    <LinearGradient
                                        start={[1, 1]}
                                        end={[0, 0]}
                                        colors={COLOR.linearGradientColor}
                                        style={styles.authButton}>
                                        <Text style={styles.authButtonText}>{this.context.t('GET CODE')}</Text>
                                    </LinearGradient>
                                </View>

                        }
                        <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.authButton}>
                                <Text style={styles.authButtonText}>{this.context.t('LOG IN')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {
                            !this.state.status &&
                            <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                <TouchableOpacity>
                                    <Text style={styles.resendText}>{this.context.t('Resend')} ({this.state.time}s)</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    sendMail
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetScreen)

const styles = StyleSheet.create({
    ...Styles,
    container: {
        padding: LAYOUT.window.width * 0.1,
        alignItems: 'center',
    },
    screenTitle: {
        color: COLOR.grey2Color,
        marginTop: LAYOUT.window.height * 0.22,
        fontSize: LAYOUT.fontSize5,
        fontWeight: '600',
        width: '100%'
    },
    buttonBox: {
        width: '100%',
        marginTop: LAYOUT.window.height * 0.07,
        alignItems: 'center',
    },
    resendText: {
        color: COLOR.greyColor,
        marginTop: LAYOUT.window.height * 0.01,
        fontSize: LAYOUT.fontSize3,
    }
})

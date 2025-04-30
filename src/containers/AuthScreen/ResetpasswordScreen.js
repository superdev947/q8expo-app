import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { Fontisto } from '@expo/vector-icons'
import { COLOR, LAYOUT, LocalizationContext, Styles } from '../../constants'
import { resetPassword } from '../../redux/actions/authActions'
import { InputBox } from '../../components'

class ResetpasswordScreen extends Component {
    static contextType = LocalizationContext
    constructor(props) {
        super(props)

        this.state = {
            newPassword: '',
            confirmPassword: '',
        }
    }

    resetPassword() {
        if (this.state.newPassword === this.state.confirmPassword) {
            this.props.resetPassword(this.state.newPassword)
        }
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.screenTitle}>{this.context.t('Reset password')}</Text>
                    <View style={styles.buttonBox}>
                        <InputBox
                            style={{ width: LAYOUT.window.width * 0.8 }}
                            placeholder={this.context.t('New Password')}
                            secureTextEntry={true}
                            leftLabel={<Fontisto name="key" style={styles.inputIcon} />}
                            onChangeText={(e) => this.setState({ newPassword: e })}
                            value={this.state.newPassword}
                        />
                        <InputBox
                            style={{ width: LAYOUT.window.width * 0.8 }}
                            placeholder={this.context.t('Confirm Password')}
                            secureTextEntry={true}
                            leftLabel={<Fontisto name="key" style={styles.inputIcon} />}
                            onChangeText={(e) => this.setState({ confirmPassword: e })}
                            value={this.state.confirmPassword}
                        />
                        <TouchableOpacity onPress={() => this.resetPassword()}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.authButton}>
                                <Text style={styles.authButtonText}>{this.context.t('LOG IN')}</Text>
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
    resetPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetpasswordScreen)

const styles = StyleSheet.create({
    ...Styles,
    container: {
        padding: LAYOUT.window.width * 0.1,
        alignItems: 'center',
    },
    screenTitle: {
        color: COLOR.grey2Color,
        marginTop: LAYOUT.window.height * 0.19,
        fontSize: LAYOUT.fontSize5,
        fontWeight: '600',
        width: '100%'
    },
    buttonBox: {
        width: '100%',
        marginTop: LAYOUT.window.height * 0.06,
        alignItems: 'center',
    },
})

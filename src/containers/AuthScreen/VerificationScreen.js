import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Container, Content } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { COLOR, LAYOUT, LocalizationContext, Styles } from '../../constants'
import { navigate } from '../../redux/services/navigator'
import { forgetPassword } from '../../redux/actions/authActions'

export class VerificationScreen extends Component {
    static contextType = LocalizationContext
    constructor(props) {
        super(props)

        this.state = {
            code1: '',
            code2: '',
            code3: '',
            code4: '',
        }
    }

    forgetPassword() {
        if (this.state.code1 && this.state.code2 && this.state.code3 && this.state.code4) {
            var token = ''
            for (const key in this.state) {
                token += this.state[key]
            }
            this.setState({ code1: '', code2: '', code3: '', code4: '' })
            this.props.forgetPassword(token)
        }
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.screenTitle}>{this.context.t('Verification code')}</Text>
                    <View style={styles.buttonBox}>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <View style={styles.bgP}>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.code1}
                                    style={styles.InputBox}
                                    onSubmitEditing={() => this.towRef.focus()}
                                    autoCapitalize="none"
                                    placeholderTextColor="rgba(36, 37, 61, 0.3)"
                                    onChangeText={(e) => {
                                        this.setState({ code1: e })
                                        this.input_1.focus()
                                    }}
                                />
                            </View>
                            <View style={styles.bgP}>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.code2}
                                    style={styles.InputBox}
                                    ref={ref => this.input_1 = ref}
                                    autoCapitalize="none"
                                    placeholderTextColor="rgba(36, 37, 61, 0.3)"
                                    onChangeText={(e) => {
                                        this.setState({ code2: e })
                                        this.input_2.focus()
                                    }}
                                />
                            </View>
                            <View style={styles.bgP}>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.code3}
                                    autoCapitalize="none"
                                    style={styles.InputBox}
                                    ref={ref => this.input_2 = ref}
                                    onChangeText={(e) => {
                                        this.setState({ code3: e })
                                        this.input_3.focus()
                                    }}
                                    placeholderTextColor="rgba(36, 37, 61, 0.3)"
                                />
                            </View>
                            <View style={styles.bgP}>
                                <TextInput
                                    maxLength={1}
                                    value={this.state.code4}
                                    autoCapitalize="none"
                                    style={styles.InputBox}
                                    ref={ref => this.input_3 = ref}
                                    onChangeText={(e) => this.setState({ code4: e })}
                                    placeholderTextColor="rgba(36, 37, 61, 0.3)"
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.forgetPassword()}>
                            <LinearGradient
                                start={[1, 1]}
                                end={[0, 0]}
                                colors={COLOR.linearGradientColor}
                                style={styles.authButton}>
                                <Text style={styles.authButtonText}>{this.context.t('VERIFY')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('LoginScreen')}>
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
    forgetPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationScreen)

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
        marginTop: LAYOUT.window.height * 0.05,
        alignItems: 'center',
    },
    bgP: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: COLOR.inputBackgroundColor,
        borderRadius: 10,
        padding: 15,
        justifyContent: "center",
        marginVertical: LAYOUT.window.width * 0.02,
        marginHorizontal: '3.5%',
        shadowOffset: { width: 1, height: 3 },
        shadowColor: COLOR.greyColor,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
        width: '18%',
    },
    InputBox: {
        height: LAYOUT.window.height * 0.05,
        fontSize: LAYOUT.fontSize4,
        fontWeight: '600',
        color: COLOR.blackColor,
        borderBottomWidth: 1,
        textAlign: 'center'
    },
})

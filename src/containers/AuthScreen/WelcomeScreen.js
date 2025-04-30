import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import { StyleSheet, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLOR, LAYOUT, slides, LocalizationContext } from '../../constants'
import AppIntroSlider from '../../components/appIntroSlider'
import { welcomeDone } from '../../redux/actions/authActions'
import { setNavigator, navigate } from '../../redux/services/navigator'

export class WelcomeScreen extends React.Component {
    static contextType = LocalizationContext

    constructor(props) {
        super(props)

        this.state = {

        }
        setNavigator(props.navigation)
    }

    _renderNextButton() { false }
    _renderItem = ({ item }) => {
        return (
            <Container style={styles.container}>
                <LinearGradient
                    colors={['#26d8ae', '#255da6']}
                    style={styles.linearGradient}
                />
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{this.context.t(item.title)}</Text>
                <Text style={styles.text}>{this.context.t(item.text)}</Text>
            </Container>
        )
    }
    _onDone = () => {
        this.props.welcomeDone()
    }
    _onSkip = () => {
        this.props.welcomeDone()
    }

    render() {
        return <AppIntroSlider
            data={slides}
            onDone={this._onDone}
            showSkipButton={true}
            skipLabel={this.context.t('Skip')}
            doneLabel={this.context.t('Done')}
            renderItem={this._renderItem}
            navigate={() => navigate('PrivacyPolicyScreen', 'WelcomeScreen')}
            renderNextButton={this._renderNextButton}
        />
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    welcomeDone
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)


const styles = StyleSheet.create({
    container: {
        padding: LAYOUT.window.width * 0.1,
        paddingLeft: LAYOUT.window.width * 0.15,
        paddingRight: LAYOUT.window.width * 0.15,
        alignItems: 'center',
    },
    linearGradient: {
        height: LAYOUT.window.height * 1.3,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    image: {
        width: LAYOUT.window.width * 0.3,
        height: LAYOUT.window.width * 0.3,
        marginTop: LAYOUT.window.height * 0.1,
    },
    title: {
        fontSize: LAYOUT.fontSize5,
        color: COLOR.whiteColor,
        marginTop: LAYOUT.window.height * 0.02,
        textAlign: 'center',
    },
    text: {
        fontSize: LAYOUT.fontSize1,
        color: COLOR.whiteColor,
        marginTop: LAYOUT.window.height * 0.02,
        textAlign: 'center',
    },
})
import React, {Component} from 'react';
import {AppRegistry, View, Text, TouchableNativeFeedback, Image} from 'react-native';
import styles from '../Styles/Styles';


export default class Modals extends Component{

    render()
    {
        return (
        
            <View style={styles.gameOverMain}>
            
                <Image  style={{width:100, height:100}}  
                source={require('../assets/icons/gameOver.png')}/>


                <TouchableNativeFeedback    
                onPressOut={this.props.Action} 
                >
                    <View style = { styles.gameOverRestart }>

                        <Image style={{width:30, height:30}}
                        source = { require('../assets/icons/restart.png')}/>

                    </View>
                </TouchableNativeFeedback>


            </View>
        )
    }

}

AppRegistry.registerComponent('Modals', () => Modals);
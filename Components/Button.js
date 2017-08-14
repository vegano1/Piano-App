import React, {Component} from 'react';
import {AppRegistry, View, Text, TouchableNativeFeedback} from 'react-native';
import styles from '../Styles/Styles';



export default class MenuButton extends Component{
    render()
    {
        return (
          

            <TouchableNativeFeedback  

            
            onPress={this.props.Action} 
            
            >

                <View style = { styles.MenuButton }>
                    <Text> {this.props.name} </Text>
                </View>
            
            </TouchableNativeFeedback>

          

        )
    }

}

AppRegistry.registerComponent('MenuButton', () => MenuButton);
import React, {Component} from 'react';
import {AppRegistry, View, Text, StyleSheet, Dimensions, TouchableNativeFeedback} from 'react-native';

export default class Component1 extends Component{
    render()
    {
        return (
            <TouchableNativeFeedback >
                <View style={[styles.text,{backgroundColor: this.props.color}]}>
                    <Text >Hello, {this.props.name}</Text>
                </View>
            </TouchableNativeFeedback>

        )
    }

}

const styles = StyleSheet.create({

        text: {
            padding: 20,
            height: Dimensions.get('window').height/5,
            width: Dimensions.get('window').width/3,
            alignItems: 'center',
            borderColor: 'black',

            
        }
    }
)


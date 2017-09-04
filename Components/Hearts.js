import React, {Component} from 'react';
import {AppRegistry, View, Text, TouchableNativeFeedback, Image} from 'react-native';
import styles from '../Styles/Styles';



export default class Hearts extends Component{
    constructor(props){
        super(props);
        this.state = {
            disableButton : false,
            Hearts : this.props.remainingHearts
        };

        initialArr = [
            {
              id: 1,
              color: "blue",
              text: "text1"
            },
            {
              id: 2,
              color: "red",
              text: "text2"
            },
          ];
          

    }


    componentWillReceiveProps(nextProps) {
        
        this.setState({
            disableButton : nextProps.disableButton,
            Hearts : nextProps.remainingHearts
        });


    }
    render()
    {

        return (

            <View style={styles.menuShort}>
                    <View style={styles.heartIcon}>
                        <Image style={{width:13, height:13}}
                        source={require('../assets/icons/heart.png')}
                        />
                    </View>
                    <Text style={styles.heartText}>{this.state.Hearts}</Text>

            
            </View>
          

          

        )
    }

}

AppRegistry.registerComponent('Hearts', () => Hearts);
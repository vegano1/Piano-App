import React, {Component} from 'react';
import {AppRegistry, View, Text, TouchableNativeFeedback, Image} from 'react-native';
import styles from '../Styles/Styles';

import MenuButton from '../Components/Button';



export default class Modals extends Component{
    constructor(props){
        super(props);
        this.state = {
            disableButton : false,
            type : this.props.type,
            typeInfo : this.props.typeInfo
            
        };

        this.renderComponent = this.renderComponent.bind(this);
        
    }

    renderComponent(type, typeInfo){
        

        switch(type){

            case 'text' :         
            
            return (
                <Text >{typeInfo}</Text>
            );

            case 'image' :
            
            return (
                <Image style={{width: 20, height:20}} 
                source={typeInfo} />
            );
        }

            
        
    }

    

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            disableButton : nextProps.disableButton,
            typeInfo : nextProps.typeInfo
        });




    }
    render()
    {
        return (
        
            <View style={styles.gameOverMain}>
                <Image  style={{width:100, height:100}}  source={require('../assets/icons/gameOver.png')}/>
                <View style = { styles.gameOverRestart }>

                    <TouchableNativeFeedback    
                    onPress={this.props.Action} 
                    >

                        
                            <Image style={{width:30, height:30}}source={require('../assets/icons/restart.png')}/>
                        
            
                    </TouchableNativeFeedback>

                </View>


            </View>
        )
    }

}

AppRegistry.registerComponent('Modals', () => Modals);
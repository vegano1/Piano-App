import React, {Component} from 'react';
import {AppRegistry, View, Text, TouchableNativeFeedback, Image} from 'react-native';
import styles from '../Styles/Styles';



export default class MenuButton extends Component{
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
          

            <TouchableNativeFeedback  

            disabled={this.state.disableButton}
            onPressIn={this.props.Action} 
            
            >

                <View style = { styles.menuShort }>
                    {this.renderComponent(this.state.type, this.state.typeInfo )}
                </View>
            
            </TouchableNativeFeedback>

          

        )
    }

}

AppRegistry.registerComponent('MenuButton', () => MenuButton);
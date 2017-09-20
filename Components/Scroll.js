import React, { Component } from 'react';
import { 
    AppRegistry, 
    View, 
    Text, 
    TouchableNativeFeedback, 
    FlatList,
    Vibration,
    
 } from 'react-native';
import styles from '../Styles/Styles';

export default class Scroll extends Component {
    constructor(props) {
        super(props);
        this.state = {

            dataSource: this.props.dataSource,
            paused : false,
            firstTile : false,
            generating : false,
            
        };

        this.renderItem = this.renderItem.bind(this);
        this.tileColor = this.tileColor.bind(this);
        this.startTile = this.startTile.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.missedTile = this.missedTile.bind(this);
    }

    
    componentWillReceiveProps( nextProps) {
        let props = {};


        if(this.props.dataSource != nextProps.dataSource){
        
           props.dataSource = nextProps.dataSource;
           
        }
        if(this.props.onPause != nextProps.onPause){
            
            props.paused = !nextProps.onPause;   
        }
        if(this.props.firstTile != nextProps.firstTile){
            props.firstTile = nextProps.firstTile;
        }


        if(Object.keys(props).length){
           
            this.setState(props);
        }
        this.refs.FlatList.scrollToOffset({ offset: nextProps.scrollPos });
    }


    renderItem({ item, index }) {
        return (
            
                <TouchableNativeFeedback
                disabled={this.state.paused}
                background={TouchableNativeFeedback.Ripple('#0288D1', true)}
                onPressIn={()=>this.handlePress(index)}
                >

                    <View style={[styles.item]}>

                        <View ref='item' style={this.tileColor(item)}>
                            {this.startTile(item, index)}
                        </View>

                    </View>
                </TouchableNativeFeedback>
        )
    }

    
    tileColor(item) {

        switch (item) {
            case '1':
            
                return {
                    flex: 1,
                    borderRadius: 15,
                    borderWidth: 0.3,
                    backgroundColor: '#0288D1',
                    borderColor: 'black',
                    alignItems: 'center',
                };

            case '2':
                return {
                    flex: 1,
                    borderRadius: 15,
                    borderWidth: 1,
                    backgroundColor: 'red',
                    borderColor: '#B3E5FC',
                };
        }
    }


    startTile(item, index) {
        if (item == 1 && index == 1 && !this.state.firstTile) {

            return (

                <Text
                    style={{
                        flex: 1,
                        fontSize: 30,
                        fontWeight: 'bold',
                        color : '#0D47A1',
                        lineHeight: 90
                    }}

                
                >Start</Text>
            )
        }
        
    }    

    handlePress(index) {

            let data = this.props.dataSource;
            if(!this.state.firstTile && index == 1 && data[index]== '1'){
    
                    data.splice(index, 1, '0');
                    Vibration.vibrate([0, 10]);
                    this.props.Action();
                
            }
            else if(this.state.firstTile){
    
                if (data[index] == '0') {
                    
                    data.splice(index, 1, '2');
                    Vibration.vibrate([0, 500, 0, 500]);
                    this.props.gameOver();
                }
        
                else {
                    
                    data.splice(index, 1, '0');
                    Vibration.vibrate([0, 10]);
                    this.props.Action();
                }
                    
                this.setState({
                    dataSource : data
                });
            }
          

    }

    missedTile({ changed }) {
        
        if(changed[0].isViewable==false && changed[0].item == '1' ){
            this.props.missedTile();
        } 
    
    }

 


    render() {
        return (
            
                <FlatList
                ref='FlatList'
                inverted={true}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                onViewableItemsChanged={this.missedTile}
                onEndReached={!this.state.generating && this.props.endReached}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index}

                data={this.state.dataSource}
                extraData={this.state}

                renderItem={({item, index}) => 
                this.renderItem({item,index})}
                />
            
            

        )
    }
};

AppRegistry.registerComponent('Scroll', () => Scroll);
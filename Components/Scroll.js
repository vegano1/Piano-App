import React, { Component } from 'react';
import { 
    AppRegistry, 
    View, 
    Text, 
    TouchableNativeFeedback, 
    FlatList, 
    Dimensions,
    Vibration
    
 } from 'react-native';

import styles from '../Styles/Styles';
import { InvertibleFlatList } from 'react-native-invertible-flatlist';

export default class Scroll extends Component {

    constructor(props) {
        super(props);
        this.state = {

            dataSource: this.props.dataSource,
            paused : false,

        };

        this.renderItem = this.renderItem.bind(this);
        this.tileColor = this.tileColor.bind(this);
        this.startTile = this.startTile.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    
    componentWillReceiveProps(nextProps) {
        
        this.setState({
            dataSource: nextProps.dataSource,
            paused : !nextProps.onPause,
        });

    }

    componentDidUpdate(props) {

        this.refs.FlatList.scrollToOffset({ offset: this.props.scrollPos });
        
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
        if (item == 1 && index == 1) {

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

        if (data[index] == '0') {

            data.splice(index, 1, '2');
            Vibration.vibrate([0, 500, 0, 500]);
            this.props.stopGame();
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


    render() {
        return (

            <InvertibleFlatList
            inverted={true}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            onEndReached={this.props.endReached}
            onEndReachedThreshold={0.1}
            disableVirtualization={false}
            ref='FlatList'
            keyExtractor={(item, index) => index}
            data={this.state.dataSource}
            extraData={this.state}
            renderItem={({item, index}) => this.renderItem({item,index})}
            />
        )
    }
};

AppRegistry.registerComponent('Scroll', () => Scroll);


            // <ListView style={styles.scrollView}
            //     renderScrollComponent={(props, sectionID) =>
            //         <InvertibleScrollView {...props} inverted />}
            //     onChangeVisibleRows={(visibleRows, changedRows)=>this.handleChange.bind(this)}
            //     scrollEnabled={false}
            //     onEndReached={this.props.endReached}
            //     onEndReachedThreshold={10}
            //     ref='listView'
            //     showsVerticalScrollIndicator={false}
            //     dataSource={this.state.dataSource}
            //     renderRow={(rowData, rowID, sectionID) =>

            //         <TouchableNativeFeedback
            //             disabled={this.state.paused}
            //             background={TouchableNativeFeedback.Ripple('#0288D1', true)}
            //             onPressIn={() => this.handlePress(sectionID, rowID)}
            //         >

            //             <View style={[styles.item]}>

            //                 <View ref='item' style={this.tileColor(rowData)}>
            //                     {this.startTile(rowData, sectionID)}
            //                 </View>
            //             </View>

            //         </TouchableNativeFeedback>

            //     }>

            // </ListView>
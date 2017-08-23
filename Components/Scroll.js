import React, { Component } from 'react';
import { AppRegistry, View, Text, TouchableNativeFeedback, ListView, Dimensions } from 'react-native';
import styles from '../Styles/Styles';
import InvertibleScrollView from 'react-native-invertible-scroll-view';


var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


export default class Scroll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: ds.cloneWithRows(this.props.dataSource),
            newDataSource: null,
            paused : false,

        };

        this.startGame = this.startGame.bind(this);
    }


    keyColor(rowData) {

        switch (rowData) {
            case 1:
                return {
                    flex: 1,
                    borderRadius: 15,
                    borderWidth: 1,
                    backgroundColor: '#0288D1',
                    borderColor: '#B3E5FC',
                    alignItems: 'center',


                };
            case 2:
                return {
                    flex: 1,
                    borderRadius: 15,
                    borderWidth: 1,
                    backgroundColor: 'red',
                    borderColor: '#B3E5FC',

                };


        }

    }

    // componentDidMount(props) {
         
        
    // }



    componentWillReceiveProps(nextProps) {
        
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.dataSource),
            paused : !nextProps.onPause,
        });

    }


    componentDidUpdate(nextProps, props) {

        this.refs.listView.scrollTo({ y: this.props.scrollPos });
    }

    handlePress(sectionID, rowID) {

        let data = this.props.dataSource;

        if (data[sectionID] == 0) {

            data.splice(sectionID, 1, 2);
            let newDataSource = ds.cloneWithRows(data);
            this.setState({
                dataSource: newDataSource,
            });
            this.props.stopGame();
        }
        else {

            data.splice(sectionID, 1, 0);
            let newDataSource = ds.cloneWithRows(data);
            this.setState({
                dataSource: newDataSource,
            });
            this.props.Action();
        }

    }

    startGame(rowData, sectionID) {

        if (rowData == 1 && sectionID == 1) {

            return (

                <Text
                    style={{
                        flex: 1,
                        fontSize: 30,
                        fontWeight: 'bold',
                        lineHeight: 90


                    }}

                >Start</Text>
            )

        }
    }



    render() {
        return (


            <ListView style={styles.scrollView}
                renderScrollComponent={(props, sectionID) =>
                    <InvertibleScrollView {...props} inverted />}
                    
                scrollEnabled={false}
                onEndReached={this.props.endReached}
                onEndReachedThreshold={10}
                ref='listView'
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                renderRow={(rowData, rowID, sectionID) =>

                    <TouchableNativeFeedback
                        disabled={this.state.paused}
                        background={TouchableNativeFeedback.Ripple('#0288D1', true)}
                        onPressIn={() => this.handlePress(sectionID, rowID)}
                    >

                        <View style={[styles.item]}>

                            <View ref='item' style={this.keyColor(rowData)}>
                                {this.startGame(rowData, sectionID)}
                            </View>
                        </View>

                    </TouchableNativeFeedback>

                }>

            </ListView>



        )
    }

}

AppRegistry.registerComponent('Scroll', () => Scroll);
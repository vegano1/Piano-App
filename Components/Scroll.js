import React, {Component} from 'react';
import {AppRegistry, View, Text, TouchableNativeFeedback, ListView, Dimensions, TimerMixin} from 'react-native';
import styles from '../Styles/Styles';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

var RCTUIManager = require('NativeModules').UIManager;



var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Scroll extends Component{
    constructor(props){
        super(props);
        this._data = [];
        this.state = {
            dataSource: ds.cloneWithRows(this.props.dataSource), 
            newDataSource : null,
            start : false,
            

        };
    
    }





keyColor(rowData){
if(rowData==1){
    return {

     backgroundColor:'#0288D1',
     height:Dimensions.get('window').height,
     width:Dimensions.get('window').width,
     borderTopWidth : 0.3,

     borderColor : '#B3E5FC',
    
    };

}
else{
     return {

     backgroundColor:'#B3E5FC',
     height:Dimensions.get('window').height,
     width:Dimensions.get('window').width
    
    };
}

}

    componentDidMount(props) {
    
    this.refs.listView.scrollTo({y : this.props.scrollPos});

    }

 

    componentWillReceiveProps(nextProps){
        
            this.setState({
            dataSource : ds.cloneWithRows(nextProps.dataSource)
            });   
   
    }


   componentDidUpdate(nextProps, props){

       this.refs.listView.scrollTo({y : this.props.scrollPos});
   }

   handlePress(sectionID){

       let data = this.props.dataSource;
       console.log(data[sectionID]);
       if(data[sectionID]==1){
        console.log(data[sectionID]);
        data.splice(sectionID, 1, 0);

        let newDataSource = ds.cloneWithRows(data);
        this.setState({
            dataSource : newDataSource,
        });
       }

      
   }



    render()
    {
        return (
          

                <ListView style ={styles.scrollView} 
                renderScrollComponent={(props,sectionID) => 
                <InvertibleScrollView {...props} inverted />}
               
                ref='listView'
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                renderRow={(rowData, rowID, sectionID) => 
                
                <TouchableNativeFeedback
                
                onPress={()=>this.handlePress(sectionID)}
              
                
                >
          
                    <View style={[styles.item]}>

                    <View ref='item' style={this.keyColor(rowData)}>
                    <Text>{rowData}</Text>
                    </View>
                    </View>
                

                </TouchableNativeFeedback>

                
                }>
                </ListView>

          

        )
    }

}

AppRegistry.registerComponent('Scroll', () => Scroll);
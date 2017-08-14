import React, {Component} from 'react';
import {AppRegistry, View, Text, TouchableNativeFeedback, ListView, Dimensions} from 'react-native';
import styles from '../Styles/Styles';





var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Scroll extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            dataSource: ds.cloneWithRows(this.props.dataSource), 
            newDataSource : null,
            itemColor : ''

        };
    
    }





keyColor(rowData){
if(rowData==1){
    return {

     backgroundColor:'black',
     height:Dimensions.get('window').height,
     width:Dimensions.get('window').width
    
    };

}
else{
     return {

     backgroundColor:'white',
     height:Dimensions.get('window').height,
     width:Dimensions.get('window').width
    
    };
}

}

componentDidMount(props){
    
    

    

}
   componentDidUpdate(nextProps, props){

                this.refs.listView.scrollTo({y : this.props.scrollPos});
   }

   handlePress(sectionID){
       let data = this.props.dataSource;
       if(data[sectionID]==1){

        data.splice(sectionID, 1, 0);

        let newDataSource = ds.cloneWithRows(data);
        this.setState({
            dataSource : newDataSource,
        });
       }

      console.log(this.props.name + ': ' + data);
   }

    render()
    {
        return (
          

                <ListView style ={styles.scrollView} 
                //onEndReached={this.props.scrollDown}
                //onEndReachedThreshold={10}
                //scrollEnabled={false}
                onEndReached={this.props.endReached}
                onEndReachedThreshold={10}
                ref='listView'
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                renderRow={(rowData, rowID, sectionID) => 
                
                <TouchableNativeFeedback
                onPress={()=>this.handlePress(sectionID)}
                >
          
                    <View style={[styles.item]}>

                    <View ref='item' style={this.keyColor(rowData)}>
                    <Text> {rowData}</Text>
                    </View>
                    </View>
                

                </TouchableNativeFeedback>

                
                }>
                </ListView>

          

        )
    }

}

AppRegistry.registerComponent('Scroll', () => Scroll);
import React, {Component} from 'react';
import {AppRegistry, View, Text, TouchableNativeFeedback, ListView, Dimensions} from 'react-native';
import styles from '../Styles/Styles';




var data = [];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Scroll extends Component{
    constructor(props){
        super(props);
        let data = this.generateKeys();
        
        this.state = {
            dataSource: ds.cloneWithRows(data), 
            newDataSource : null,
            itemColor : ''

        };
    console.log(this.state.dataSource);
    }



generateKeys(){
    
    let current;
    for(var i=0;i<9;i++){
    current = Math.floor(Math.random().toPrecision(1) * 9);
    

        switch(current){
            case 0: data[i] = 0;
            break;
            case 1: data[i] = 1;
            break;
            case 2: data[i] = 0;
            break;
            case 3: data[i] = 0;
            break;
            case 4: data[i] = 1;
            break;
            case 5: data[i] = 1;
            break;
            case 6: data[i] = 1;
            break;
            case 7: data[i] = 1;
            break;
            case 8: data[i] = 0;
            break;
            case 9: data[i] = 1;
            break;
        }
    }
    
    
    return data;
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
                scrollEnabled={false}
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
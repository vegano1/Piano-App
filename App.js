import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  ListView,
  Image,
  View,
  Dimensions,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';

var scrollDown = 0;

export default class App extends Component {

   constructor(props){
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
       
         dataSource: ds.cloneWithRows([
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
         ]), 
        OffSet : 0,
        number  : 0,
     };
    this.timer = null;
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
   
    }



      stopTimer() {
        clearTimeout(this.timer);
      }

      setOffSet(event){this.setState({OffSet : event.nativeEvent.contentOffset.y});
      console.log(this.state.OffSet);}
      scrollUp(event, refs, scrollViewRef){ 


      this.refs.scrollViewL.scrollTo({y: this.state.OffSet - 100 }, {animated: true});
      this.refs.scrollViewM.scrollTo({y: this.state.OffSet - 100 }, {animated: true});
      this.refs.scrollViewR.scrollTo({y: this.state.OffSet - 100 }, {animated: true});
      
      var mh = new Animated.Value(30);
      this.setState({OffSet: this.state.OffSet - 100});
      Animated.timing(mh, {toValue: 200}).start();

         this.timer = setTimeout(this.scrollUp, 200);

        //To update the pos of scrollViewR on the screen
        //  this.setState({
        //    myText : event.nativeEvent.contentOffset.y
        //  });
        console.log(this.state.OffSet);
        
   }

   scrollDown(event, refs){

      this.refs.scrollViewL.scrollTo({y: this.state.OffSet + 100 }, {animated: true});
      this.refs.scrollViewM.scrollTo({y: this.state.OffSet + 100 }, {animated: true});
      this.refs.scrollViewR.scrollTo({y: this.state.OffSet + 100 }, {animated: true});
      
      
      var mh = new Animated.Value(30);
      this.setState({OffSet: this.state.OffSet + 100});
      Animated.timing(mh, {toValue: 200}).start();

      this.timer = setTimeout(this.scrollDown, 200);
      console.log(this.state.OffSet);
   }

      addRow(){
       Alert.alert('alerting');
     this.setState({
       names : this.state.names.concat({'name' : 'Brayan', 'id':13})
     });

     console.log(this.state.names);
   }

       removeRow(){
       Alert.alert('alerting');
      this.setState({
       names : this.state.names.concat({'name' : 'Brayan', 'id':13})
     });

     console.log(this.state.names);
   }

  render() {
    return (
         <View >
           <View style={{height:25}}></View>

          <View style={styles.container}>


          
            <TouchableNativeFeedback  
            onPressIn={(event, refs) => this.scrollUp(event, refs)} 
            onPressOut={this.stopTimer}
            >
            <View style = { styles.buttonT }>
                <Text >Scroll Up</Text>
            </View>
            </TouchableNativeFeedback>

            {/* Scrollview */}
            



            <View style ={{flexDirection:'row'}}>
            <ListView style ={styles.scrollView} 
            ref='scrollViewL'
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.item}>{rowData}</Text>}
            >
            </ListView>
                        <ListView style ={styles.scrollView} 
            ref='scrollViewM'
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.item}>{rowData}</Text>}
            >
            </ListView>
                        <ListView style ={styles.scrollView} 
            ref='scrollViewR'
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.item}>{rowData}</Text>}
            >
            </ListView>
            </View>

            
            
                <View style={{height:25}}>
                  <Text>{this.state.myText}</Text>
                </View>


                <TouchableNativeFeedback  
                //onPress={this.handdlePress.bind(this)}>
                onPressIn={(event, refs) => this.scrollDown(event, refs)} 
                onPressOut={this.stopTimer}
                >
                
                  
                  <View style={styles.buttonB}>
                    <Text>Scroll Down</Text>
                  </View>
                </TouchableNativeFeedback>

            </View>

         </View>
    );
  }
}













const styles = StyleSheet.create ({
  container: {
      borderWidth : 2,
      borderColor : 'black',


  },
  scrollView : {

      height: Dimensions.get('window').height*0.71,
      backgroundColor : 'black',

    },
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      height: Dimensions.get('window').height * 0.23,
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   },

      buttonT: {
      height: Dimensions.get('window').height/8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth : 4,
      borderLeftWidth : 1,
      borderRightWidth : 1,
      borderColor: 'black',
      backgroundColor: '#FF9900',

  
    },

      buttonB: {
      height: Dimensions.get('window').height/8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth : 4,
      borderColor: 'black',
      borderColor: 'black',
      backgroundColor: '#FF9900',
   
    },

      rows: {

      }
})


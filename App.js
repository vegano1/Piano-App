import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  View,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';

var scrollDown = 0;

export default class App extends Component {

   constructor(props){
     super(props);
     this.state = {
             names: [
         {'name': 'Ben', 'id': 1},
         {'name': 'Susan', 'id': 2},
         {'name': 'Robert', 'id': 3},
         {'name': 'Mary', 'id': 4},
         {'name': 'Daniel', 'id': 5},
         {'name': 'Laura', 'id': 6},
         {'name': 'John', 'id': 7},
         {'name': 'Debra', 'id': 8},
         {'name': 'Aron', 'id': 9},
         {'name': 'Ann', 'id': 10},
         {'name': 'Steve', 'id': 11},
         {'name': 'Olivia', 'id': 12}
      ], OffSet : 0,
        number  : 0,
     };
    this.timer = null;
    this.scrollDown = this.addOne.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
   
    }



      stopTimer() {
        clearTimeout(this.timer);
      }

      setOffSet(event){this.setState({OffSet : event.nativeEvent.contentOffset.y});
      console.log(this.state.OffSet);}
      scrollUp(event, refs, scrollViewRef){ 


        
         this.refs.scrollViewR.scrollTo({  y:  this.state.OffSet-100, animated: true});
         this.refs.scrollViewM.scrollTo({  y:  this.state.OffSet-100, animated: true});
         this.refs.scrollViewL.scrollTo({  y:  this.state.OffSet-100, animated: true});
         
         this.timer = setTimeout(this.scrollUp, 200);

        //To update the pos of scrollViewR on the screen
        //  this.setState({
        //    myText : event.nativeEvent.contentOffset.y
        //  });
        
   }

   scrollDown(event, refs){
         this.refs.scrollViewR.scrollTo({  y:  this.state.OffSet+100, animated: true});
         this.refs.scrollViewM.scrollTo({  y:  this.state.OffSet+100, animated: true});
         this.refs.scrollViewL.scrollTo({  y:  this.state.OffSet+100, animated: true});
          this.timer = setTimeout(this.scrollDown, 200);
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
            onPressOut={this.stopTimer}>
            <View style = { styles.buttonT }>
                <Text >Scroll Up</Text>
            </View>
            </TouchableNativeFeedback>

            {/* Scrollview */}
            <View style = {{flexDirection: 'row'}}>

            <ScrollView style = { styles.scrollView }

            ref={'scrollViewL'}
            scrollEnabled={false}
            >
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = { styles.item } >
                        <Text style = {{alignItems:'center'}}> {item.name}</Text>
                     </View>
                  ))   
               }
               
            </ScrollView>

            <ScrollView style={styles.scrollView}
            ref={'scrollViewM'}
            scrollEnabled={false}
            >
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = { styles.item } >
                        <Text style = {{alignItems:'center'}}> {item.name} {this.state.scrollDown}</Text>
                     </View>
                  ))
               }
               
            </ScrollView>

            
            <ScrollView style={styles.scrollView}
            ref='scrollViewR'
            onScroll  = {(event)=> this.setOffSet(event)}
            
            >
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = { styles.item } >
                        <Text style = {{alignItems:'center'}}> {item.name}</Text>
                     </View>
                  ))   
               }
            </ScrollView>

            </View>
            
                <View style={{height:25}}>
                  <Text>{this.state.myText}</Text>
                </View>


                <TouchableNativeFeedback  
                //onPress={this.handdlePress.bind(this)}>
                onPressIn={(event, refs) => this.scrollDown(event, refs)} 
                onPressOut={this.stopTimer}>
                
                  
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
})


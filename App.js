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
      ]
     }
   }

   pressMe1(){
       Alert.alert('alerting');
     this.setState({
       names : this.state.names.concat({'name' : 'Brayan', 'id':13})
     })

     console.log(this.state.names);
   }

      pressMe2(){
       Alert.alert('alerting');
     this.setState({
       names : this.state.names.concat({'name' : 'Snow', 'id':14})
     })

     console.log(this.state.names);
   }
  render() {
    return (
         <View >
           <View style={{height:25}}></View>

          <View style={styles.container}>


          
            <TouchableNativeFeedback  
            onPress={ this.pressMe1.bind(this) }>
            <View style = { styles.buttonT }>
                <Text >Press me!</Text>
            </View>
            </TouchableNativeFeedback>

            {/* Scrollview */}
            <View style = {{flexDirection: 'row'}}>

            <ScrollView style = { styles.scrollView }

            ref={ ref => this.ScrollView = ref }
           
            onContentSizeChange={(contentWidth, contentHeight)=> {
            this.ScrollView.scrollTo({x:0, y:0, animated: true}); //use scollTo to controll speed
            }}
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
            ref={ref => this.ScrollView = ref}
           
            onContentSizeChange={(contentWidth, contentHeight)=> {
             this.ScrollView.scrollTo({x:0, y:0, animated: true}); //use scollTo to controll speed
            }}>
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = { styles.item } >
                        <Text style = {{alignItems:'center'}}> {item.name}</Text>
                     </View>
                  ))
               }
               
            </ScrollView>

            
                        <ScrollView style={styles.scrollView}
            ref={ref => this.ScrollView = ref}
           
            onContentSizeChange={(contentWidth, contentHeight)=> {
             this.ScrollView.scrollTo({x:0, y:0, animated: true}); //use scollTo to controll speed
            }}>
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = { styles.item } >
                        <Text style = {{alignItems:'center'}}> {item.name}</Text>
                     </View>
                  ))   
               }
               
            </ScrollView>
            </View>


                <TouchableNativeFeedback  
                onPress={this.pressMe2.bind(this)}>
                  <View style={styles.buttonB}>
                    <Text   >Press me!</Text>
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


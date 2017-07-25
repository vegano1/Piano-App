import React, {Component} from 'react'
import {AppRegistry, View, Text, StyleSheet, Dimensions, TouchableNativeFeedback} from 'react-native'
import Component1 from './Components/component1'


export default class App extends Component{

  

  render (){
    return (
      <View style = { styles.container } >

        

      <View style ={styles.row1}> 
            <Component1 color='green' style={styles.component} />
            <Component1 color='green' style={styles.component} />
            <Component1 color='green' style={styles.component} />
            <Component1 color='green' style={styles.component} />
            <Component1 color='green' style={styles.component} />
      </View>

      <View style ={styles.row1}>
            <Component1 color='red' style={styles.component} />
            <Component1 color='red' style={styles.component} />
            <Component1 color='red' style={styles.component} />
            <Component1 color='red' style={styles.component} />
            <Component1 color='red' style={styles.component} />
      </View>
      <View style ={styles.row1}>
            <Component1 color='purple' style={styles.component} />
            <Component1 color='purple' style={styles.component} />
            <Component1 color='purple' style={styles.component} />
            <Component1 color='purple' style={styles.component} />
            <Component1 color='purple' style={styles.component} />
      </View>


       

      </View>
    );
  }
}

const styles = StyleSheet.create({
        container : {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          flexDirection: 'row',
          backgroundColor: 'red',

        },

        row1: {
        flex: 1,



        },

        row1: {
        flex: 1,

        },

        row1: {
        flex: 1,

        },

          
    }      
)

AppRegistry.registerComponent('App', () => App);
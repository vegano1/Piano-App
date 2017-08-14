
import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create ({
  container: {

      


  },
  scrollView : {

    flex: 1,
      height: Dimensions.get('window').height*0.94,
      
    

    },
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: Dimensions.get('window').height * 0.23,
      borderLeftWidth:0.3,
   },

      MenuButton: {

      height: Dimensions.get('window').height/15,
      width: Dimensions.get('window').width/2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth : 1,
      borderLeftWidth : 1,
      borderRightWidth : 1,
      borderColor: 'black',

      backgroundColor : '#0097A7'
    },

      TopMenu: {
      flexDirection:'row',
    },

      TopMenuItems: {
      height: Dimensions.get('window').height/8,
      width: Dimensions.get('window').width/2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth : 1,
      borderLeftWidth : 1,
      borderRightWidth : 1,
      borderColor: 'black',
      backgroundColor: '#FF9900',

  
    },

      bottomMenu: {
      flexDirection:'row',
    },

      bottomMenuItems: {
      height: Dimensions.get('window').height/8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth : 1,
      borderColor: 'black',
      backgroundColor: '#FF9900',
   
    },
});


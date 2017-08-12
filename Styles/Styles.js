
import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create ({
  container: {
      borderWidth : 2,
      borderColor : 'black',
      backgroundColor : 'red',


  },
  scrollView : {

      height: Dimensions.get('window').height*0.71,
    

    },
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      height: Dimensions.get('window').height * 0.23,
      
      backgroundColor: 'white',
      borderLeftWidth:1,
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
      width: Dimensions.get('window').width/2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth : 1,
      borderColor: 'black',
      backgroundColor: '#FF9900',
   
    },
});


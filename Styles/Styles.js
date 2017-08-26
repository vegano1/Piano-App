
import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#B3E5FC'



  },
  scrollView: {

    flex: 1,
    height: Dimensions.get('window').height,



  },
  item: {
    flexDirection: 'row',
    height: Dimensions.get('window').height * 0.23,
    borderLeftWidth: 0.3,
  },

  menuShort: {

    height: Dimensions.get('window').height / 14,
    width: Dimensions.get('window').width / 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,

    backgroundColor: '#0097A7',

  },

  bottomLeft: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 10,


    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,

    backgroundColor: 'black',

    shadowRadius: 5,
    elevation: 3,
  },

  Picker : {
    justifyContent: 'center',
    alignSelf : 'center',
    borderWidth: 1,
    borderColor:'black',
    borderRadius: 5,
    height: Dimensions.get('window').height / 14,
    width: Dimensions.get('window').width / 11,
    backgroundColor:'#0097A7'
  },


  bottomRight : {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,

    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,

    backgroundColor: 'black',

    shadowRadius: 5,
    elevation: 3,


  },

  scoreText : {
    alignSelf : 'center',
    fontSize : 20,
    fontWeight : 'bold'
  },
  scoreIcon : {
    position:'absolute',
    right:35,
    top:5
  },

  heartIcon : {
    position:'absolute',
    right:34,
    top:4
  },

  heartText : {
    alignSelf : 'center',
    
    fontSize : 20,
    fontWeight : 'bold'
  },

  restart : {
    justifyContent: 'center',
    alignSelf : 'center',
    width : 20,
    height : 20,

  }
});


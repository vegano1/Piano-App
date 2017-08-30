
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

  },

  gameOverMain : {
    height: Dimensions.get('window').height/4,
    width: Dimensions.get('window').width/1.5,
    position: 'absolute',
    top: 100,
    right: 70,

    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,

    backgroundColor: '#0288D1',

    shadowRadius: 5,
    elevation: 3,

    alignItems: 'center',
  },

  gameOverRestart : {

    height: Dimensions.get('window').height / 12,
    width: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    elevation: 10,

    backgroundColor: '#0097A7',
  }
});


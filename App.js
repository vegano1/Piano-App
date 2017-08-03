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
var momentum = 1;

var Keys = [
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
           'name', 'atributes', 'style',
         ];

     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class App extends Component {

   constructor(props){
     super(props);

     this.state = {
       
        dataSource: ds.cloneWithRows(Keys), 
        OffSet : 0,
        scroll  : 'null',
     };

    this.timer = null;
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.scrollEnd = this.scrollEnd.bind(this);
    this.PauseGame = this.PauseGame.bind(this);
    this.ResumeGame = this.ResumeGame.bind(this);
    }



      stopTimer() {
        clearTimeout(this.timer);
        momentum = 1;
      }

      setOffSet(event){this.setState({OffSet : event.nativeEvent.contentOffset.y});
      }



      scrollUp(event, refs, scrollViewRef){ 
      this.setState({scroll: 'up'});
      if(this.state.OffSet > 0){

        momentum = momentum * 1.3;

        if(momentum > 100){
          momentum = 100;
        }

        this.refs.scrollViewL.scrollTo({y: this.state.OffSet - momentum});
        this.refs.scrollViewM.scrollTo({y: this.state.OffSet - momentum});
        this.refs.scrollViewR.scrollTo({y: this.state.OffSet - momentum});
        this.setState({OffSet: this.state.OffSet - momentum});

        
        this.timer = setTimeout(this.scrollUp, 10);

        //To update the pos of scrollViewR on the screen
        //  this.setState({
        //    myText : event.nativeEvent.contentOffset.y
        //  });
        
        
      }
      else{
        this.setState({ OffSet: 0 });
        this.stopTimer();
        console.log('Top Reached');
      }


        
   }



   scrollDown(event, refs){
    // var KeyRow = [];
    

    // for(var i=0;i<20;i++){
    // KeyRow[i] = Math.floor(Math.random().toPrecision(1) * 10);
      


    
    
    // }

    this.setState({scroll: 'down'});
    momentum = momentum * 1.3;
    if(momentum > 100)
      momentum = 100;

    this.refs.scrollViewL.scrollTo({y: this.state.OffSet + momentum });
    this.refs.scrollViewM.scrollTo({y: this.state.OffSet + momentum });
    this.refs.scrollViewR.scrollTo({y: this.state.OffSet + momentum });

    this.setState({OffSet: this.state.OffSet + momentum});


    this.timer = setTimeout(this.scrollDown, 10);
      
   }


   scrollEnd(event){
         
        this.setState({OffSet : event.nativeEvent.contentOffset.y });
        this.stopTimer();

        console.log('End Reached');
   }

   PauseGame(){

   }

   ResumeGame(){
    if(this.state.scroll ==='up'){
      console.log('continue up');
      this.scrollUp();
    }
    else if(this.state.scroll ==='down'){
      console.log('continue down');
      this.scrollDown();
    }
   }

  render() {
    return (
         <View >
           <View style={{height:25}}></View>

          <View style={styles.container}>


          
          <View style ={styles.TopMenu}>

            <TouchableNativeFeedback  
            onPressIn={(event, refs) =>{}} 
            onPressOut={this.stopTimer}
            >
            <View style = { styles.TopMenuItems }>
                <Text >PauseGame</Text>
            </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback  
            onPressIn={(event, refs) =>this.ResumeGame(event)} 
            
            >
            <View style = { styles.TopMenuItems }>
                <Text >ResumeGame</Text>
            </View>
            </TouchableNativeFeedback>


          </View>

            {/* Scrollview */}
            



            <View style ={{flexDirection:'row'}}>
            <ListView style ={styles.scrollView} 
          
            onEndReached={(event)=> this.scrollEnd(event)}
            onEndReachedThreshold={10}

            ref='scrollViewL'
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.item}>{rowData}</Text>}
            >
            </ListView>

            <ListView style ={styles.scrollView} 
            scrollEnabled={false}
            ref='scrollViewM'
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.item}>{rowData}</Text>}
            >
            </ListView>

            <ListView style ={styles.scrollView} 
            scrollEnabled={false}
            ref='scrollViewR'
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.item}>{rowData}</Text>}
            >
            </ListView>

            </View>

              <View style={styles.bottomMenu}>

            <TouchableNativeFeedback  
            onPressIn={(event, refs) => this.scrollUp(event, refs)} 
            
            >
            <View style = { styles.bottomMenuItems }>
                <Text >Scroll Up</Text>
            </View>
            </TouchableNativeFeedback>
                <TouchableNativeFeedback  
                //onPress={this.handdlePress.bind(this)}>
                onPressIn={(event, refs) => this.scrollDown(event, refs)} 
                
                >
                
                  
                  <View style={styles.bottomMenuItems}>
                    <Text>Scroll Down</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

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

      TopMenu: {
      flexDirection:'row',
    },

      TopMenuItems: {
      height: Dimensions.get('window').height/8,
      width: Dimensions.get('window').width/2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth : 4,
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
      borderWidth : 4,
      borderColor: 'black',
      borderColor: 'black',
      backgroundColor: '#FF9900',
   
    },
})


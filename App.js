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
  TouchableHighlight,
  Animated,
} from 'react-native';

import styles from './Styles/Styles';
import MenuButton from './Components/Button';
import Scroll from './Components/Scroll';

var scrollDown = 0;
var momentum = 1;



    
export default class App extends Component {

   constructor(props){
     super(props);

     this.state = {
       
        
        OffSet : 0,
        scroll  : 'null',
        direction: '',
     };

    this.timer = null;
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.PauseGame = this.PauseGame.bind(this);
    this.ResumeGame = this.ResumeGame.bind(this);
    }



      stopTimer() {
        clearTimeout(this.timer);
        momentum = 1;
        console.log('pause');
      }


      scrollUp(event, refs, scrollViewRef){ 
   
      if(this.state.OffSet > 0){
              

        momentum = momentum * 1.3;

        if(momentum > 50){
          momentum = 50;
        }

        this.setState({OffSet: this.state.OffSet - momentum});

        
        this.timer = setTimeout(this.scrollUp, 10);

        //To update the pos of scrollViewR on the screen
        //  this.setState({
        //    myText : event.nativeEvent.contentOffset.y
        //  });
        
        
      }
      else{
        this.stopTimer();
        this.setState({ OffSet: 0 });
        console.log('Top Reached');
      }


        
   }


  scrollDown(event, refs){
    // var KeyRow = [];
    

    // for(var i=0;i<20;i++){
    // KeyRow[i] = Math.floor(Math.random().toPrecision(1) * 10);
    
    
    momentum = momentum * 1.3;
    if(momentum > 50)
      momentum = 50;


    this.setState({OffSet: this.state.OffSet + momentum});


    this.timer = setTimeout(this.scrollDown, 10);

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
         <View>
           <View style={{height:25}}></View>

           <View style={styles.TopMenu}>

             <MenuButton name='Stop'
             Action={this.PauseGame}
             />
             <MenuButton name='Resume'/>

           </View>

            <View style ={{flexDirection:'row'}}>               


                <Scroll name='1' endReached= {this.stopTimer} scrollPos = {this.state.OffSet} />
                <Scroll name='2' scrollPos = {this.state.OffSet}  />
                <Scroll name='3' scrollPos = {this.state.OffSet}  />
                <Scroll name='4' scrollPos = {this.state.OffSet}  />

            </View>

            <View style={styles.bottomMenu}>

             <MenuButton name='Scroll Down'
             Action={this.scrollDown}
             />


             <MenuButton name='Scroll Up'
             Action={this.scrollUp}
             />

             
           </View>
         </View>
    );
  }
}












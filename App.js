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
  StatusBar,
  
} from 'react-native';

import styles from './Styles/Styles';
import MenuButton from './Components/Button';
import Scroll from './Components/Scroll';



var momentum = 1;
    
export default class App extends Component {

   constructor(props){
     super(props);
  
   
     this.state = {
       
        dataSource1 : this.generateKeys(9),
        dataSource2 : this.generateKeys(9),
        dataSource3 : this.generateKeys(9),
        dataSource4 : this.generateKeys(9),

        OffSet : 0,
        scroll  : 'null',
        pressed : false,
        paused : true,
     };

    this.timer = null;
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startStop = this.startStop.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.generateKeys = this.generateKeys.bind(this);
    this.endReached = this.endReached.bind(this);
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

      momentum = momentum * 1.3;
      if(momentum > 40)
        momentum = 40;

      this.setState({
        OffSet: this.state.OffSet + momentum,
        
      });
      this.timer = setTimeout(this.scrollDown, 10);
   }



   startStop(){
     
    let newValue = !this.state.paused;
    this.setState({paused : newValue});
    if(!newValue){

      console.log('scrolling');
      this.scrollDown();
    }
    else{
      console.log('paused');
      this.stopTimer();
  }
   }

   resetGame(){
     
     this.stopTimer();
     
     this.setState({
        dataSource1 : this.generateKeys(9),
        dataSource2 : this.generateKeys(9),
        dataSource3 : this.generateKeys(9),
        dataSource4 : this.generateKeys(9),
        OffSet : 0,
        paused : true,
     });
      
   }

generateKeys(totalKeys){
    
    let arr= [0];
    let current;
    
    for(var i = 1 ; i < totalKeys ; i++){
    current = Math.floor(Math.random().toPrecision(1) * 9);
    

        switch(current){
            case 0: arr[i] = 0;
            break;
            case 1: arr[i] = 1;
            break;
            case 2: arr[i] = 0;
            break;
            case 3: arr[i] = 0;
            break;
            case 4: arr[i] = 1;
            break;
            case 5: arr[i] = 1;
            break;
            case 6: arr[i] = 1;
            break;
            case 7: arr[i] = 1;
            break;
            case 8: arr[i] = 0;
            break;
            case 9: arr[i] = 1;
            break;
        }
    }
  

    return arr;
}

endReached(data){
  console.log(data);
}



  render() {
    return (
      
         <View style={styles.container}>
           <StatusBar hidden={true} />
           

           {/* <View style={styles.TopMenu}>

             <MenuButton name='Stop'
             Action={this.PauseGame}
             />
             <MenuButton name='Resume'/>

           </View> */}

            <View style ={{flexDirection:'row'}}>               


                <Scroll Action={this.scrollDown} 
                dataSource={this.state.dataSource1}  
                scrollPos = {this.state.OffSet} />

                <Scroll Action={this.scrollDown}  
                dataSource={this.state.dataSource2} 
                scrollPos = {this.state.OffSet}  />

                <Scroll Action={this.scrollDown} 
                dataSource={this.state.dataSource3} 
                scrollPos = {this.state.OffSet}  />

                <Scroll Action={this.scrollDown} 
                dataSource={this.state.dataSource4} 
                scrollPos = {this.state.OffSet}  />

            </View>

             <View style={styles.bottomMenu}>

             <MenuButton name='Pause/Resume'
             Action={this.startStop}
             />
             <MenuButton name='Reset'
             Action={this.resetGame}
             />
           </View> 

           
         </View>
    );
  }
}












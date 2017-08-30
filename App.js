import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ToastAndroid,
  Picker,
  Image,
  Modal,
  TouchableNativeFeedback

} from 'react-native';

import styles from './Styles/Styles';
import MenuButton from './Components/Button';
import Scroll from './Components/Scroll';
import Hearts from './Components/Hearts';
import Modals from './Components/Modals';
//import Sound from 'react-native-sound';

// Import the react-native-sound module

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
// var ding = new Sound('./assets/sounds/ding.wav', Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
//     // loaded successfully
//     console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
//   });


var momentum = 1;
var icon = [
  require('./assets/icons/heart.png'),
  require('./assets/icons/restart.png'),
  require('./assets/icons/settings.png'),
  require('./assets/icons/play.png'),
  require('./assets/icons/pause.png'),
  require('./assets/icons/trophy.png'),

];

export default class App extends Component {

  constructor(props) {
    super(props);


    this.state = {

      dataSource1: this.generateKeys(19),
      dataSource2: this.generateKeys(19),
      dataSource3: this.generateKeys(19),
      dataSource4: this.generateKeys(19),

      OffSet: 0,
      firstTile: false,
      paused: true,
      pausedSymbol: icon[3],
      score: 0,
      disableButton : false,
      showBox : false,

    };

    this.timer = null;
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startStop = this.startStop.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.generateKeys = this.generateKeys.bind(this);
    this.startScroll = this.startScroll.bind(this);
    this.endReached = this.endReached.bind(this);
    this.renderText = this.renderText.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  stopTimer() {
    clearTimeout(this.timer);
    momentum = 1;
  }


  scrollUp(event, refs, scrollViewRef) {

    if (this.state.OffSet > 0) {

      momentum = momentum * 1.3; 

      if (momentum > 50) {
        momentum = 50;
      }

      this.setState({ OffSet: this.state.OffSet - momentum });

      this.timer = setTimeout(this.scrollUp, 10);

      //To update the pos of scrollViewR on the screen
      //  this.setState({
      //    myText : event.nativeEvent.contentOffset.y
      //  });

    }
    else {
      this.stopTimer();
      this.setState({ OffSet: 0 });
    }
  }


  scrollDown(event, refs) {

    momentum = momentum * 1.3;
    if (momentum > 15)
      momentum = 15;

    this.setState({
      OffSet: this.state.OffSet + momentum,

    });
    this.timer = setTimeout(this.scrollDown, 1);
  }



  startStop() {
    if (this.state.firstTile) {
      this.stopTimer();

      let newValue = !this.state.paused;

      if (newValue) {
        this.scrollDown();
        this.setState({ paused: newValue, pausedSymbol: icon[4] });
      }
      else {
        this.stopTimer();
        this.setState({ paused: newValue, pausedSymbol: icon[3] });
      }
    }
  }

  resetGame() {

    this.stopTimer();

    this.setState({
      dataSource1: this.generateKeys(19),
      dataSource2: this.generateKeys(19),
      dataSource3: this.generateKeys(19),
      dataSource4: this.generateKeys(19),
      OffSet: 0,
      paused: true,
      pausedSymbol: icon[3],
      firstTile: false,
      score: 0,
      disableButton : false,
      showBox : false,
    });

  }

  generateKeys(totalKeys) {

    let arr = ['*'];
    let current;

    for (var i = 1; i < totalKeys; i++) {
      current = Math.floor(Math.random().toPrecision(1) * 9);

      switch (current) {
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

    arr.push(0, 0, 0);

    return arr;
  }

  startScroll() {

      // Play the sound with an onEnd callback
//   ding.play((success) => {
//   if (success) {
//     console.log('successfully finished playing');
//   } else {
//     console.log('playback failed due to audio decoding errors');
//     // reset the player to its uninitialized state (android only)
//     // this is the only option to recover after an error occured and use the player again
//     whoosh.reset();
//   }
// });
    this.setState({ count: this.state.score++ });

    if (!this.state.firstTile && this.state.paused) {
      this.stopTimer();
      this.setState({ firstTile: true, pausedSymbol: icon[4], paused:true });
      this.scrollDown();
    }
  }

  endReached() {
    this.stopTimer();
    this.setState({ paused : false, disableButton : true, showBox: true });
    
    ToastAndroid.show('   Game Over \n your Score is: ' + this.state.score, 1);
  }

  renderText(){
    this.setState({showBox:true});
  }

  render() {
    return (

      <View style={styles.container}>
        <StatusBar hidden={true} />

        
        <View style={{ flexDirection: 'row' }}>
          

          <Scroll Action={this.startScroll}
            onPause ={this.state.paused}
            stopGame={this.endReached}
            endReached={this.endReached}
            dataSource={this.state.dataSource1}
            scrollPos={this.state.OffSet} />

          <Scroll Action={this.startScroll}
            onPause ={this.state.paused}
            stopGame={this.endReached}
            dataSource={this.state.dataSource2}
            scrollPos={this.state.OffSet} />

          <Scroll Action={this.startScroll}
            onPause ={this.state.paused}
            stopGame={this.endReached}
            dataSource={this.state.dataSource3}
            scrollPos={this.state.OffSet} />

          <Scroll Action={this.startScroll}
            onPause ={this.state.paused}
            stopGame={this.endReached}
            dataSource={this.state.dataSource4}
            scrollPos={this.state.OffSet} />

        </View>
        {this.state.showBox && <Modals Action={this.resetGame}/>}
        <View style={styles.bottomLeft}>

          <MenuButton           
          type={'image'} 
          typeInfo={this.state.pausedSymbol}
          Action={this.startStop}
          disableButton={this.state.disableButton}
          />

          <MenuButton 
          type={'image'} 
          typeInfo={icon[1]}
          Action={this.resetGame}
          disableButton={false}
          />

        </View>

        <View style={styles.bottomRight}>
        
            <View style={styles.menuShort}>
              <View style={styles.scoreIcon}>

              <Image style={{height:13, width:13}} source={icon[5]}/>
              </View>
                 <Text style={styles.scoreText}>{this.state.score}</Text>
            </View>

        <Hearts/>
            
            
        </View>
          
        

      </View>
    );
  }
}












import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ToastAndroid,
  Picker,
  Image

} from 'react-native';

import styles from './Styles/Styles';
import MenuButton from './Components/Button';
import Scroll from './Components/Scroll';



var momentum = 1;

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
      pausedSymbol: '►',
      score: 0,

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
      console.log('Top Reached');
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
        this.setState({ paused: newValue, pausedSymbol: '||' });
      }
      else {
        this.stopTimer();
        this.setState({ paused: newValue, pausedSymbol: '►' });
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
      pausedSymbol: '►',
      firstTile: false,
      score: 0
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

    this.setState({ count: this.state.score++ });

    if (!this.state.firstTile && this.state.paused) {
      this.stopTimer();
      this.setState({ firstTile: true, pausedSymbol: '||' });
      this.scrollDown();
    }
  }

  endReached() {
    this.stopTimer();
    this.setState({ paused : false });
    ToastAndroid.show('   Game Over \n your Score is: ' + this.state.score, 1);
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

        <View style={styles.bottomMenuContainer}>

          <MenuButton name={this.state.pausedSymbol}
            Action={this.startStop}
          />
          <MenuButton name='Reset'
            Action={this.resetGame}
          />

          <View style={styles.Picker}>
          <Picker
            mode='dropdown'
            prompt="testing"
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="easy" value="1" />
            <Picker.Item label="medium" value="2" />
            <Picker.Item label="hard" value="3" />
        </Picker>
        
          </View>
        </View>

        

      </View>
    );
  }
}












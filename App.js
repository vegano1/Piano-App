import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableNativeFeedback,
  Vibration

} from 'react-native';

import styles from './Styles/Styles';
import MenuButton from './Components/Button';
import Scroll from './Components/Scroll';
import Modals from './Components/Modals';

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
      dataSource : this.generateTiles(5),

      OffSet: 0,
      firstTile: false,
      paused: true,
      pausedSymbol: icon[3],
      score: 0,
      Hearts : 3,
      disableButton : false,
      showBox : false,

    };

    this.timer = null;
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startStop = this.startStop.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.generateTiles = this.generateTiles.bind(this);
    this.scoreKeeper = this.scoreKeeper.bind(this);
    this.endReached = this.endReached.bind(this);
    this.missedTile = this.missedTile.bind(this);
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

  scrollDown() {

    momentum = momentum * 1.3;
    if (momentum > 20)
      momentum = 20;

    this.setState({
      OffSet: this.state.OffSet + momentum,
    });
    this.timer = setTimeout(this.scrollDown, 0.5);
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
      dataSource: this.generateTiles(5),
      paused: true,
      pausedSymbol: icon[3],
      firstTile: false,
      disableButton : false,
      showBox : false,
      OffSet: 0,
      score: 0,
      Hearts : 3,
    });

  }

  generateTiles(Quantity) {

    let dataSource = [];

    for(let j = 0; j<=3; j++){

      let arr = ['*','0'];
      let current;

      for (var i = 2; i < Quantity; i++) {
        current = Math.floor(Math.random().toPrecision(1) * 9);
  
        switch (current) {
          case 0: arr[i] = '0';
            break;
          case 1: arr[i] = '1';
            break;
          case 2: arr[i] = '0';
            break;
          case 3: arr[i] = '0';
            break;
          case 4: arr[i] = '1';
            break;
          case 5: arr[i] = '1';
            break;
          case 6: arr[i] = '1';
            break;
          case 7: arr[i] = '1';
            break;
          case 8: arr[i] = '0';
            break;
          case 9: arr[i] = '1';
            break;
        }
      }

      // arr.push('0', '0', '0','0');
      dataSource.push(arr);
      
    }

      let random = Math.floor(Math.random().toPrecision(2) * 3);
      dataSource[random][1] = '1';

    return dataSource;

  }

  scoreKeeper() {

    this.setState({ count: this.state.score++ });

    if (!this.state.firstTile && this.state.paused) {
      
      this.stopTimer();
      this.setState({ firstTile: true, pausedSymbol: icon[4], paused:true });
      this.scrollDown();
    }
  }

  endReached() {
    // this.stopTimer();
    // this.setState({ paused : false, disableButton : true, showBox: true });
    let newDataSource = [];

    let data1 = this.state.dataSource[0];
    let data2 = this.state.dataSource[1];
    let data3 = this.state.dataSource[2];
    let data4 = this.state.dataSource[3];

    merged1 = data1.concat(this.generateTiles(5)[0]);
    merged2 = data2.concat(this.generateTiles(5)[1]);
    merged3 = data3.concat(this.generateTiles(5)[2]);
    merged4 = data4.concat(this.generateTiles(5)[3]);
    
    newDataSource.push(merged1);
    newDataSource.push(merged2);
    newDataSource.push(merged3);
    newDataSource.push(merged4);

    this.setState({dataSource : newDataSource});
    console.log(this.state.dataSource);
    //this.generateTiles(19);
  }


  missedTile(){
    if(this.state.firstTile){

      Vibration.vibrate([0, 500]);
      this.setState({Hearts : this.state.Hearts - 1});
      if(this.state.Hearts == 1){
        this.endReached();
      }
    }
    



  }


  render() {
    return (

      <View style={styles.container}>
        <StatusBar hidden={true} />

        
        <View style={{ flexDirection: 'row' }}>
          

          <Scroll Action={this.scoreKeeper}
            onPause ={this.state.paused}
            stopGame={this.endReached}
            endReached={this.endReached}
            dataSource={this.state.dataSource[0]}
            scrollPos={this.state.OffSet}
            missedTile={this.missedTile}
            firstTile = {this.state.firstTile} />

          <Scroll Action={this.scoreKeeper}
            onPause ={this.state.paused}
            stopGame={this.endReached}
            dataSource={this.state.dataSource[1]}
            scrollPos={this.state.OffSet}
            missedTile={this.missedTile}
            firstTile = {this.state.firstTile} />

          <Scroll Action={this.scoreKeeper}
            onPause ={this.state.paused}
            stopGame={this.endReached}
            dataSource={this.state.dataSource[2]}
            scrollPos={this.state.OffSet}
            missedTile={this.missedTile}
            firstTile = {this.state.firstTile} />

          <Scroll Action={this.scoreKeeper}
            onPause ={this.state.paused}
            stopGame={this.endReached}
            dataSource={this.state.dataSource[3]}
            scrollPos={this.state.OffSet}
            missedTile={this.missedTile}
            firstTile = {this.state.firstTile} />

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
                    <Image style={{height:13, width:13}} 
                    source={icon[5]}/>
                </View>
                <Text style={styles.scoreText}>{this.state.score}</Text>
            </View>

            <View style={styles.menuShort}>
                <View style={styles.heartIcon}>
                    <Image style={{width:13, height:13}}
                    source={icon[0]}/>
                </View>
                <Text style={styles.heartText}>{this.state.Hearts}</Text>
            </View>
               
        </View>
          
      </View>
    );
  }
}












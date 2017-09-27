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

var debounce = require('lodash.debounce');

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
    let totalTiles = 20;
    this.state = {
      totalTiles : totalTiles,
      dataSource : this.generateTiles(totalTiles),
      
      OffSet: 0,
      firstTile: false,
      paused: true,
      pausedSymbol: icon[3],
      score: 0,
      Hearts : 3,
      disableButton : false,
      showBox : false,
      speed : 100,

    };

    
    this.timer = null;
    this.scrollDown = this.scrollDown.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startStop = this.startStop.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.generateTiles = this.generateTiles.bind(this);
    this.scoreKeeper = this.scoreKeeper.bind(this);
    this.endReached = debounce(this.endReached.bind(this),200,{
      'leading': true,
      'trailing': false});
    this.missedTile = this.missedTile.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }

  stopTimer() {
    clearTimeout(this.timer);
    momentum = 1;
  }

  scrollUp(event, refs, scrollViewRef) {

    if (this.state.OffSet > 0) {

      momentum = momentum * 1.3; 

      if (momentum > 40) {
        momentum = 40;
      }

      this.setState({ OffSet: this.state.OffSet - momentum });

      this.timer = setTimeout(this.scrollUp, 2);

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
      OffSet: this.state.OffSet + 20,
    });
    this.timer = setTimeout(this.scrollDown, this.state.speed);
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
      
      paused: true,
      pausedSymbol: icon[3],
      firstTile: false,
      disableButton : false,
      showBox : false,
      OffSet: 0,
      score: 0,
      Hearts : 3,
      speed : 100,
      dataSource: this.generateTiles(this.state.totalTiles)
    });

  }

  generateTiles(Quantity) {

    let dataSource = [];

    for(let j = 0; j<=3; j++){

      let arr = ['0','0'];
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

      dataSource.push(arr);
      
    }

      let random = Math.floor(Math.random().toPrecision(2) * 3);
      dataSource[random][1] = '1';
    return dataSource;

  }

  scoreKeeper() {

    this.setState({ count: this.state.score++ });

    if(this.state.score==20){
      this.setState({speed : 80});
    }
    else if(this.state.score==50){
      this.setState({speed : 60});
    }
    else if(this.state.score==100){
      this.setState({speed : 40});
    }
    else if(this.state.score==200){
      this.setState({speed : 30});
    }
    else if(this.state.score==300){
      this.setState({speed : 20});
    }
    else if(this.state.score==400){
      this.setState({speed : 10});
    }
    else if(this.state.score==500){
      this.setState({speed : 5});
    }

    if (!this.state.firstTile && this.state.paused) {
      this.stopTimer();
      this.setState({ firstTile: true, pausedSymbol: icon[4], paused:true });
      this.scrollDown();
    }
  }

  endReached(info) {
    
      let newDataSource = [];
      let totalTiles = this.state.totalTiles;
      let newGeneratedData = this.generateTiles(totalTiles-5);
      let oldData = JSON.parse(JSON.stringify(this.state.dataSource));
      
      for(let x = 0; x <= 3 ;x++){
  
        let data = oldData[x];
        
        data.splice(0, totalTiles/2);
        let finalTiles = data.splice(totalTiles/4,5);
        data = finalTiles.concat(newGeneratedData[x]);
        newDataSource.push(data);
        
      }

       this.setState({dataSource : newDataSource, OffSet : 55});
    
  }


  missedTile(){
    if(this.state.firstTile){

      Vibration.vibrate([0, 500]);
      this.setState({Hearts : this.state.Hearts - 1});
      if(this.state.Hearts == 1){
        this.gameOver();
      }
    }
  }

  gameOver(){
    this.stopTimer();
    this.setState({ paused : false, disableButton : true, showBox: true });
  }

  


  render() {
    return (

      <View style={styles.container}>
        <StatusBar hidden={true} />

        
        <View style={{ flexDirection: 'row' }}>
          

            <Scroll Action={this.scoreKeeper}
            onPause ={this.state.paused}
            gameOver={this.gameOver}
            endReached={this.endReached}
            dataSource={this.state.dataSource[0]}
            scrollPos={this.state.OffSet}
            missedTile={this.missedTile}
            firstTile = {this.state.firstTile} />

            <Scroll Action={this.scoreKeeper}
            onPause ={this.state.paused}
            gameOver={this.gameOver}
            
            dataSource={this.state.dataSource[1]}
            scrollPos={this.state.OffSet}
            missedTile={this.missedTile}
            firstTile = {this.state.firstTile} />

            <Scroll Action={this.scoreKeeper}
            onPause ={this.state.paused}
            gameOver={this.gameOver}
            dataSource={this.state.dataSource[2]}
            scrollPos={this.state.OffSet}
            missedTile={this.missedTile}
            firstTile = {this.state.firstTile} />

            <Scroll Action={this.scoreKeeper}
            onPause ={this.state.paused}
            gameOver={this.gameOver}
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












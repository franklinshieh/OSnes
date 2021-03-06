var React = require('react-native');
var Ionicon = require('react-native-vector-icons/Ionicons');
var FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');
var Orientation = require('react-native-orientation');
var utils = require('../Utils/utils');
var _ = require('lodash');
var StatusBarAndroid = require('react-native-android-statusbar');

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBarIOS,
  PanResponder,
  Platform
} = React;

class ControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used to scale sizes of D-Pad depending on phone resolution
      iPhoneSize: undefined,
      //used to control logic in the D-Pad
      dPadButton: undefined, //currently pressed D-pad button
      dPadStartX: undefined,
      dPadStartY: undefined,
      dPadTouchesIdentifier: undefined, //identifier of the D-Pad touch within the evt.nativeEvent.touches array
      //set to true when game is paused
      showPauseModal: false,
    };
    // TODO: pause and resume the game through websockets without using global scope
    global.pause = () => {
      this.setState({showPauseModal: true});
    };
    global.resume = () => {
      this.setState({showPauseModal: false});
    };
    global.onclose = () => {
      navigator = this.props.navigator;
      turnCameraOn = this.props.route.turnCameraOn.bind(this);
      navigator.pop();
      Orientation.lockToPortrait();
      turnCameraOn();
    };
  }


  componentWillMount() {
    //The following code is used to make the D-Pad into a joystick so the user can roll their thumb between buttons and trigger a response
    //instead of having to lift a finger and tap
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started; player's finger has touched the D-Pad area
        var x2 = evt.nativeEvent.locationX;
        var y2 = evt.nativeEvent.locationY;
        this.setState({
          dPadStartX: x2,
          dPadStartY: y2,
        });

        //TODO: don't hardcode these points of the D-Pad buttons
        if(this.state.iPhoneSize === 'iPhone6') {
          var distanceToUp = Math.sqrt( (79-x2)*(79-x2) + (58-y2)*(58-y2) );
          var distanceToRight = Math.sqrt( (127.5-x2)*(127.5-x2) + (105.5-y2)*(105.5-y2) );
          var distanceToDown = Math.sqrt( (81-x2)*(81-x2) + (150.5-y2)*(150.5-y2) );
          var distanceToLeft = Math.sqrt( (32.5-x2)*(32.5-x2) + (107-y2)*(107-y2) );
        } else if(this.state.iPhoneSize === 'iPhone6+') {
          var distanceToUp = Math.sqrt( (89-x2)*(89-x2) + (64-y2)*(64-y2) );
          var distanceToRight = Math.sqrt( (140-x2)*(140-x2) + (116-y2)*(116-y2) );
          var distanceToDown = Math.sqrt( (90-x2)*(90-x2) + (169-y2)*(169-y2) );
          var distanceToLeft = Math.sqrt( (35-x2)*(35-x2) + (116-y2)*(116-y2) );
        } else if(this.state.iPhoneSize === 'iPhone5') {
          var distanceToUp = Math.sqrt( (68.5-x2)*(68.5-x2) + (49.5-y2)*(49.5-y2) );
          var distanceToRight = Math.sqrt( (108.5-x2)*(108.5-x2) + (91-y2)*(91-y2) );
          var distanceToDown = Math.sqrt( (67.5-x2)*(67.5-x2) + (130.5-y2)*(130.5-y2) );
          var distanceToLeft = Math.sqrt( (28-x2)*(28-x2) + (90-y2)*(90-y2) );
        }

        var closest = Math.min(distanceToUp, distanceToRight, distanceToDown, distanceToLeft);

        if(closest===distanceToUp && this.state.dPadButton!=='up') {
          this._upArrowPressIn();
        } else if (closest===distanceToRight && this.state.dPadButton!=='right') {
          this._rightArrowPressIn();
        } else if (closest===distanceToDown && this.state.dPadButton!=='down') {
          this._downArrowPressIn();
        } else if (closest===distanceToLeft && this.state.dPadButton!=='left') {
          this._leftArrowPressIn();
        }

      },
      onPanResponderMove: (evt, gestureState) => {
        // The player has moved their finger after touching the D-Pad area

        // Find the identifier of the touch that corresponds to the D-Pad: this is done because if another button is clicked (ex. A/B/X/Y with the right thumb)
        // and the user moves their right finger, it will throw off the D-Pad
        var initialX = this.state.dPadStartX;
        var initialY = this.state.dPadStartY;
        var mapped = evt.nativeEvent.touches.map(function(touch){
          var distance=Math.sqrt( (initialX-touch.pageX)*(initialX-touch.pageX) + (initialY-touch.pageY)*(initialY-touch.pageY) );
          return {'distance':distance, 'identifier': touch.identifier};
        });
        var closest = _.sortBy(mapped, 'distance');
        var identifier = closest[0]['identifier'];
        this.setState({dPadTouchesIdentifier:identifier});

        // Register dpad controls based on filtered evt.nativeEvent.touches where identifier is the state.
        var dPadTouch = evt.nativeEvent.touches.filter(function(touch){
          return touch.identifier = identifier;
        })
        var x2 = dPadTouch[0].locationX;
        var y2 = dPadTouch[0].locationY;

        //TODO: don't hardcode these points of the D-Pad buttons
        if(this.state.iPhoneSize === 'iPhone6') {
          var distanceToUp = Math.sqrt( (79-x2)*(79-x2) + (58-y2)*(58-y2) );
          var distanceToRight = Math.sqrt( (127.5-x2)*(127.5-x2) + (105.5-y2)*(105.5-y2) );
          var distanceToDown = Math.sqrt( (81-x2)*(81-x2) + (150.5-y2)*(150.5-y2) );
          var distanceToLeft = Math.sqrt( (32.5-x2)*(32.5-x2) + (107-y2)*(107-y2) );
        } else if(this.state.iPhoneSize === 'iPhone6+') {
          var distanceToUp = Math.sqrt( (89-x2)*(89-x2) + (64-y2)*(64-y2) );
          var distanceToRight = Math.sqrt( (140-x2)*(140-x2) + (116-y2)*(116-y2) );
          var distanceToDown = Math.sqrt( (90-x2)*(90-x2) + (169-y2)*(169-y2) );
          var distanceToLeft = Math.sqrt( (35-x2)*(35-x2) + (116-y2)*(116-y2) );
        } else if(this.state.iPhoneSize === 'iPhone5') {
          var distanceToUp = Math.sqrt( (68.5-x2)*(68.5-x2) + (49.5-y2)*(49.5-y2) );
          var distanceToRight = Math.sqrt( (108.5-x2)*(108.5-x2) + (91-y2)*(91-y2) );
          var distanceToDown = Math.sqrt( (67.5-x2)*(67.5-x2) + (130.5-y2)*(130.5-y2) );
          var distanceToLeft = Math.sqrt( (28-x2)*(28-x2) + (90-y2)*(90-y2) );
        }

        var closest = Math.min(distanceToUp, distanceToRight, distanceToDown, distanceToLeft);

        if(closest===distanceToUp && this.state.dPadButton!=='up') {
          this._upArrowPressIn();
        } else if (closest===distanceToRight && this.state.dPadButton!=='right') {
          this._rightArrowPressIn();
        } else if (closest===distanceToDown && this.state.dPadButton!=='down') {
          this._downArrowPressIn();
        } else if (closest===distanceToLeft && this.state.dPadButton!=='left') {
          this._leftArrowPressIn();
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches within the responder
        if(gestureState.moveX===0 && gestureState.moveY===0) {
          // if gestureState.moveX and gestureState.moveY are 0, that means that there is no movement (the user has tapped and not dragged)
          // distance should therefore be calculated based on starting tap location (evt.nativeEvent.locationX and evt.nativeEvent.locationY)
          var x2 = evt.nativeEvent.locationX
          var y2 = evt.nativeEvent.locationY

          //TODO: don't hardcode these points of the D-Pad buttons
          if(this.state.iPhoneSize === 'iPhone6') {
            var distanceToUp = Math.sqrt( (79-x2)*(79-x2) + (58-y2)*(58-y2) );
            var distanceToRight = Math.sqrt( (127.5-x2)*(127.5-x2) + (105.5-y2)*(105.5-y2) );
            var distanceToDown = Math.sqrt( (81-x2)*(81-x2) + (150.5-y2)*(150.5-y2) );
            var distanceToLeft = Math.sqrt( (32.5-x2)*(32.5-x2) + (107-y2)*(107-y2) );
          } else if(this.state.iPhoneSize === 'iPhone6+') {
            var distanceToUp = Math.sqrt( (89-x2)*(89-x2) + (64-y2)*(64-y2) );
            var distanceToRight = Math.sqrt( (140-x2)*(140-x2) + (116-y2)*(116-y2) );
            var distanceToDown = Math.sqrt( (90-x2)*(90-x2) + (169-y2)*(169-y2) );
            var distanceToLeft = Math.sqrt( (35-x2)*(35-x2) + (116-y2)*(116-y2) );
          } else if(this.state.iPhoneSize === 'iPhone5') {
            var distanceToUp = Math.sqrt( (68.5-x2)*(68.5-x2) + (49.5-y2)*(49.5-y2) );
            var distanceToRight = Math.sqrt( (108.5-x2)*(108.5-x2) + (91-y2)*(91-y2) );
            var distanceToDown = Math.sqrt( (67.5-x2)*(67.5-x2) + (130.5-y2)*(130.5-y2) );
            var distanceToLeft = Math.sqrt( (28-x2)*(28-x2) + (90-y2)*(90-y2) );
          }
        } else {
          var x2 = gestureState.moveX;
          var y2 = gestureState.moveY;

          //TODO: don't hardcode these points of the D-Pad buttons
          if(this.state.iPhoneSize === 'iPhone6') {
            var distanceToUp = Math.sqrt( (140-x2)*(140-x2) + (132.5-y2)*(132.5-y2) );
            var distanceToRight = Math.sqrt( (186.5-x2)*(186.5-x2) + (180-y2)*(180-y2) );
            var distanceToDown = Math.sqrt( (140-x2)*(140-x2) + (228.5-y2)*(228.5-y2) );
            var distanceToLeft = Math.sqrt( (94.5-x2)*(94.5-x2) + (180-y2)*(180-y2) );
          } else if(this.state.iPhoneSize === 'iPhone6+') {
            var distanceToUp = Math.sqrt( (155-x2)*(155-x2) + (146-y2)*(146-y2) );
            var distanceToRight = Math.sqrt( (206-x2)*(206-x2) + (201-y2)*(201-y2) );
            var distanceToDown = Math.sqrt( (155-x2)*(155-x2) + (253-y2)*(253-y2) );
            var distanceToLeft = Math.sqrt( (102.6-x2)*(102.6-x2) + (201-y2)*(201-y2) );
          } else if(this.state.iPhoneSize === 'iPhone5') {
            var distanceToUp = Math.sqrt( (119-x2)*(119-x2) + (114.5-y2)*(114.5-y2) );
            var distanceToRight = Math.sqrt( (159-x2)*(159-x2) + (155-y2)*(155-y2) );
            var distanceToDown = Math.sqrt( (119-x2)*(119-x2) + (194-y2)*(194-y2) );
            var distanceToLeft = Math.sqrt( (78.5-x2)*(78.5-x2) + (154.5-y2)*(154.5-y2) );
          }
        }

        var closest = Math.min(distanceToUp, distanceToRight, distanceToDown, distanceToLeft);

        this._upArrowPressOut();
        this._rightArrowPressOut();
        this._downArrowPressOut();
        this._leftArrowPressOut();

      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      Orientation.lockToLandscapeRight(); //this will lock the view to Landscape
    } else {
      Orientation.lockToLandscape(); // no support for lockToLandscapeRight in Android yet
    }

    //buttons must scale with size of the phone
    if (Platform.OS === 'ios') {
      if(Dimensions.get('window').width===375) { //iPhone 6/6s
        this.setState({
          iPhoneSize: 'iPhone6',
        })
      } else if (Dimensions.get('window').width===414) { //iPhone 6+/6s+
        this.setState({
          iPhoneSize: 'iPhone6+',
        })
      } else if (Dimensions.get('window').width===320) { //iPhone 5/5s/SE
        this.setState({
          iPhoneSize: 'iPhone5',
        })
      }
    } else { // TODO: Android sizing of buttons
      var windowWidth = Dimensions.get('window').width;
      this.setState({
        circleButtonSize: windowWidth * 0.16,
        dPadSize: windowWidth * 0.40,
        shoulderButtonSize: windowWidth * 0.43,
        selectStartButtonSize: windowWidth * 0.07
      });
    }

  }

  /////////////////////////////////////////////////////////////////////
  //Right thumb buttons: A, B, X, Y
  /////////////////////////////////////////////////////////////////////
  _APressIn() {
    utils.Press('a'); 
  }
  _APressOut() {
    utils.Release('a'); 
  }

  _BPressIn() {
    utils.Press('b'); 
  }
  _BPressOut() {
    utils.Release('b'); 
  }

  _XPressIn() {
    utils.Press('x'); 
  }
  _XPressOut() {
    utils.Release('x'); 
  }

  _YPressIn() {
    utils.Press('y'); 
  }
  _YPressOut() {
    utils.Release('y'); 
  }

  /////////////////////////////////////////////////////////////////////
  //Left thumb buttons: Direction pad
  /////////////////////////////////////////////////////////////////////
  _upArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='up') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    this.setState({dPadButton: "up"});
    utils.Press('up');
  }
  _upArrowPressOut() {
    this.setState({dPadButton: undefined});
    utils.Release('up');
  }

  _downArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='down') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    this.setState({dPadButton: "down"});
    utils.Press('down');
  }
  _downArrowPressOut() {
    this.setState({dPadButton: undefined});
    utils.Release('down');
  }

  _rightArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='right') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      }
    }
    this.setState({dPadButton: "right"});
    utils.Press('right');
  }
  _rightArrowPressOut() {
    this.setState({dPadButton: undefined});
    utils.Release('right');
  }

  _leftArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='left') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    this.setState({dPadButton: "left"});
    utils.Press('left');
  }
  _leftArrowPressOut() {
    this.setState({dPadButton: undefined});
    utils.Release('left');
  }

  /////////////////////////////////////////////////////////////////////
  //Shoulder buttons: Left and Right Index Finger Triggers.
  /////////////////////////////////////////////////////////////////////
  _rightShoulderPressIn() {
    utils.Press('r-shoulder');
  }
  _rightShoulderPressOut() {
    utils.Release('r-shoulder');
  }

  _leftShoulderPressIn() {
    utils.Press('l-shoulder');
  }
  _leftShoulderPressOut() {
    utils.Release('l-shoulder');
  }

  /////////////////////////////////////////////////////////////////////
  //Start and Select buttons
  /////////////////////////////////////////////////////////////////////
  _startPressIn() {
    utils.Press('start');
  }
  _startPressOut() {
    utils.Release('start');
  }

  _selectPressIn() {
    utils.Press('select');
  }
  _selectPressOut() {
    utils.Release('select');
  }

  /////////////////////////////////////////////////////////////////////
  //Pause button and button options while game is paused
  /////////////////////////////////////////////////////////////////////
  _pause() {
    var controller = this;
    utils.Pause(function() {
      controller.setState({showPauseModal: true});
    });
  }
  _resume() {
    var controller = this;
    utils.Resume(function() {
      controller.setState({showPauseModal: false});
    });
  }
  _pairController() {
    navigator = this.props.navigator;
    turnCameraOn = this.props.route.turnCameraOn.bind(this);
    utils.RePairController(function() {
      navigator.pop();
      Orientation.lockToPortrait();
      turnCameraOn();
    });
  }

  render() {
    if (Platform.OS === 'ios') {
      StatusBarIOS.setHidden('true');
    } else {
      StatusBarAndroid.hideStatusBar();
    }
    return (
      <View style={styles.imageContainer}>
        <Image source={require('./Assets/snescontrollercroppedlabels.jpg')} style={styles.image}>

          <View style={styles.AButton} onTouchStart={this._APressIn.bind(this)} onTouchEnd={this._APressOut.bind(this)}/>
          <View style={styles.BButton} onTouchStart={this._BPressIn.bind(this)} onTouchEnd={this._BPressOut.bind(this)}/>
          <View style={styles.XButton} onTouchStart={this._XPressIn.bind(this)} onTouchEnd={this._XPressOut.bind(this)}/>
          <View style={styles.YButton} onTouchStart={this._YPressIn.bind(this)} onTouchEnd={this._YPressOut.bind(this)}/>

          <View {...this._panResponder.panHandlers} style={styles.dPad}/>

          <View style={styles.leftShoulderButton} onTouchStart={this._leftShoulderPressIn.bind(this)} onTouchEnd={this._leftShoulderPressOut.bind(this)}/>
          <View style={styles.rightShoulderButton} onTouchStart={this._rightShoulderPressIn.bind(this)} onTouchEnd={this._rightShoulderPressOut.bind(this)}/>

          <View style={styles.selectButton} onTouchStart={this._selectPressIn.bind(this)} onTouchEnd={this._selectPressOut.bind(this)}/>
          <View style={styles.startButton} onTouchStart={this._startPressIn.bind(this)} onTouchEnd={this._startPressOut.bind(this)}/>

          <TouchableOpacity style={styles.pauseButton} onPress={this._pause.bind(this)}>
            <FontAwesomeIcon name="pause-circle" size={50} allowFontScaling={false} color="#6b676e"/>
          </TouchableOpacity>

          {this.state.showPauseModal ? 
            <View style={styles.pauseModal}>
              <Text style={styles.pauseText}>Your Game is Paused</Text>
              <TouchableOpacity style={styles.resume} onPress={this._resume.bind(this)}>
                <Ionicon name="ios-play-outline" style={styles.resumeIcon} size={50} allowFontScaling={false} color="white"/>
                <Text style={styles.resumeText}>Resume Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pair} onPress={this._pairController.bind(this)}>
                <Ionicon name="ios-barcode-outline" style={styles.pairIcon} size={50} allowFontScaling={false} color="white"/>
                <Text style={styles.pairText}>Re-pair controller</Text>
              </TouchableOpacity>
            </View>
          : 
            null
          }

        </Image>
      </View>

    );
  }
}

var height;
var width;

if (Platform.OS === 'ios') {
  height = 'height';
  width = 'width';
} else { //android's height and width are swapped relative to iOS's
  height = 'width';
  width = 'height';
}

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window')[height],
    height: Dimensions.get('window')[width],
  },
  AButton: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0.36,
    left: Dimensions.get('window')[height] * 0.83,
    width: Dimensions.get('window')[width] * 0.23,
    height: Dimensions.get('window')[width] * 0.23,
    borderRadius: Dimensions.get('window')[width] * 0.23 /2,
    backgroundColor: 'transparent'
  },
  BButton: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0.51,
    left: Dimensions.get('window')[height] * 0.73,
    width: Dimensions.get('window')[width] * 0.23,
    height: Dimensions.get('window')[width] * 0.23,
    borderRadius: Dimensions.get('window')[width] * 0.23 /2,
    backgroundColor: 'transparent'
  },
  XButton: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0.21,
    left: Dimensions.get('window')[height] * 0.72,
    width: Dimensions.get('window')[width] * 0.23,
    height: Dimensions.get('window')[width] * 0.23,
    borderRadius: Dimensions.get('window')[width] * 0.23 /2,
    backgroundColor: 'transparent'
  },
  YButton: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0.36,
    left: Dimensions.get('window')[height] * 0.62,
    width: Dimensions.get('window')[width] * 0.23,
    height: Dimensions.get('window')[width] * 0.23,
    borderRadius: Dimensions.get('window')[width] * 0.23 /2,
    backgroundColor: 'transparent'
  },
  dPad: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0.263,
    left: Dimensions.get('window')[height] * 0.0925,
    width: Dimensions.get('window')[width] * 0.42,
    height: Dimensions.get('window')[width] * 0.42,
    borderRadius: Dimensions.get('window')[width] * 0.42 /2,
    backgroundColor: 'transparent'
  },
  leftShoulderButton: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0,
    left: Dimensions.get('window')[height] * 0.025,
    width: Dimensions.get('window')[width] * 0.7,
    height: Dimensions.get('window')[width] * 0.15,
    backgroundColor: 'transparent'
  },
  rightShoulderButton: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0,
    right: Dimensions.get('window')[height] * 0.025,
    width: Dimensions.get('window')[width] * 0.7,
    height: Dimensions.get('window')[width] * 0.15,
    backgroundColor: 'transparent'
  },
  selectButton: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0.5,
    left: Dimensions.get('window')[height] * 0.36,
    width: Dimensions.get('window')[width] * 0.16,
    height: 20,
    transform: [
      {rotate: '140deg'}
    ],
    backgroundColor: 'transparent'
  },
  startButton: {
    position: 'absolute',
    top: Dimensions.get('window')[width] * 0.5,
    left: Dimensions.get('window')[height] * 0.47,
    width: Dimensions.get('window')[width] * 0.16,
    height: 20,
    transform: [
      {rotate: '140deg'}
    ],
    backgroundColor: 'transparent'
  },
  pauseButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  pauseModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window')[width],
    width: Dimensions.get('window')[height],
    backgroundColor: 'rgba(0,0,0,0.8)',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  pauseText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: Dimensions.get('window')[width] * -0.2,
  },
  resume: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window')[width] * 0.2
  },
  resumeText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window')[width] * 0.05,
    marginTop: Dimensions.get('window')[width] * 0.045
  },
  pair: {
    marginTop: Dimensions.get('window')[width] * 0.05,
    flexDirection: 'row',
  },
  pairText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window')[width] * 0.05,
    marginTop: Dimensions.get('window')[width] * 0.045
  }
});

module.exports = ControllerView;

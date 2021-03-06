var React = require('react-native');
var QRReader = require('./App/Components/QRReader');
var ControllerView = require('./App/Components/ControllerView'); //including for now so we can easily set initial route to ControllerView for development purposes

var {
  AppRegistry,
  StyleSheet,
  Navigator
} = React;

class mobileController extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{
          component: QRReader
        }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component, { navigator, route });
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('mobileController', () => mobileController);

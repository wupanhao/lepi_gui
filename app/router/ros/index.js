const ROSLIB = require('roslib');

class ros_client {
  constructor(ros_base_url) {
    this.url = ros_base_url
    this.listener = null
    // this.conectToRos()
  }

  conectToRos(btnHandler) {
    console.log('trying to conect to ros server:')
    try {
      var ros = new ROSLIB.Ros({
        url: this.url
      });
    } catch (e) {
      console.log('ros client init error:', e)
      console.log('trying to reconect after 3 seconds')
      // return
      setTimeout(() => {
        this.conectToRos()
      }, 3000)
      return
    }
    if (this.listener != null) {
      this.listener.unsubscribe();
    }
    var listener = new ROSLIB.Topic({
      ros: ros,
      name: '/ubiquityrobot/pi_driver_node/button_event',
      messageType: 'pi_driver/ButtonEvent'
    });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
      if (btnHandler) {
        listener.subscribe(btnHandler);
      }
    });

    ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', () => {
      console.log('Connection to websocket server closed. retrying');
      this.conectToRos()
    });

    this.ros = ros
    this.listener = listener
  }
}

module.exports = ros_client
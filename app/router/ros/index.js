class ros_client {
  constructor() {
    this.url = env.ros_base_url
    this.conectToRos()
  }

  conectToRos(btnHandler) {
    console.log('trying to conect to ros server:')
    this.conectToRos()
    this.listener.unsubscribe();
    try {
      var ros = new ROSLIB.Ros({
        url: this.url
      });
    } catch (e) {
      console.log('ros client init error:', e)
      console.log('trying to reconect after 3 seconds')
      return this.conectToRos()
    }

    var listener = new ROSLIB.Topic({
      ros: ros,
      name: '/ubiquityrobot/pi_driver_node/button_event',
      messageType: 'pi_driver/ButtonEvent'
    });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
      if (btnHandler) {
        listener.subscribe(this.onBtnEvent);
      }
    });

    ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      this.conectToRos()
    });

    this.ros = ros
    this.listener = listener
  }
}

module.exports = ROS_Client
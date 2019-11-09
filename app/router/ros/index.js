const ROSLIB = require('roslib');
const ROS_NAMESPACE = '/ubiquityrobot/'

class ros_client {
  constructor(ros_base_url, btnHandler) {
    this.url = ros_base_url
    this.listener = null
    this.btnHandler = btnHandler
    // this.conectToRos()
  }

  conectToRos() {
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
      if (this.btnHandler) {
        listener.subscribe(this.btnHandler);
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

  getMotorEncoder(port) {
    return new Promise((resolve) => {
      var client = new ROSLIB.Service({
        ros: this.ros,
        name: ROS_NAMESPACE + 'pi_driver_node/motor_get_position',
        serviceType: 'pi_driver/MotorGetPosition'
      });

      var request = new ROSLIB.ServiceRequest({
        port: port
      });

      client.callService(request, (result) => {
        console.log(result)
        resolve(result.position)
      });
    })
  }

  setMotorSpeed(port, speed) {

  }
}

module.exports = ros_client
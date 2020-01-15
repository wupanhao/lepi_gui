set -x

# Clone the Repo
mkdir ~/workspace
cd ~/workspace
#git clone https://github.com/wupanhao/lepi_gui
#git clone https://github.com/wupanhao/lepi-ros-server

# Install LCD Driver
cd ~/workspace/lepi_gui
bash install-lcd.sh

# Install WM8960 Audio Driver
cd ~/workspace/lepi_gui/conf/WM8960-Audio-HAT
sudo ./install.sh
# https://github.com/respeaker/seeed-voicecard
# https://github.com/waveshare/WM8960-Audio-HAT

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh && rm get-docker.sh
sudo usermod -aG docker pi

# Pull Docker Image
sudo docker pull wupanhao/lepi_server:melodic

# Install ROS Runtime
sudo apt install -y python-rospy python-rosnode python-roslaunch

# Compile ROS Workspace
sudo docker run --rm -t -v /home/pi:/home/pi wupanhao/lepi_server:melodic bash -c "source /ros_entrypoint.sh && cd catkin_ws/ && catkin_make_isolated"

# Install Node.js Environment
bash install-nodejs.sh

# Install GUI
cd ~/workspace/lepi_gui
yarn install
yarn build
cd app
yarn install

# Set GUI Auto Start
cd ~/workspace/lepi_gui
bash auto_start.sh

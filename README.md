## 乐派软件安装

### 一、基础系统准备
前往[树莓派官网](!https://www.raspberrypi.org/downloads/raspbian/)下载最新Raspbian系统("Raspbian Buster with desktop"版本),推荐通过BT客户端使用Torrent文件进行下载，速度可以比直接网页下载快
下载完成后烧录工具如"Win32DiskImager" "Etcher" "dd"等进行系统烧录，具体细节参考网上相关文档
烧录完成后如需通过网络远程连接树莓派还需在boot分区创建空白的"ssh"文件以打开ssh远程登录权限
通过局域网ssh或键盘显示器连接树莓派进入树莓派系统并打开ssh、vnc服务的开机自启动

### 二、安装LCD液晶屏及WM8960音频驱动

#### 安装WM8960音频驱动
+ 参考如下项目
- https://github.com/respeaker/seeed-voicecard
- https://github.com/waveshare/WM8960-Audio-HAT

#### 安装LCD液晶屏驱动
+ 参考如下项目
- https://github.com/goodtft/LCD-show

### 三、安装Docker、下载乐派镜像

+ 安装Docker
`curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh`
+ 添加当前用户到docker用户组
`sudo usermod -aG docker pi`
+下载乐派镜像
`docker pull wupanhao/lepi_server:melodic`
这一步耗时会较长，建议连接网线进行下载并保证电量充足，可能会耗时近20分钟

### 四、安装乐派GUI程序及ROS软件

#### 安装、编译ROS软件
```
mkdir ~/workspace && cd workspace
git clone https://github.com/wupanhao/lepi-ros-server
docker run --rm -t -v /home/pi:/home/pi wupanhao/lepi_server:melodic bash -c "source /ros_entrypoint.sh && cd catkin_ws/ && catkin_make_isolated"
```

#### 安装、编译GUI程序

+ TO DO:安装nodejs、npm、yarn、electron环境

```
cd ~/workspace
git clone https://github.com/wupanhao/lepi_gui
cd ~/workspace/lepi_gui
yarn install
yarn run build
bash auto_start.sh
cd ~/workspace/lepi_gui/app
yarn install
```

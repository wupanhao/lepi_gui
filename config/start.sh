#/bin/bash
#/home/pi/start.sh
docker start demo_duck
docker exec -t  demo_duck /bin/bash /start.sh > /tmp/duckie.log &
#sleep 5
DISPLAY=:0.1 xset dpms 0 0 0
DISPLAY=:0.1 xset s off
DISPLAY=:0.1 /home/pi/.npm-global/bin/electron  /home/pi/workspace/lepi_gui/server.js 
#DISPLAY=:0.1 electron /home/pi/workspace/lepi_gui/server.js 
#dnsmasq --no-hosts --log-queries --no-resolv --address=/#/192.168.27.1 --dhcp-range=192.168.27.100,192.168.27.255,12h
#/sbin/iw phy phy0 interface add uap0 type __ap
#/sbin/iw dev uap0 del

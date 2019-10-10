#/bin/bash
#/home/pi/start.sh
docker start duckie_base
docker exec  duckie_base /bin/bash /start.sh > /tmp/duckie.log &
#sleep 5
DISPLAY=:0.1 /home/pi/.npm-global/bin/electron  /home/pi/lepi_gui/app.js 
#DISPLAY=:0.1 electron /home/pi/lepi_gui/app.js 

#docker run --net=host --env="DISPLAY=:0.1" --volume="$HOME/.Xauthority:/root/.Xauthority:rw" --rm wupanhao/pi3-electron electron --no-sandbox -v
from balenalib/raspberrypi3-node
RUN npm i -g electron@6.0.0
RUN apt update && apt install -y \
    libglib2.0-0 \
    libnss3 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxtst6 \
    libxss1 \
    libasound2 

CMD /bin/bash

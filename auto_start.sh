mkdir -p ~/.config/autostart
cp ./config/gui.desktop ~/.config/autostart/
cp ./config/start.sh ~/
sudo npm i -g npm
sudo mv /usr/bin/npm /usr/bin/npm_old
# Fix npm EACCES error
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
npm i -g electron

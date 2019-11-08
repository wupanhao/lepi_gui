set -x
sudo apt update
sudo apt install npm -y
#sudo npm i -g npm
#sudo mv /usr/bin/npm /usr/bin/npm_old
# Fix npm EACCES error
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
npm i -g npm
#/usr/local/bin/npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
~/.npm-global/bin/npm i -g electron@6.0.0
cd app && ~/.npm-global/bin/npm i

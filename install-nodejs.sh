set -x
sudo apt update

function install_from_apt(){
	sudo apt install npm -y
	# Fix npm EACCES error
	mkdir ~/.npm-global
	npm config set prefix '~/.npm-global'
	npm i -g npm
	#/usr/local/bin/npm config set prefix '~/.npm-global'
}

function install_from_wget(){

}
install_from_apt
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
~/.npm-global/bin/npm i -g electron@6.0.0
~/.npm-global/bin/npm i -g yarn
~/.npm-global/bin/yarn install
cd app && ~/.npm-global/bin/npm i

#!/bin/sh

apt update
apt install -y apache2 npm zip unzip
a2enmod proxy
a2enmod proxy_http
/etc/init.d/apache2 restart
mkdir /opt/stromdao

## Setup Keys for Installation and Access
cd /
wget https://elements.corrently.io/keys.zip
unzip keys.zip
/etc/init.d/apache2 restart

## Install ElementsServer
cd /opt/stromdao
git clone git@gitlab.com:corrently-corp/elementsserver.git
cd /opt/stromdao/elementsserver
npm install
mkdir /opt/stromdao/elementsserver/static/dist
npm install -g forever
npm install -g gulp
npm install -g gulp-minify
npm install -g gulp-concat

## Patch to latest elements version
git clone https://github.com/energychain/correntlyElements.git elements
cp -R elements/* static/
rm -Rf elements/

echo "FQDN=https://$(hostname).corrently.cloud" > /opt/stromdao/elementsserver/.env
cd /opt/stromdao/elementsserver/static
npm install

## SETUP Env File
forever start index.js

## SETUP Deployment Hooks
cd /opt/stromdao
git clone git@gitlab.com:corrently-corp/deployment-hooks.git
cd deployment-hooks
npm install
echo "PORT=7000\nPUSH=\"/opt/stromdao/$(hostname)/push.sh\"" > .env
forever start index.js

cd /opt/stromdao
git clone git@gitlab.com:corrently-corp/$(hostname).corrently.cloud.git $(hostname)

## SETUP to start on (re)boot
echo "SHELL=/bin/sh" > /etc/cron.d/stromdao
echo "PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin" >> /etc/cron.d/stromdao
echo "@reboot root /opt/stromdao/$(hostname)/boot.sh" >> /etc/cron.d/stromdao
cd /opt/stromdao/$(hostname)
./push.sh

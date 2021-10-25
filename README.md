#Execute script at startup

Edit /etc/rc.local



	su pi -c '/home/pi/.nvm/versions/node/v16.12.0/bin/node /home/pi/scripts/ENSFeeChecker/index.js > /home/pi/scripts/ENSFeeChecker/cron.log 2>&1'


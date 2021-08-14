CONTAINER=vybot_database;

# Checking the database container is running
echo Checking $CONTAINER is running...
if ! docker ps --format '{{.Names}}' | grep -w $CONTAINER &> /dev/null;
then
	echo Starting $CONTAINER
	npm run docker:start;
else
	echo $CONTAINER has already started
fi
echo Database container setup complete.

# Make sure that postgres is ready by waiting
sleep 5;

# Checking that the database is setup, or upgraded if required
echo Checking database for setup or upgrades...
npm run database:setup;
echo;
echo Database setup complete.

echo Stopping running services...
pm2 kill;

pm2 start ./dist/app.js --interpreter=/home/deployment/.nvm/versions/node/v16.6.2/bin/node

echo Setup complete!

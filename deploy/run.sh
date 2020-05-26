#!/bin/bash

export $(cat .env | xargs)

# Environment varibles check

if [ -z "$VERSION" ]; then
    echo "Bot version environment variable is mandatory [APP_PORT]"
    exit 1
fi

if [ -z "$HOST" ]; then
    echo "Bot host environment variable is mandatory [HOST]"
    exit 1
fi

if [ -z "$APP_PORT" ]; then
    echo "Bot port environment variable is mandatory [APP_PORT]"
    exit 1
fi

if [ -z "$BOT_SECRET_WEBHOOK_PATH" ]; then
    echo "Bot secret web hook path environment variable is mandatory [BOT_SECRET_WEBHOOK_PATH]"
    exit 1
fi

# Stop
docker-compose down

# Clean run
if [ "$1" == "clean" ]; then
    docker rmi $(docker images -f "dangling=true" -q)
    docker rmi seal-of-approval-telegram-bot:$VERSION

    # Certificate generation
    mkdir -p ssl

    openssl req -x509 -newkey rsa:2048 -sha256 -nodes \
                -days 365 \
                -subj "/C=ES/ST=Madrid/L=Madrid/O=Gade/CN=$HOST" \
                -keyout ssl/bot.key \
                -out ssl/bot.pem

    # Nginx set up
    sed 's/${HOST}/'"$HOST"'/g; s/${APP_PORT}/'"$APP_PORT"'/g; s/${BOT_SECRET_WEBHOOK_PATH}/'"$BOT_SECRET_WEBHOOK_PATH"'/g' nginx.conf.template > nginx.conf
fi

# Run
docker-compose up -d

## Seal of approval Telegram Bot

Telegram bot using NestJS TypeScript framework, Telegraf, Nest Telegram

### Installation

```bash
$ npm i
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Bot configuration

Set environment variables using [deploy/.env.template file](deploy/.env.template)

### Run in production mode (using docker)

Create a deploy/.env file using [deploy/.env.template file](deploy/.env.template)
and execute from deploy directory
```bash
$ sh run clean
```

for restart just
```bash
$ ./run.sh clean
```
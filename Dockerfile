FROM node:12.16.3 as installer
WORKDIR /app
COPY package.json .
RUN npm i

FROM installer as builder
RUN pwd
COPY .eslintrc.js nest-cli.json tsconfig.build.json tsconfig.json ./
COPY src src
RUN npm run lint && \
    npm run build && \
    npm prune --production

FROM node:12.16.3-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
CMD ["npm", "run", "start:prod"]

FROM node:alpine

RUN mkdir -p /home/node/api/node_modules

WORKDIR /home/node/alpine

COPY package.json yarn.* ./

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

CMD ["yarn", "full"]

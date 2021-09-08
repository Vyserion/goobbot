FROM node:16.7.0-alpine3.14
EXPOSE 3000

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm install

COPY . /home/app

EXPOSE 3000

CMD [ "npm", "start" ]

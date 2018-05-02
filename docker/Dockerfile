# base image
FROM node:carbon

#Create application directory
WORKDIR /usr/src/app

#Install application dependencies
#A wildcard is used to ensure both package.json + package-lock.json are copied
COPY package*.json ./

#For dev: RUN npm install
#For prod: RUN npm install --only=production
RUN yarn install

#bundle application source
COPY . .

EXPOSE 3000

# start app
CMD ["yarn", "start"]

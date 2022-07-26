# Base image
FROM node:18-alpine


# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 8080

CMD npm run start
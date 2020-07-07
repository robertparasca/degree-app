FROM node:12.2.0-alpine as react_build
#also say
WORKDIR /app
#copy the react app to the container
COPY . /app/

# #prepare the contiainer for building react
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build

#prepare nginx
FROM nginx:1.16.0-alpine

COPY --from=react_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d



#fire up nginx
EXPOSE 80
CMD ["nginx","-g","daemon off;"]


#FROM tiangolo/node-frontend:10 as build
#WORKDIR /app
## Copies package.json and package-lock.json to Docker environment
#COPY package*.json /app/
#
#RUN npm install
#
## Finally runs the application
#CMD [ "npm", "run", "build" ]
#
## Copies everything over to Docker environment
#COPY . /app/
#
#FROM nginx:alpine
#COPY --from=build /app/build/ /usr/share/nginx/html
## Copy the default nginx.conf provided by tiangolo/node-frontend
#COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]



#FROM node:13.12.0-alpine as build
#WORKDIR /app
## Copies package.json and package-lock.json to Docker environment
#COPY package*.json /app/
#
#RUN npm install
#
## Finally runs the application
#CMD [ "npm", "run", "build" ]
#
## Copies everything over to Docker environment
#COPY . /app/
#
#FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx.html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
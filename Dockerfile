FROM node:4-slim
ENV NODE_ENV production
RUN mkdir /ghost && mkdir /persist
WORKDIR /ghost
RUN npm install ghost@^0.9.0-beta.2 --production
RUN cp -r node_modules/ghost/content /persist
EXPOSE 2368
CMD node app.js
COPY app.js config.js ./

FROM node

WORKDIR /app

COPY . /app

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

EXPOSE 8000

CMD ["npm", "start"]
FROM node:16

RUN apt-get update && apt-get install -y

RUN mkdir /code

COPY /frontend /code/frontend
ADD tsconfig.json package.json /code/

WORKDIR /code
RUN yarn install

WORKDIR /code/frontend
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
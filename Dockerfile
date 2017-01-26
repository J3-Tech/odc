FROM node:boron

WORKDIR /odc

COPY . /odc

EXPOSE 3000
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -qq && apt-get install apt-transport-https apt-utils -yqq && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install yarn -yqq
RUN yarn install

ENTRYPOINT ["npm"]
CMD [ "start" ]

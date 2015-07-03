FROM iojs
RUN mkdir /iwwa-funnel
ADD ./ /iwwa-funnel/
WORKDIR /iwwa-funnel
RUN npm install
EXPOSE 8012
ENTRYPOINT ["npm", "start"]

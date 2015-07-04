FROM iojs
RUN mkdir /iwwa-funnel
ADD ./ /iwwa-funnel/
WORKDIR /iwwa-funnel
RUN mkdir -p logs
RUN npm install
ENV PORT 8012
EXPOSE 8012
ENTRYPOINT ["npm", "start"]

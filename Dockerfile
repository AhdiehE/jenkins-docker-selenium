FROM node:18

WORKDIR /app
COPY . .
RUN npm install
RUN npm install --save-dev mocha chai
RUN npm install selenium-webdriver
#CMD ["npm", "test"]
# Add curl wait loop directly in CMD
# CMD sh -c 'until curl -s http://selenium-hub:4444/status | grep -q "\"ready\":true"; do echo "Waiting for Selenium Hub..."; sleep 2; done; npm test'
# CMD sh -c "until curl -s http://selenium-hub:4444/status | grep -q '\"ready\":true'; do echo Waiting for Selenium Hub...; sleep 2; done; npm test"
CMD sh -c 'until curl -s http://selenium-hub:4444/status | grep -Eo "\"ready\"\s*:\s*true" > /dev/null; do echo Waiting for Selenium Hub...; sleep 2; done; npm test'


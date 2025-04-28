FROM quay.io/gurusensei/gurubhay:latest

RUN git clone https://github.com/alii-xd/STARK-MD /root/stark 

WORKDIR /root/stark/

RUN npm install --platform=linuxmusl

EXPOSE 5000

CMD ["npm", "start"]

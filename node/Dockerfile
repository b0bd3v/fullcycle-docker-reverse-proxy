FROM node:16

WORKDIR /usr/src/app/

COPY . .

RUN apt update && \
    apt install -y netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

RUN chmod +x start

RUN npm install

EXPOSE 3000

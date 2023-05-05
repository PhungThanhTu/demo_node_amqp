# demo_node_amqp
RabbitMQ demo project written in Node.js for Thesis App

## First, start the rabbitMQ server :
`docker-compose up -d`
<br>
## Install neccessary NodeJS dependencies (NodeJS 16 or above required)
`npm install`
## Then, start the consumer :
`node receiver.js`
<br>
The consumer will log all received message
<br>
## To send a message:
`node send.js`
<br>
The message is defined in the file send.js
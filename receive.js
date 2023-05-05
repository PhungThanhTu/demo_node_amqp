var amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

const conString = 'amqp://admin:admin@localhost:5672'

amqp.connect(conString, (err, con) => {
    if(err)
        throw err;

    con.createChannel((err, channel) => {
        if(err)
            throw err;
        
        var queue = 'sample';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
          }, {
              noAck: true
        });
    })
})

async function tryListeningForMessage() {
    try {
        const rabbitConnection = await amqp.connect(conString);

        const channel = await rabbitConnection.createChannel();

        const queue = 'sample';

        await channel.assertQueue(queue,{
            durable: false
        });

        console.log("Listening for message ...");

        channel.consume(queue, (message) => {
            console.log(`Received message: ${message.content.toString()}`)
        },
        {
            noAck: true
        });

    }
    catch (err)
    {
        throw err;
    }
}

tryListeningForMessage();
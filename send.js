var amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

const conString = 'amqp://admin:admin@localhost:5672'


async function trySendingMessage (message) {
    
    try {
        const rabbitConnection = await amqp.connect(conString);

        const channel = await rabbitConnection.createChannel();

        const queue = 'sample';

        await channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(message));

        await channel.close();
        await rabbitConnection.close();
    }
    catch(err)
    {
        throw(err)
    }
}

trySendingMessage(JSON.stringify({
    type: 'POST',
    content: 'Sample JSON message'
}));
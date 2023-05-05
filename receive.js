var amqp = require('amqplib/callback_api');
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


import { connect } from 'amqplib';

const consumer = async () => {
    let connection;
    let channel;
    try {
        connection = await connect('amqp://localhost');
        channel = await connection.createChannel();
        
        const exchange = 'exchange';
        const queue = 'queue-amp';
        const rootingKey = 'routingKey';

        await channel.assertExchange(exchange, 'direct', { durable: false });
        await channel.assertQueue(queue, { 
            durable: false,
            autoDelete: false
        });
        await channel.bindQueue(queue, exchange, rootingKey);

        console.log(' [*] Waiting for messages. To exit press CTRL+C');

        channel.consume(queue, (message) => {
            if (message) {
                console.log(' [x] Received: %s', message.content.toString());
                // Acknowledge message if needed
                // channel.ack(message);
            }
        }, { 
            noAck: true // Set to false if you want to manually acknowledge messages
        });

        // Handle application shutdown
        process.on('SIGINT', async () => {
            await channel.close();
            await connection.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('Error:', error.message);
        // Attempt cleanup on error
        if (channel) await channel.close();
        if (connection) await connection.close();
    }
};

consumer().catch(console.error);
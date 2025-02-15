import {connect}  from 'amqplib';

const producer = async () => {
    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'queue';

    await channel.assertQueue(queue, {durable: false});
    channel.sendToQueue(queue, Buffer.from('Hello World! Again'));
    console.log('Message sent to queue');
};

producer().catch(console.error);

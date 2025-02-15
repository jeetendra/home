import { connect } from "amqplib";

async function exchange() {
    let connection;
    let channel;
    try {
        connection = await connect("amqp://localhost");
        const exchangeName = "exchange";
        const queueName = "queue-amp";
        const rootingKey = "routingKey";
        
        channel = await connection.createChannel();
        
        await channel.assertExchange(exchangeName, "direct", { durable: false });
        // Remove exclusive flag and add durable option for persistence
        await channel.assertQueue(queueName, { 
            durable: false,
            autoDelete: false
        });
        await channel.bindQueue(queueName, exchangeName, rootingKey);
        
        channel.publish(exchangeName, rootingKey, Buffer.from("Hello World!"));
        console.log("Message sent to exchange");
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        // Cleanup: Close channel and connection
        if (channel) await channel.close();
        if (connection) await connection.close();
    }
}

exchange().catch(console.error);

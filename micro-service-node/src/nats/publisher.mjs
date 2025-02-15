import { connect } from "nats";

async function publish() {
    try {
        // Connect to NATS
        const nc = await connect({
            servers: 'nats://localhost:4222'
        });

        console.log('Connected to NATS server');

        // Publish message
        await nc.publish('subject', JSON.stringify({ message: 'Hello NATS!' }));
        console.log('Message published');

        // Cleanup: Drain and close connection
        await nc.drain();
        await nc.close();
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the publisher
publish().catch(console.error);

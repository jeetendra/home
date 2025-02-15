import { connect } from "nats";

async function subscribe() {
    try {
        // Connect to NATS
        const nc = await connect({
            servers: 'nats://localhost:4222'
        });

        console.log('Connected to NATS server');

        // Create subscription
        const subscription = nc.subscribe('subject');
        console.log('Listening for messages on subject "subject"...');

        // Process messages
        for await (const message of subscription) {
            console.log('Received:', JSON.parse(message.data));
        }

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            console.log('\nClosing subscription...');
            subscription.unsubscribe();
            await nc.drain();
            await nc.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Run the subscriber
subscribe().catch(console.error);


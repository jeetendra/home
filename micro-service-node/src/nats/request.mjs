import { connect } from "nats";

async function makeRequest() {
    try {
        const nc = await connect({
            servers: 'nats://localhost:4222'
        });

        console.log('Connected to NATS server');

        // Make multiple requests
        for (let i = 1; i <= 3; i++) {
            const data = { id: i, action: 'getData' };
            console.log(`Sending request ${i}:`, data);

            const response = await nc.request(
                'service.query',
                JSON.stringify(data),
                { timeout: 3000 }
            );

            console.log(`Response ${i}:`, JSON.parse(response.data));
        }

        await nc.close();
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

makeRequest().catch(console.error);

// services/messageService.js
const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672';
let channel;

const connect = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue('userEvents', { durable: true });
        console.log('Conectado a RabbitMQ');
    } catch (error) {
        console.error('Error al conectar a RabbitMQ:', error);
        throw error;
    }
};

const publishMessage = async (message) => {
    try {
        if (!channel) await connect();

        const routingKey = message.action === 'USER_DELETED' ? 'user.deleted' : 'user.created';

        channel.publish(
            'userEventsExchange', // nombre del exchange
            routingKey,           // clave de enrutamiento
            Buffer.from(JSON.stringify(message)),
            { persistent: true }
        );
        console.log('Mensaje enviado a RabbitMQ:', message);
    } catch (error) {
        console.error('Error al enviar mensaje a RabbitMQ:', error);
        throw error;
    }
};


module.exports = { publishMessage };
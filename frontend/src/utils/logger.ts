import pino from 'pino';

const logger = pino({
    level: import.meta.env.DEBUG ? 'debug' : 'info',
});

export default logger; 
import 'mocha';
import logger from '../../core/logger';

beforeEach(() => {
    // Suppress all logging during testing.
    logger.transports[0].level = 'emerg';
});

describe('Logging setup', () => {});
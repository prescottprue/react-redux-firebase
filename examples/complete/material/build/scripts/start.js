const logger = require('../lib/logger')
const config = require('../../project.config')

logger.info('Starting server...')
require('../../server/main').listen(config.port, () => {
  logger.success(`Server is running at http://localhost:${config.port}`)
})

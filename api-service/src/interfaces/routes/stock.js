import express from 'express';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import { makeStockController } from '../controllers/factories/stockControllerFactory.js';

const router = express.Router();

router.use(AuthMiddleware.authenticate);

const stockController = makeStockController()

router.get('/stock', (req, res, next) => {
  /*
  #swagger.tags = ['Stocks']
  #swagger.summary = 'Get stock data'
  #swagger.description = 'This endpoint retrieves stock data for a specified user.'
  #swagger.security = [{
    "bearerAuth": []
  }]
  #swagger.parameters['q'] = {
    in: 'query',
    description: 'Stock code to retrieve data for',
    required: true,
    type: 'string',
    example: 'AAPL.US'
  }
  #swagger.responses[200] = {
    description: 'Stock data retrieved successfully',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the stock',
              example: 'APPLE'
            },
            symbol: {
              type: 'string',
              description: 'The symbol of the stock',
              example: 'AAPL.US'
            },
            open: {
              type: 'number',
              description: 'The opening price of the stock'
            },
            high: {
              type: 'number',
              description: 'The highest price of the stock during the period'
            },
            low: {
              type: 'number',
              description: 'The lowest price of the stock during the period'
            },
            close: {
              type: 'number',
              description: 'The closing price of the stock'
            }
          }
        }
      }
    }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized',
  }
  #swagger.responses[500] = {
    description: 'Internal server error'
  }
  */

  return stockController.getStock(req, res, next)
})
router.get('/history', (req, res, next) => {
  /*
  #swagger.tags = ['Stocks']
  #swagger.summary = 'Get stock history'
  #swagger.description = 'This endpoint retrieves stock history data for a specified user.'
  #swagger.security = [{
    "bearerAuth": []
  }]
  #swagger.responses[200] = {
    description: 'Stock history data retrieved successfully',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
                description: 'The date of the query',
                example: '2021-04-01T19:20:30Z'
              },
              name: {
                type: 'string',
                description: 'The name of the stock',
                example: 'APPLE'
              },
              symbol: {
                type: 'string',
                description: 'The symbol of the stock',
                example: 'AAPL.US'
              },
              open: {
                type: 'number',
                description: 'The opening price of the stock'
              },
              high: {
                type: 'number',
                description: 'The highest price of the stock during the period'
              },
              low: {
                type: 'number',
                description: 'The lowest price of the stock during the period'
              },
              close: {
                type: 'number',
                description: 'The closing price of the stock'
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized',
  }
  #swagger.responses[500] = {
    description: 'Internal server error'
  }
  */
  return stockController.getStockHistory(req, res, next)
})


router.use(AuthMiddleware.authorize);
router.get('/stats', (req, res, next) => {
  /*
  #swagger.tags = ['Stocks']
  #swagger.summary = 'Get stock statistics'
  #swagger.description = 'This endpoint retrieves stock statistics data.'
    #swagger.security = [{
    "bearerAuth": []
  }]
  #swagger.responses[200] = {
    description: 'Stock statistics data retrieved successfully',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              symbol: {
                type: 'string',
                description: 'The symbol of the stock',
                example: 'AAPL.US'
              },
              times_requested: {
                type: 'number',
                description: 'The number of times the stock was requested'
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error'
  }
  */

  return stockController.getStockStats(req, res, next)
})

export default router;

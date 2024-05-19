import request from 'supertest';
import app from '../../../src/infrastructure/webserver/app';
import { cleanUpDB, disconnectDB } from '../../testUtils';
import axios from 'axios'
import authMiddleware from '../../../src/interfaces/middlewares/authMiddleware';
import { createUser } from '../../factories/user';
import { createStock } from '../../factories/stock';
import GetStockHistoryDTO from '../../../src/application/dtos/getStockHistoryDto';

jest.mock('axios');
jest.mock('../../../src/interfaces/middlewares/authMiddleware', () => ({
  authenticate: jest.fn().mockImplementation((req, res, next) => {
    next()
  }),
  authorize: jest.fn().mockImplementation((req, res, next) => {
    next()
  })
}));

describe('StockController', () => {
  let response;

  afterAll(async () => {
    await disconnectDB()
  });

  describe('#getStock', () => {
    afterAll(async () => {
      await cleanUpDB()
    });

    describe('on success', () => {
      const mockData = {
        name: "APPLE",
        symbol: "AAPL.US",
        open: 189.51,
        high: 190.81,
        low: 189.18,
        close: 189.87
      }

      beforeAll(async () => {
        const email = 'test1@example.com'
        const role = 'user'
        const user = await createUser({ email, role })

        jest.spyOn(authMiddleware, 'authenticate').mockImplementation((req, res, next) => {
          req.user = { id: user.id };
          next()
        })

        jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

        response = await request(app)
          .get('/stock?q=aapl.us')
      });

      it('should return status code 200', () => {
        expect(response.status).toBe(200);
      });

      it('should return correct data', () => {
        expect(response.body).toEqual(mockData);
      });
    });

    describe('on fail', () => {

      beforeAll(async () => {
        const email = 'test2@example.com'
        const role = 'user'
        const user = await createUser({ email, role })

        jest.spyOn(authMiddleware, 'authenticate').mockImplementation((req, res, next) => {
          req.user = { id: user.id };
          next()
        })

        const error = new Error("Error on stock service")
        jest.spyOn(axios, 'get').mockRejectedValue(error)

        response = await request(app)
          .get('/stock?q=aapl.us')
      });

      it('should return status code 500', () => {
        expect(response.status).toBe(500);
      });

      it('should handle errors', () => {
        expect(response.body).toHaveProperty('name', 'InternalServerError');
      });
    });
  });

  describe('#getStockHistory', () => {
    afterAll(async () => {
      await cleanUpDB()
    });

    describe('on success', () => {
      describe('with stock data', () => {
        let expectedData;

        beforeAll(async () => {
          const email = 'test3@example.com'
          const role = 'user'
          const user = await createUser({ email, role })

          const mockStockData = {
            name: "APPLE",
            symbol: "AAPL.US",
            open: 189.51,
            high: 190.81,
            low: 189.18,
            close: 189.87,
            userId: user.id
          }

          const stock1 = await createStock(mockStockData)
          const stock2 = await createStock(mockStockData)
          expectedData = [stock2, stock1].map(item => new GetStockHistoryDTO(item))

          jest.spyOn(authMiddleware, 'authenticate').mockImplementation((req, res, next) => {
            req.user = { id: user.id };
            next()
          })

          response = await request(app)
            .get('/history')
        });

        it('should return status code 200', () => {
          expect(response.status).toBe(200);
        });

        it('should return correct data', () => {
          expect(response.body).toEqual(expectedData);
        });
      });

      describe('with no stock data', () => {
        beforeAll(async () => {
          const email = 'test4@example.com'
          const role = 'user'
          const user = await createUser({ email, role })

          jest.spyOn(authMiddleware, 'authenticate').mockImplementation((req, res, next) => {
            req.user = { id: user.id };
            next()
          })

          response = await request(app)
            .get('/history')
        });

        it('should return status code 200', () => {
          expect(response.status).toBe(200);
        });

        it('should return correct data', () => {
          expect(response.body).toEqual([]);
        });
      });
    });
  });

  describe('#getStockStats', () => {
    afterAll(async () => {
      await cleanUpDB()
    });

    describe('on success', () => {
      describe('with no stock data', () => {
        beforeAll(async () => {
          const email = 'test4@example.com'
          const role = 'admin'
          const user = await createUser({ email, role })

          jest.spyOn(authMiddleware, 'authenticate').mockImplementation((req, res, next) => {
            req.user = { id: user.id };
            next()
          })

          response = await request(app)
            .get('/stats')
        });

        it('should return status code 200', () => {
          expect(response.status).toBe(200);
        });

        it('should return correct data', () => {
          expect(response.body).toEqual([]);
        });
      });

      describe('with stock data', () => {
        let expectedData;

        beforeAll(async () => {
          const email = 'test3@example.com'
          const role = 'admin'
          const user = await createUser({ email, role })

          const stockData1 = {
            name: "APPLE",
            symbol: "AAPL.US",
            open: 189.51,
            high: 190.81,
            low: 189.18,
            close: 189.87,
            userId: user.id
          }

          const stockData2 = {
            name: "Ares Acquisition Corp II",
            symbol: "AACT.US",
            open: 189.51,
            high: 190.81,
            low: 189.18,
            close: 189.87,
            userId: user.id
          }

          await createStock(stockData1)
          await createStock(stockData1)
          await createStock(stockData2)

          expectedData = [{ "stock": "AAPL.US", "times_requested": 2 }, { "stock": "AACT.US", "times_requested": 1 }]

          jest.spyOn(authMiddleware, 'authenticate').mockImplementation((req, res, next) => {
            req.user = { id: user.id };
            next()
          })

          response = await request(app)
            .get('/stats')
        });

        it('should return status code 200', () => {
          expect(response.status).toBe(200);
        });

        it('should return correct data', () => {
          expect(response.body).toEqual(expectedData);
        });
      });
    });

    describe('on fail', () => {
      describe('with role is not admin', () => {
        beforeAll(async () => {
          const email = 'test5@example.com'
          const role = 'user'
          const user = await createUser({ email, role })

          jest.spyOn(authMiddleware, 'authenticate').mockImplementation((req, res, next) => {
            req.user = { id: user.id, role: user.role };
            next()
          })
   
          jest.spyOn(authMiddleware, 'authorize').mockImplementation((req, res, next) => {
            const { role } = req.user
            if (role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
            next()
          })

          response = await request(app)
            .get('/stats')
        });

        it('should return status code 403', () => {
          expect(response.status).toBe(403);
        });

        it('should handle errors', () => {
          expect(response.body).toHaveProperty('message', 'Forbidden');
        });
      });
    });
  });
});

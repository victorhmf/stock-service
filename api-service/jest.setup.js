jest.mock("./src/interfaces/logger")
jest.mock('morgan', () => jest.fn(() => (req, res, next) => next()));

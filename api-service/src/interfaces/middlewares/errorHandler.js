import { EmailNotUniqueError } from "../../application/errors/EmailNotUniqueError.js";
import { UserNotFoundError } from "../../application/errors/UserNotFoundError.js";
import logger from "../logger/index.js";

// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  logger.error(error)
  
  const knownErrors = [
    EmailNotUniqueError,
    UserNotFoundError
  ];

  const isKnownError = knownErrors.find((knownError) => error instanceof knownError);

  if (isKnownError) {
    return res.status(400).json({
      message: error.message, name: error.name,
      data: error.data || {},
    });
  }

  return res.status(500).json(
    { message: 'Internal Server Error.', name: 'InternalServerError' });
};

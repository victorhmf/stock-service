export default (error, req, res, next) => {
  console.error("ERROR:", error)
  
  const knownErrors = [];

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

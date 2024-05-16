
// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  console.error(error)

  return res.status(500).json(
    { message: 'Internal Server Error.', name: 'InternalServerError' });
};
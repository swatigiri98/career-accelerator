/**
 * Wraps an async Express route handler so any thrown error or rejected
 * promise is passed to next(), landing in the central errorHandler
 * instead of crashing the process or hanging the request.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

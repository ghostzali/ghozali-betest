import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(
    `[error] ${req.method} ${req.url}: ${JSON.stringify(
      req.body || {},
    )}, error => ${JSON.stringify(err)}, stack trace: ${console.trace()}`,
  );

  if (res.headersSent) return;

  if (err instanceof Error) {
    if (err.name === 'ValidationError') res.status(400).json({ message: err.message });
    else res.status(500).json({ message: err.message });
    return;
  }

  res.status(404).json({
    errors: [
      {
        message: `${err}`,
      },
    ],
  });
};

export default errorMiddleware;

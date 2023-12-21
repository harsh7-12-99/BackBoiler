class APIError extends Error {
  constructor(
    statusCode,
    message = "Something went worng",
    error = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.error = error;
  }
}

export { APIError };

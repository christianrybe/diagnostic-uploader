class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default BadRequestError;

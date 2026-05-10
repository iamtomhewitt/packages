class LambdaError extends Error {
  code = 500;

  constructor (name: string, message: string, code = 500) {
    super(message);
    this.name = name;
    this.code = code;
    Object.setPrototypeOf(this, LambdaError.prototype);
  }
}

export class BadRequestError extends LambdaError {
  constructor (message: string) {
    super('BadRequest', message, 400);
  }
}

export class NotFoundError extends LambdaError {
  constructor (message: string) {
    super('NotFound', message, 404);
  }
}

export class UnauthorisedError extends LambdaError {
  constructor (message: string) {
    super('Unauthorised', message, 401);
  }
}

export class InternalServerError extends LambdaError {
  constructor (message: string) {
    super('InternalServerError', message, 500);
  }
}

/**
 * Wraps `handler` in `onError`, separating the need for having to write `try/catch` handling. Mainly useful for AWS Lambdas.
 * @param handler Main function to call.
 * @param onError What to do if `handler` throws an error.
 * @returns Output of `handler`, or output of `onError` if `handler` throws.
 */
export const withErrorHandling = (
  handler: (e: any) => Promise<any>,
  onError: (err: any, httpCode: number) => Promise<any> | any,
) => async (e: any) => {
  try {
    return await handler(e);
  }
  catch (err: any) {
    let { code } = err;

    if (!err.code) {
      const codeMap: any = {
        NoSuchKey: 404,
      };

      code = codeMap[err.name] || 500;
    }

    return onError(err, code);
  }
};
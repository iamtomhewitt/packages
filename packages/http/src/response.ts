type ResponseBody = {
  [key: string]: any;
}

type ResponseHeaders = {
  [key: string]: any;
}

type ResponseData = {
  body?: ResponseBody;
  headers?: ResponseHeaders;
  message?: string;
}

const json = (statusCode: number, data: ResponseData) => {
  if (!data.message) {
    throw new Error('No "message" property in response body');
  }

  return {
    body: JSON.stringify({
      message: data.message,
      data: data.body,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      ...data.headers,
    },
    statusCode,
  };
};

/**
 * Sets up a JSON response commonly used for returning from an AWS Lambda via APIGateway.
 * 
 * `body` will be wrapped in a json object, so passing:
 * ```
 * { foo: 'bar' }
 * ```
 * would return a body with:
 * ```
 * { data: { foo: 'bar' } }
 * ```
 */
export const response = {
  json,
  noContent: (data: ResponseData) => json(204, data),
  ok: (data: ResponseData) => json(200, data),
};
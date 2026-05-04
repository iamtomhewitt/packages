type RequestParams = {
  body?: any;
  headers?: HeadersInit;
  method: string;
  url: string;
}

const makeRequest = async<T>({ url, method, body, headers }: RequestParams): Promise<T> => {
  const bodyToUse = JSON.stringify(body || {});

  console.log(`Making a ${method} request to ${url} with body ${bodyToUse}`);

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...method !== 'GET' && {
      body: bodyToUse,
    },
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || '';
    const detail = contentType.includes('application/json') ? await response.json() : '';
    throw {
      code: response.status,
      message: `${method} request failed for ${url} - ${JSON.stringify(detail)}`,
      status: `${response.statusText}`,
    };
  }

  if (response.status === 204) {
    return null as T;
  }

  const responseBody = await response.text();

  if (!responseBody) {
    return {} as T;
  }

  return JSON.parse(responseBody);
};

const get = async<T>(url: string, headers?: HeadersInit): Promise<T> => {
  return await makeRequest({
    body: undefined,
    headers,
    method: 'GET',
    url,
  });
};

const post = async<T>(url: string, body?: any, headers?: HeadersInit): Promise<T> => {
  return await makeRequest({
    body,
    headers,
    method: 'POST',
    url,
  });
};

const put = async<T>(url: string, body?: any, headers?: HeadersInit): Promise<T> => {
  return await makeRequest({
    body,
    headers,
    method: 'PUT',
    url,
  });
};

const _delete = async<T>(url: string, body?: any, headers?: HeadersInit): Promise<T> => {
  return await makeRequest({
    body,
    headers,
    method: 'DELETE',
    url,
  });
};

/**
 * Simple HTTP module, that handles errors and returns response bodies.
 * 
 * If the response is not ok, a `code`, `message`, and `status` is returned as the request body, with details. `204` returns an empty body.
 * Otherwise, the response body is parsed as JSON and returned (if there is no response body, an empty JSON object is returned).
 */
export const request = {
  delete: _delete,
  get,
  post,
  put,
};
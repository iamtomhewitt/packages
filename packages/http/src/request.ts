type RequestParams = {
  body?: any;
  headers?: HeadersInit;
  method: string;
  url: string;
}

const makeRequest = async ({ url, method, body, headers }: RequestParams) => {
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
    return;
  }

  const responseBody = await response.text();

  if (!responseBody) {
    return {};
  }

  return JSON.parse(responseBody);
};

const get = async<T>(url: string, headers?: HeadersInit,): Promise<T> => {
  return await makeRequest({
    url,
    method: 'GET',
    body: undefined,
    headers,
  });
};

const post = async<T>(url: string, body?: any, headers?: HeadersInit,): Promise<T> => {
  return await makeRequest({
    url,
    method: 'POST',
    body,
    headers,
  });
};

const put = async<T>(url: string, body?: any, headers?: HeadersInit,): Promise<T> => {
  return await makeRequest({
    url,
    method: 'PUT',
    body,
    headers,
  });
};

export const request = {
  get,
  post,
  put,
};
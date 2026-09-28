const BASE_URL = 'https://techeruditestaging.com/projects/plie-api/public/api';

async function request(path, {method = 'POST', body, token} = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
    body,
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error('Unexpected server response. Please try again.');
  }

  if (!res.ok || json.success === false) {
    throw new Error(json.message || 'Something went wrong. Please try again.');
  }
  return json;
}

export function login({email, password}) {
  const form = new FormData();
  form.append('email', email);
  form.append('password', password);
  return request('/login', {body: form});
}

export function fetchEvents(token) {
  return request('/events-listing', {token});
}

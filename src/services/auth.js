const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export async function loginWithPassword(username, password, role) {
  const response = await fetch(`${API_BASE_URL.replace(/\/+$/, '')}/api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ username, password, role }),
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error('The login service returned an unreadable response.');
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('The login service returned an invalid response.');
  }

  if (!response.ok) {
    const message =
      (typeof payload.message === 'string' && payload.message) ||
      (typeof payload.detail === 'string' && payload.detail) ||
      `Login failed (${response.status}).`;
    throw new Error(message);
  }

  if (
    typeof payload.message !== 'string' ||
    !payload.user ||
    typeof payload.user !== 'object' ||
    typeof payload.access !== 'string' ||
    typeof payload.refresh !== 'string'
  ) {
    throw new Error('The login service returned an invalid response.');
  }

  return {
    message: payload.message,
    user: payload.user,
    access: payload.access,
    refresh: payload.refresh,
  };
}

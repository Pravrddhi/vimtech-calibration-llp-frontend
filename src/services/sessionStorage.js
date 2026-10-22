import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'vimtech.auth.session';

function getWebStorage() {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    throw new Error('Session storage is not available in this browser.');
  }
  return window.sessionStorage;
}

export async function loadSession() {
  const serialized =
    Platform.OS === 'web'
      ? getWebStorage().getItem(SESSION_KEY)
      : await SecureStore.getItemAsync(SESSION_KEY);

  if (serialized === null) return null;

  let session;
  try {
    session = JSON.parse(serialized);
  } catch {
    throw new Error('The saved login session is invalid. Please clear it and log in again.');
  }

  if (
    !session ||
    typeof session !== 'object' ||
    !session.user ||
    typeof session.user !== 'object' ||
    typeof session.access !== 'string' ||
    typeof session.refresh !== 'string'
  ) {
    throw new Error('The saved login session is invalid. Please log in again.');
  }

  return session;
}

export async function saveSession(session) {
  const serialized = JSON.stringify(session);
  if (Platform.OS === 'web') {
    getWebStorage().setItem(SESSION_KEY, serialized);
    return;
  }
  await SecureStore.setItemAsync(SESSION_KEY, serialized);
}

export async function clearSession() {
  if (Platform.OS === 'web') {
    getWebStorage().removeItem(SESSION_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(SESSION_KEY);
}

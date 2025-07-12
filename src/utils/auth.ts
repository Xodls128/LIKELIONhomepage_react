export function isLoggedIn(): boolean {
  return !!localStorage.getItem('access_token');
}

export function saveToken(token: string) {
  localStorage.setItem('access_token', token);
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

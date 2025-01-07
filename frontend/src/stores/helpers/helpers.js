function getAuthorization() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
    },
  }
}

export { getAuthorization }

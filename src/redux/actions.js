export function loadFriends(data) {
  return {
    type: 'LOAD_FRIENDS',
    payload: data,
  };
}

export function setActivePanel(data) {
  return {
    type: 'SET_PANEL',
    payload: data,
  };
}

export function loadFriends(data) {
  return {
    type: 'LOAD_FRIENDS',
    payload: data,
  };
}

export function setName(data) {
  return {
    type: 'SET_NAME',
    payload: data,
  };
}

export function setAgeRange(data) {
  return {
    type: 'SET_AGERANGE',
    payload: data,
  };
}

export function setSex(data) {
  return {
    type: 'SET_SEX',
    payload: data,
  };
}

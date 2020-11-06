import React from 'react';

import { Cell, Avatar } from '@vkontakte/vkui';

import './UserCell.css';

const UserCell = ({ user }) => {
  const convertSex = (sex) => {
    switch (sex) {
      case 1:
        return 'Женщина';
      case 2:
        return 'Мужчина';
      default:
        return 'Неопределённый';
    }
  };

  const convertAge = (age) => {
    age = '' + age;
    if (age[0] !== '1' && age[1] === '1') {
      return `${age} год`;
    } else if (age[0] !== '1' && (age[1] === '2' || age[1] === '3' || age[1] === '4')) {
      return `${age} года`;
    } else {
      return `${age} лет`;
    }
  };

  return (
    <Cell
      before={user.photo_100 ? <Avatar src={user.photo_100} /> : null}
      description={
        <div>
          <p>{user.city && user.city.title ? user.city.title : ''}</p>
          <p>{convertSex(user.sex)}</p> <p>{user.age ? convertAge(user.age) : ''}</p>
        </div>
      }
    >
      {`${user.first_name} ${user.last_name}`}
    </Cell>
  );
};

export default UserCell;

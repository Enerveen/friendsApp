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

  const birthDateToAge = (bd) => {
    if (bd) {
      const [day, month, year] = bd.split('.');
      const birthDate = new Date(year, month, day),
        now = new Date(),
        age = now.getFullYear() - birthDate.getFullYear();
      const res = now.setFullYear(1972) < birthDate.setFullYear(1972) ? age - 1 : age;
      return res ? `Возраст: ${res}` : '';
    } else {
      return '';
    }
  };

  return (
    <Cell
      before={user.photo_100 ? <Avatar src={user.photo_100} /> : null}
      description={
        <div>
          <p>{user.city && user.city.title ? user.city.title : ''}</p>
          <p>{convertSex(user.sex)}</p> <p>{birthDateToAge(user.bdate)}</p>
        </div>
      }
    >
      {`${user.first_name} ${user.last_name}`}
    </Cell>
  );
};

export default UserCell;

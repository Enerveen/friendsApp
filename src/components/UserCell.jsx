import React from 'react';

import { Cell, Avatar } from '@vkontakte/vkui';

const UserCell = ({ user }) => {
  const convertSex = (sex) => {
    switch (sex) {
      case 1:
        return 'Женский';
      case 2:
        return 'Мужской';
      default:
        return 'Неопределённый';
    }
  };

  const birthDateToAge = (bd) => {
    const [day, month, year] = bd.split('.');
    const birthDate = new Date(year, month, day);
    const now = new Date(),
      age = now.getFullYear() - birthDate.getFullYear();
    return now.setFullYear(1972) < birthDate.setFullYear(1972) ? age - 1 : age;
  };

  return (
    <Cell
      before={user.photo_100 ? <Avatar src={user.photo_100} /> : null}
      description={`${user.city && user.city.title ? user.city.title : ''} Пол: ${convertSex(user.sex)}; Возраст: ${
        user.bdate.length > 7 ? birthDateToAge(user.bdate) : 'Неизвестен'
      }`}
    >
      {`${user.first_name} ${user.last_name}`}
    </Cell>
  );
};

export default UserCell;

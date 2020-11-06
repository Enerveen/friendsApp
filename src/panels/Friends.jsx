import React from 'react';

import { connect } from 'react-redux';
import { setActivePanel } from '../redux/actions';
import { Panel, PanelHeader, List, CellButton } from '@vkontakte/vkui';

import UserCell from '../components/UserCell';

const Friends = ({ friends, params, id, setActivePanel }) => {
  if (friends.length > 10000) {
    friends.length = 10000;
  }

  const birthDateToAge = (user) => {
    if (user.bdate) {
      const [day, month, year] = user.bdate.split('.');
      const birthDate = new Date(year, month, day),
        now = new Date(),
        age = now.getFullYear() - birthDate.getFullYear();
      const res = now.setFullYear(1972) < birthDate.setFullYear(1972) ? age - 1 : age;
      user.age = res;
    } else {
      return;
    }
  };

  friends.map((elem) => birthDateToAge(elem));

  const filterFriends = (users) => {
    users = users.filter((user, index, self) => self.findIndex((u) => u.id === user.id) === index);

    if (params.name !== '') {
      users = users.filter((elem) => elem.first_name.includes(params.name) || elem.last_name.includes(params.name));
    }
    if (params.sex !== 0) {
      users = users.filter((elem) => elem.sex === params.sex);
    }
    if (!(params.ageRange[0] === 14 && params.ageRange[1] === 100)) {
      users = users.filter((elem) => elem.age >= params.ageRange[0] && elem.age < params.ageRange[1]);
    }

    return users;
  };

  const filteredFriends = filterFriends(friends);

  console.log(filteredFriends);
  return (
    <Panel id={id}>
      <PanelHeader>Десять тысяч друзей!</PanelHeader>
      <CellButton onClick={() => setActivePanel('search')}>Настройки поиска</CellButton>
      <List>
        {filteredFriends.map((user, index) => (
          <UserCell key={index} user={user} />
        ))}
      </List>
    </Panel>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    params: state.params,
  };
};

export default connect(mapStateToProps, { setActivePanel })(Friends);

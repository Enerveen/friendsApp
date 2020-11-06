import React from 'react';

import { connect } from 'react-redux';
import { setActivePanel, setLoading } from '../redux/actions';
import { Panel, PanelHeader, Header, List, CellButton } from '@vkontakte/vkui';

import UserCell from '../components/UserCell';

const Friends = ({ friends, params, id, setActivePanel, loading, setLoading }) => {
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

  if (filteredFriends[0]) {
    setLoading(false);
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
  } else {
    if (!loading) {
      return (
        <Panel id={id}>
          <PanelHeader>Десять тысяч друзей!</PanelHeader>
          <Header subtitle='Попробуйте изменить критерии поиска или найти новых друзей'>Никого не найдено :(</Header>
          <CellButton onClick={() => setActivePanel('search')}>Попробовать ещё</CellButton>
        </Panel>
      );
    } else {
      return <></>;
    }
  }
};

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    params: state.params,
    loading: state.app.isLoading,
  };
};

export default connect(mapStateToProps, { setActivePanel, setLoading })(Friends);

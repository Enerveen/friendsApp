import React from 'react';

import { connect } from 'react-redux';
import { setActivePanel } from '../redux/actions';
import { Panel, PanelHeader, List, CellButton } from '@vkontakte/vkui';

import UserCell from '../components/UserCell';

const Friends = ({ friends, id, setActivePanel }) => {
  friends = friends.filter((user, index, self) => self.findIndex((u) => u.id === user.id) === index);
  console.log(friends);
  return (
    <Panel id={id}>
      <PanelHeader>Десять тысяч друзей!</PanelHeader>
      <CellButton onClick={() => setActivePanel('search')}>Поиск по списку</CellButton>
      <List>
        {friends.map((user, index) => (
          <UserCell key={index} user={user} />
        ))}
      </List>
    </Panel>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
  };
};

export default connect(mapStateToProps, { setActivePanel })(Friends);

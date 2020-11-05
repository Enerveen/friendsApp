import React from 'react';

import { connect } from 'react-redux';
import { Header, Group } from '@vkontakte/vkui';

import UserCell from '../components/UserCell';

const Main = ({ friends }) => {
  console.log(friends);
  if (friends) {
    return (
      <Group header={<Header mode='secondary'>Вот они сверху вниз:</Header>}>
        {friends.map((user, index) => (
          <UserCell key={index} user={user} />
        ))}
      </Group>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
  };
};

export default connect(mapStateToProps, null)(Main);

import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Panel, PanelHeader, Header, Group, Cell } from '@vkontakte/vkui';

import UserCell from '../components/UserCell';

const Main = ({ friends }) => {
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

export default Main;

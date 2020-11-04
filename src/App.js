import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, PanelHeader, Header, Group, Cell } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import Main from './panels/Main';

const App = () => {
  const [friends, setFriends] = useState([]);
  console.log(friends);

  useEffect(() => {
    bridge.send('VKWebAppGetUserInfo').then((user) =>
      bridge
        .send('VKWebAppCallAPIMethod', {
          method: 'friends.get',
          request_id: '32test',
          params: {
            fields: 'sex, bdate, city, photo_100',
            user_id: user.id,
            count: 10000,
            v: '5.124',
            access_token: '26f745c126f745c126f745c1142683fb12226f726f745c179559e7ac74f7945e93c61fb',
          },
        })
        .then((friendsList) => {
          setFriends(friendsList.response.items);
        })
    );
  }, []);

  return (
    <View activePanel='main'>
      <Panel id='main'>
        <PanelHeader>Мои дорогие товарищи</PanelHeader>
        <Main id='main' friends={friends} />
      </Panel>
    </View>
  );
};

export default App;

/* ; */

/*
            ; */

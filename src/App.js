import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';

import { loadFriends } from './redux/actions';

import '@vkontakte/vkui/dist/vkui.css';

import Main from './panels/Main';

const App = ({ loadFriends }) => {
  useEffect(() => {
    bridge.send('VKWebAppGetUserInfo').then((user) =>
      bridge
        .send('VKWebAppCallAPIMethod', {
          method: 'friends.get',
          params: {
            fields: 'sex, bdate, city, photo_100',
            user_id: user.id,
            count: 10000,
            v: '5.124',
            access_token: '26f745c126f745c126f745c1142683fb12226f726f745c179559e7ac74f7945e93c61fb',
          },
        })
        .then((friendsList) => {
          loadFriends(friendsList.response.items);
          friendsList.response.items.map((elem, index) =>
            bridge
              .send('VKWebAppCallAPIMethod', {
                method: 'friends.get',
                params: {
                  fields: 'sex, bdate, city, photo_100',
                  user_id: elem.id,
                  count: 10000,
                  v: '5.124',
                  access_token: '26f745c126f745c126f745c1142683fb12226f726f745c179559e7ac74f7945e93c61fb',
                },
              })
              .then((res) => loadFriends(res.response.items))
          );
        })
    );
  }, []);

  return (
    <View activePanel='main'>
      <Panel id='main'>
        <PanelHeader>Мои дорогие товарищи</PanelHeader>
        <Main id='main' />
      </Panel>
    </View>
  );
};

export default connect(null, { loadFriends })(App);

/*

*/

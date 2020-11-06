import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';
import { View } from '@vkontakte/vkui';

import { loadFriends } from './redux/actions';

import '@vkontakte/vkui/dist/vkui.css';

import Friends from './panels/Friends';
import Search from './panels/Search';

const App = ({ friends, loadFriends, panel }) => {
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
          friendsList.response.items.map((elem) =>
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
              .then((res) =>
                friends.length < 10000 ? loadFriends(res.response.items) : console.log('10k limit reached')
              )
          );
        })
    ); // eslint-disable-next-line
  }, []);

  return (
    <View activePanel={panel}>
      <Friends id='friends' />
      <Search id='search' />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    panel: state.panel,
  };
};

export default connect(mapStateToProps, { loadFriends })(App);

/*

*/

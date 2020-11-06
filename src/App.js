import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';
import { View, PopoutWrapper, ScreenSpinner } from '@vkontakte/vkui';

import { loadFriends } from './redux/actions';

import '@vkontakte/vkui/dist/vkui.css';

import Friends from './panels/Friends';
import Search from './panels/Search';

const App = ({ friends, loadFriends, panel, loading }) => {
  const popup = loading ? (
    <PopoutWrapper>
      <ScreenSpinner />
    </PopoutWrapper>
  ) : null;

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
            access_token: process.env.ACCESS_TOKEN,
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
                  access_token: process.env.ACCESS_TOKEN,
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
    <View activePanel={panel} popout={popup}>
      <Friends id='friends' />
      <Search id='search' />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    panel: state.app.activePanel,
    loading: state.app.isLoading,
  };
};

export default connect(mapStateToProps, { loadFriends })(App);

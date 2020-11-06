import React from 'react';

import { connect } from 'react-redux';
import {
  Panel,
  FormLayout,
  Input,
  Radio,
  RangeSlider,
  PanelHeader,
  CellButton,
  Header,
  Separator,
} from '@vkontakte/vkui';

import { setName, setAgeRange, setSex, setActivePanel } from '../redux/actions';

const Search = ({ id, params, setName, setAgeRange, setSex, setActivePanel }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Поиск</PanelHeader>
      <FormLayout top='Поиск'>
        <Input
          placeholder='Имя или фамилия'
          type='text'
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div>
          <Header mode='secondary'>Пол</Header>
          <Radio
            name='radio'
            value='2'
            description=''
            onInput={(e) => {
              setSex(Number(e.target.value));
            }}
          >
            Мужской
          </Radio>
          <Radio
            name='radio'
            value='1'
            onInput={(e) => {
              setSex(Number(e.target.value));
            }}
          >
            Женский
          </Radio>
          <Radio
            name='radio'
            value='0'
            defaultChecked
            onInput={(e) => {
              setSex(Number(e.target.value));
            }}
          >
            Любой
          </Radio>
        </div>
        <RangeSlider
          top={
            params.ageRange[0] === 14 && params.ageRange[1] === 100
              ? 'Возраст не имеет значения'
              : `Возраст: от ${params.ageRange[0]} до ${params.ageRange[1]} лет`
          }
          min={14}
          max={100}
          step={1}
          defaultValue={params.ageRange}
          onChange={(value) => {
            setAgeRange(value);
          }}
        />
      </FormLayout>
      <Separator />
      <CellButton onClick={() => setActivePanel('friends')}>Искать</CellButton>
    </Panel>
  );
};

const mapStateToProps = (state) => {
  return {
    params: state.params,
  };
};

export default connect(mapStateToProps, { setName, setAgeRange, setSex, setActivePanel })(Search);

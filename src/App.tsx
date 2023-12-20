import React, { useEffect, useState } from 'react';
import './App.css';
import { Slider, Switch } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from './hooks.ts/redux';
import { fetchData } from './store/reducers/ActionCreators';
import { setParams, setNum, setRange } from './store/reducers/FilterSlice';
import CheckboxFilter from './components/CheckboxFilter/CheckboxFilter';
import type { SliderMarks } from 'antd/es/slider';
import { Collapse, Divider } from 'antd';

function App() {

  const dispatch = useAppDispatch();
  const { filter } = useAppSelector(state => state.filterReducer);
  const { data } = useAppSelector(state => state.filterReducer);

  const columns: ColumnsType<any> = [
    {
      title: 'Текст',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Эмоция',
      dataIndex: 'emotions',
      key: 'emotions',
    },];


  useEffect(() => {
    dispatch(fetchData(filter.num, filter.minVary, filter.maxVary, filter.emotions));
  }, [filter.minVary, filter.maxVary]);


  const [disabled, setDisabled] = useState(false);

  const onChange = (newValue: number) => {
    dispatch(setNum(newValue));
  };

  const onRangeChange = (newValue: any) => {
    dispatch(setRange(newValue));
  };

  const marksNum: SliderMarks = {
    0: '0',
    100: '100'
  };

  const marksRange: SliderMarks = {
    1: '1',
    10: '10'
  };

  const onChangeCompleteFunc = (newValue: any) => {
    console.log('onChangeComplete ', newValue)
    dispatch(setNum(newValue));
    dispatch(fetchData(newValue, filter.minVary, filter.maxVary, filter.emotions))
  }


  return (
    <div className='main-container'>
      <h3>Количество записей</h3>
      <Slider
        defaultValue={10}
        marks={marksNum}
        /*tooltip={{ open: true, placement: 'bottom'}}*/
        value={filter.num}
        onChange={onChange}
        disabled={disabled}
        onChangeComplete={onChangeCompleteFunc}
      />
      <div className='block-wrapper'>
        <h3>Количество различных эмоций для одного текста</h3>
        <Slider
          max={10}
          min={1}
          marks={marksRange}
          /*tooltip={{ open: true, placement: 'bottom'}}*/
          range
          value={[filter.minVary, filter.maxVary]}
          onChange={onRangeChange}
          defaultValue={[1, 4]}
          disabled={disabled}
        />
      </div>
      <div className='block-wrapper'>
        <h3>Выбор эмоций</h3>
        <Divider orientation="left"></Divider>
        <Collapse
          items={[{
            key: '1', label: 'Доступные эмоции', children: <div>
              <CheckboxFilter></CheckboxFilter>
              <h5>*Результат содержит ТОЛЬКО выбранные эмоции</h5>
              <h5>**Без выбора выводятся все эмоции</h5>
            </div>
          }]}
        />
      </div>
      <div className='block-wrapper'>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default App;

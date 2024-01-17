import CheckboxFilter from './components/CheckboxFilter/CheckboxFilter';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchData } from './store/reducers/ActionCreators';
import { setNum, setRange } from './store/reducers/FilterSlice';
import { marksNum, marksRange } from './config/sliderConfig';
import { Collapse, Divider, Slider, Table } from 'antd';
import columnsDatasetTable from './config/tableConfig';
import React, { useEffect } from 'react';
import './App.css';


function App() {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector(state => state.filterReducer);
  const { data } = useAppSelector(state => state.filterReducer);

  useEffect(() => {
    dispatch(fetchData(filter.num, filter.minVary, filter.maxVary, filter.emotions));
  }, [filter.minVary, filter.maxVary]);

  const onNumChange = (newValue: number) => {
    dispatch(setNum(newValue));
  };

  const onRangeChange = (newValue: any) => {
    dispatch(setRange(newValue));
  };

  const completeNum = (newValue: any) => {
    console.log('onChangeComplete ', newValue)
    dispatch(fetchData(newValue, filter.minVary, filter.maxVary, filter.emotions))
  }

  return (
    <div className='main-container'>
      <h4>Количество записей</h4>
      <Slider
        defaultValue={10}
        marks={marksNum}
        /*tooltip={{ open: true, placement: 'bottom'}}*/
        value={filter.num}
        onChange={onNumChange}
        onChangeComplete={completeNum}
      />
      <Divider orientation="left"></Divider>
      <div className='block-wrapper'>
        <h4>Количество различных эмоций для одного текста</h4>
        <Slider
          max={10}
          min={1}
          marks={marksRange}
          /*tooltip={{ open: true, placement: 'bottom'}}*/
          range
          value={[filter.minVary, filter.maxVary]}
          onChange={onRangeChange}
          defaultValue={[1, 4]}
        />
      </div>
      <Divider orientation="left"></Divider>
      <div className='block-wrapper'>
        <h4>Выбор эмоций</h4>
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
      <Divider orientation="left"></Divider>
      <div className='block-wrapper'>
        <Table columns={columnsDatasetTable} dataSource={data} />
      </div>
    </div>
  );
};

export default App;

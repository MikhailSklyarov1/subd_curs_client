import React, { useEffect, useState } from 'react';
import './App.css';
import ILesson from './interfaces/ILesson'
import LessonService from './API/mainAPI';
import { Slider, Switch } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

function App() {

  const [lessons, setLessons] = useState<any[]>([]);
  const [numRecords, setNumRecords] = useState(5);
  const [rangeNumEmo, setrangeNumEmo] = useState([1,3]);


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
    fetchLessons();
  }, [numRecords, rangeNumEmo]);

  async function fetchLessons() {
    try {
      const res = await LessonService.getSomeRecordsWithVaryEmo(rangeNumEmo[0], rangeNumEmo[1], numRecords);
      setLessons(res.data);
      // console.log(lessons)
    }
    catch(e) {
      console.error('Error: ', e);
    }
  }

  const [disabled, setDisabled] = useState(false);

  const onChange = (newValue: number) => {
    setNumRecords(newValue);
  };

  const onRangeChange = (newValue: any) => {
    console.log(newValue)
    setrangeNumEmo(newValue);
  };

  return (
    <>
      <Slider defaultValue={30} value={numRecords} onChange={onChange} disabled={disabled} />
      <Slider range value={rangeNumEmo} onChange={onRangeChange} defaultValue={[1, 10]} disabled={disabled} />
      <Table columns={columns} dataSource={lessons} />
    </>
  );
};

export default App;

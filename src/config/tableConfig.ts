import type { ColumnsType } from 'antd/es/table';

const columnsDatasetTable: ColumnsType<any> = [
    {
      title: 'Текст',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Эмоция',
      dataIndex: 'emotions',
      key: 'emotions',
    }];

export default columnsDatasetTable;
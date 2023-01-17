import { Table } from 'antd';
import { useState } from 'react';
import { maindata } from "./data/maindata";
import SubTable from './SubTable';
import axios from "axios";

function App() {

  const [isOpening, setIsOpening] = useState(true);
  const [data, setData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const pagiRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const columns = [
    {
      title: 'Status',
      dataIndex: '',
    },
    {
      title: 'Tax ID',
      dataIndex: 'taxid',
      sorter: (a, b) => a - b,
    },
    {
      title: 'Modified By',
      dataIndex: 'modifiedby',
      sorter: (a, b) => a - b,
    },
    {
      title: 'Modified On',
      dataIndex: 'modifiedon',
      sorter: (a, b) => a - b,
    },
    {
      title: 'Delete',
      dataIndex: '',
      render: () => <a>Delete Icon</a>,
    },
  ];

  const fetchData = async () => {
    setIsOpening(true)
    try {
        const response = await axios.get(`http://localhost:3001/users`);
        setIsOpening(false);
        setData(response.data);
    } catch (error) {
        console.error(error);
    }
};


  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.id); // I have set my record.id as row key. Check the documentation for more details.
    }

    setExpandedRowKeys(keys);
    fetchData();
  }

  return (
    <div className="App">
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        className="MainTable"
        rowClassName="MainTableRow"
        expandedRowKeys={expandedRowKeys}
        onExpand={onTableRowExpand}
        expandable={{
          expandedRowRender: (record) => (
            isOpening ? <>Loading...</> : <SubTable data={data} id={record.id} />
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <span onClick={e => onExpand(record, e)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
              </span>
            ) : (
              <span onClick={e => onExpand(record, e)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
              </span>
            )
        }}
        pagination={{
          position: ['none', 'bottomCenter'],
          defaultPageSize: 5,
          itemRender: pagiRender
        }}
        dataSource={maindata}
      />
    </div>
  );
}

export default App;

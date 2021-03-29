import React from 'react';
import { useSelector } from 'react-redux';

import { Table, Space } from 'antd';
import { FolderOutlined, FileOutlined } from '@ant-design/icons';

const FileList = () => {
  const files = useSelector(state => state.file.files).map(file => ({ ...file, key: file._id }));

  const columns = [
    {
      dataIndex: 'type',
      key: 'type',
      align: 'right',
      render: text => text === 'dir' ? <FolderOutlined style={{ fontSize: '1.3rem', color: '#1890ff' }}/> :
        <FileOutlined style={{ fontSize: '1.1rem' }}/>
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date) => renderDate(date)
    },
    {
      title: 'Размер',
      dataIndex: 'size',
      key: 'size'
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite </a>
          <a>Delete</a>
        </Space>
      )
    }
  ];

  return (
    <div className="file-list">
      <Table columns={columns} dataSource={files}/>
    </div>
  );
};

export default FileList;

const renderDate = (date) => {
  const _date = new Date(date);

  return `${_date.getDate()}.${('0' + (_date.getMonth() + 1)).slice(-2)}.${_date.getFullYear()}`;
};

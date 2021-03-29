import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';

import { getFiles } from '../../actions/file';

import './Disk.scss';
import FileList from './FileList/FileList';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.file.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [ currentDir ]);

  return (
    <div className="disk">
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Корневая папка"
        extra={[
          <Button key="1">Создать папку</Button>
        ]}
      >
      </PageHeader>
      <FileList/>
    </div>
  );
};

export default Disk;

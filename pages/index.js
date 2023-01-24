import "antd/dist/antd.css";

import { Button, Table, Modal, Input ,Space} from "antd";
import { useState } from "react";


function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "java script",  
    },
    {
      id: 2,
      name: "React", 
    },
    {
      id: 3,
      name: "Nextjs",
     },
    {
      id: 4,
      name: "antd", 
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
   
   
    {
      key: "3",
      title: "Operation",
      render: (record) => {
        return (
          <Space>
            <Button onClick={() => {
                onEdit(record);
              }} type="primary">Edit</Button>
              
            <Button onClick={() => {
                onDelete(record);
              }} type="danger">Delete</Button>
            
         
            
          </Space>
        );
      },
    },
  ];

  const onAdd = () => {
    
    const newEmployee = {
      id: '1',
      name: "newemp" 
  
    };
    setDataSource((pre) => {
      return [...pre, newEmployee];
    });
  };
  const onDelete = (record) => {
    Modal.confirm({
      title: " you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((Employee) => Employee.id !== record.id);
        });
      },
    });
  };
  const onEdit = (record) => {
    setIsEditing(true);
    setEditing({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditing(null);
  };
  return (
    <div>
      <header>
        <h1 style={{marginLeft:"500px"}}>CRUD OPeration</h1>
        <Table columns={columns} dataSource={dataSource} style={{width:"600px", marginLeft:"320px",marginTop:"100px"}}
        pagination={false}></Table>
        <Modal
          title="Edit Employee"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((Employee) => {
                if (Employee.id === editing.id) {
                  return editing;
                } else {
                  return Employee;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editing?.name}
            onChange={(e) => {
              setEditing((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
            
          />
         
         
        
        </Modal>
        <Button onClick={onAdd} type="primary" style={{borderRadius:"5px",marginLeft:"500px",marginTop:"50px"}}>Add here</Button>
       
      </header>
    </div>
  );
}

export default App;
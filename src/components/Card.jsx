import './Card.css'
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import { GlobalOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Modal, Card, Input, Form, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import HeartShape from './HeartShape';



const Cart = () => {



  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({

    name: "",
    email: "",
    phone: "",
    website: ""




  });

  






  const showModal = (id) => {
    setIsModalVisible(true);

    Data(id);


  };

  const handleOk = (id) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, form)


    console.log(form)

    setIsModalVisible(false);



  };

// nothing 

  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //   ends here



  // for form input 

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  // ends here




  //  user deatils fecthing fuction 

  const resInfo = async () => {

    try {

      const resData = await axios.get('https://jsonplaceholder.typicode.com/users/')
      setProduct(resData.data)

      setLoading(true)


    } catch (error) {
      console.log(error)
    }


  }

  //   ends here




  useEffect(() => {

    resInfo()

  }, [])


  // api call for edit users 

  const Data = async (id) => {


    const resData = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    setForm(resData.data);

  }


  // ends here


  // onchnage event handling

  const onChangeHandler = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value })

  }


  // ends here



  // delete user function

  const Delete = (id) => {

    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)

    // console.log('deleted');

    var newuser = product.filter(item => item.id !== id)
    setProduct(newuser)

  }

  // end here









  return (

    <div className='card-main'>

      {

        !loading ? <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div> : (


          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} wrap={true}  >

            {

              product.map((item, index) => {

                return <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} key={index}>

                  <div className="card-box">

                    <Card
                      style={{
                        width: 300,}}
                      cover={
                        <div className='card-cover'>

                          <img
                            alt="example"
                            src={`https://avatars.dicebear.com/v2/avataaars/{${item.name}}.svg?options[mood][]=happy`}
                            style={{ width: 200, height: 200, marginLeft: 50 }}

                          />
                        </div>

                      }
                      actions={[

                        <HeartShape />,

                        <EditOutlined key="edit" style={{ fontSize: '20px', }} onClick={() => showModal(item.id)} />,

                        <DeleteFilled key="delete" style={{ fontSize: '20px', }} onClick={() => Delete(item.id)} />

                      ]}

                    >

                      <div className="card-info">

                        <h3>    {item.name} </h3>
                        <h5> <PhoneOutlined style={{ fontSize: '18px', }} />   {item.phone} </h5>
                        <h5><MailOutlined style={{ fontSize: '18px', }} />   {item.email} </h5>
                        <h5><GlobalOutlined style={{ fontSize: '18px', }} />  {item.website} </h5>

                      </div>
                    </Card>
                  </div>

                </Col>
              })
            }

          </Row>
        )
      }

      {/* modal work started from here */}

      <Modal title="Basic Modal" visible={isModalVisible} onOk={() => handleOk(form.id)} onCancel={handleCancel}>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}



          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"


        >

          <Form.Item    label="Name">
            <Input value={`${form.name}`} onChange={(e) => onChangeHandler(e)} name='name' />
          </Form.Item>
          <Form.Item
            label="Email"
          >
            <Input value={`${form.email}`} onChange={(e) => onChangeHandler(e)} name='email' />
          </Form.Item>
          <Form.Item

            label="Phone"
          >
            <Input value={`${form.phone}`} onChange={(e) => onChangeHandler(e)} name='phone' />
          </Form.Item>
          <Form.Item
            label="Website"
          >
            <Input value={`${form.website}`} onChange={(e) => onChangeHandler(e)} name='website' />
          </Form.Item>

        </Form>


      </Modal>
      {/* ends here */}


    </div>

  )

}



export default Cart
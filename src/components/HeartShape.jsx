import React ,{useState} from 'react'
import {  HeartOutlined ,HeartFilled  } from '@ant-design/icons';

const HeartShape = () => {

    const [heart, setHeart] = useState(true)

  return (
    <>
      {


     heart ? <HeartOutlined onClick={() => setHeart(false)} 
     style={{fontSize:'16px', color:'red'}}

      /> : <HeartFilled onClick={() => setHeart(true)} 

      style={{fontSize:'16px', color:'red'}}
      />










      }

     



    </>
  )
}

export default HeartShape
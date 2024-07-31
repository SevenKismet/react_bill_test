// 账单列表
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore  =   createSlice({
  name: "billStore",
//   初始化状态的值
  initialState: {
    billList: [],
  },
  reducers: {
    // 更改状态的方法
    setBillList: (state, action) => {
      state.billList = action.payload;
    }
  }
})
const { setBillList } = billStore.actions

// 定异步函数获取数据修改状态的值
const getBillList =()=>{
    return (dispatch)=>{
        axios.get('http://localhost:8888/name').then(res=>{
            console.log(res.data)
            dispatch(setBillList(res.data))
        })
    }
}

const reducers = billStore.reducers
export  {getBillList }
export default reducers
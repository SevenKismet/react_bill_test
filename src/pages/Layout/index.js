import { Outlet } from "react-router-dom"
import { TabBar } from "antd-mobile"
import { Button } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"
import './index.scss'
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
  } from 'antd-mobile-icons'

  const tabs = [
    {
      key: '/month',
      title: '月度账单',
      icon: <BillOutline />,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />,
    },
  ]
  
  
const Layout = ()=>{
    const dispatch = useDispatch()
    // 根据依赖触发事件
    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])
    return(
        <div className="layout">
        <div className="container">
            <Outlet />
        </div>
        <div className="footer">
            <TabBar>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
            </TabBar>
        </div>
    </div>
    )
}
export default Layout
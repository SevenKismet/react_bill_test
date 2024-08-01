import { NavBar, DatePicker } from 'antd-mobile'
import { useState } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import _ from 'lodash'
import './index.scss'

const Month = () => {
   const [dateVisable, setDateVisable]  = useState(false)
   const [currentMonth, setCurrentMonth]  = useState(() => {
            return dayjs().format('YYYY-MM')
        })
        // 日期确认
    const dateConfirm = (date) => {
        setDateVisable(false)
        setCurrentMonth(dayjs(date).format('YYYY-MM'))
        console.log(date)
    }
    // 获取到存在sotre 中的数据
    const billList = useSelector(state => state.bill.billList)
    console.log(billList)
    // 类似计算属性,当依赖的值发生变化时,重新计算 :::需要指定依赖的变量 
    const monthGroup = useMemo(()=>{
        return  _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
    },[billList])
    console.log(monthGroup)
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisable(true)}>
            <span className="text">
            {currentMonth}月账单
            </span>
            {/* className={dateVisable ? 'arrow expand' : 'arrow'} */}
            <span className={classNames('arrow', dateVisable && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            onCancel={() => setDateVisable(false)}
            visible={dateVisable}
            max={new Date()}
            onConfirm={dateConfirm}
          />
        </div>
      </div>
    </div >
  )
}

export default Month
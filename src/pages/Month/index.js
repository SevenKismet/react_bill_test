import { NavBar, DatePicker } from 'antd-mobile'
import { useState } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useMemo, useEffect} from 'react'
import _ from 'lodash'
import './index.scss'
import DailyBill from './components/DayBill'

const Month = () => {
   const [dateVisable, setDateVisable]  = useState(false)
   const [currentMonthList,setMonthList] = useState([])
   const [currentMonth, setCurrentMonth]  = useState(() => {
            return dayjs().format('YYYY-MM')
        })
    // 获取到存在sotre 中的数据
    const billList = useSelector(state => state.bill.billList)
    console.log(billList)
    // 类似计算属性,当依赖的值发生变化时,重新计算 :::需要指定依赖的变量 
    const monthGroup = useMemo(()=>{
        return  _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
    },[billList])
    console.log(monthGroup)
    // 日期确认
    const dateConfirm = (date) => {
        setDateVisable(false)
        let formateDate = dayjs(date).format('YYYY-MM')
        setCurrentMonth(formateDate)
        console.log(date)
        setMonthList(monthGroup[formateDate])
        console.log(currentMonthList)
    }
    // 计算支出收入结余
   const overView = useMemo(()=>{
    if (!currentMonthList) return { income: 0, pay: 0, total: 0 }
        const pay =  currentMonthList.filter(item => item.type === 'pay').reduce((sum, item) => sum + item.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((sum, item) => sum + item.money, 0)
        return {
            pay, 
            income, 
            total: pay + income
        }
    },[currentMonthList])

    // 当前选择的月 再按照按照日分组
    const dayGroup = useMemo(()=>{
        let group =  _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
        return {
            daykeys: Object.keys(group),
            group
        }
    },[currentMonthList])
    // 初始化的时候调用的方法 .依赖monthGroup 的数据
    useEffect(()=>{
        const list = monthGroup[dayjs().format('YYYY-MM')]
            if(list){
               setMonthList(list)
             }
    },[monthGroup])
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
              <span className="money">{overView.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{overView.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{overView.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          { dayGroup.daykeys.map(item => {
               return <DailyBill  key={item} date={item} billList={dayGroup.group[item]} />
          })
            }
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
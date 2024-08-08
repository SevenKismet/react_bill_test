import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import {billTypeToName }from '@/constants'

const DailyBill = ({date,billList}) => {

    // 进行统计计算
    const dayResult = useMemo(() => {
    // 支出  /  收入  / 结余
        const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
        pay,
        income,
        total: pay + income
        }
    }, [billList])
   const [visible, setVisible] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon" onClick={() => setVisible(!visible)}>
          <span className="date">{date}</span>
          <span className={classNames('arrow', !visible && 'expand')} ></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{display: !visible && 'none'}}>
            {billList.map(item => {
                return (
                <div className="bill" key={item.id}>
                    <div className="detail">
                    <div className="billType">{ billTypeToName[item.useFor]}</div>
                    </div>
                    <div className={classNames('money', item.type)}>
                    {item.money.toFixed(2)}
                    </div>
                </div>
                )
            })}
            </div>
    </div>
  )
}
export default DailyBill
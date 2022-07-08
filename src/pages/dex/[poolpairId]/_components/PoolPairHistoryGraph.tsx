import { format } from 'date-fns'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { Area, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis, Bar } from 'recharts'
import classNames from 'classnames'
import BigNumber from 'bignumber.js'
import { CgSpinner } from 'react-icons/cg'
import ReactNumberFormat from 'react-number-format'
import client from '../../../../../apollo-client'
import { HISTORY, HISTORY_ORACLE, DexFeed, OracleFeed, GraphPriceFeed } from '../../../../../graphql'

export enum GraphPeriod {
  ONE_DAY = '24H',
  ONE_WEEK = '7D',
  ONE_MONTH = '30D',
  THREE_MONTHS = '90D',
}

const stablecoins = [
  'USDT',
  'USDC',
  'DUSD'
]

export function PoolPairHistoryGraph ({
  tokenA,
  tokenB
}): JSX.Element {
  const [feed, setFeed] = useState<GraphPriceFeed[] | undefined>(undefined)
  const [graphPeriod, setGraphPeriod] = useState<GraphPeriod>(GraphPeriod.ONE_WEEK)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const fifteenMins = 60 * 15
  const oneHour = 60 * 60
  const oneDay = 24 * 60 * 60

  useEffect(() => {
    setIsLoading(true)
    switch (graphPeriod) {
      case GraphPeriod.THREE_MONTHS:
        void loadHistory(tokenA, tokenB, 90 * 24 * oneHour, oneDay).then(setFeed).finally(() => setIsLoading(false))
        break
      case GraphPeriod.ONE_MONTH:
        void loadHistory(tokenA, tokenB, 30 * 24 * oneHour, oneHour).then(setFeed).finally(() => setIsLoading(false))
        break
      case GraphPeriod.ONE_WEEK:
        void loadHistory(tokenA, tokenB, 7 * 24 * oneHour, oneHour).then(setFeed).finally(() => setIsLoading(false))
        break
      case GraphPeriod.ONE_DAY:
      default:
        void loadHistory(tokenA, tokenB, 24 * oneHour, fifteenMins).then(setFeed).finally(() => setIsLoading(false))
        break
    }
  }, [graphPeriod])

  return (
    <div
      className='rounded-lg flex flex-col bg-gray-50 dark:bg-gray-800 mt-4 mb-5' style={{
        height: '32rem',
        maxHeight: '80vh'
      }}
    >
      <div
        className='flex justify-end flex-wrap text-sm mt-4 mr-10 space-x-0 lg:space-x-4 space-y-4 lg:space-y-0'
      >
        <div className='flex lg:max-w-max flex-wrap'>
          <GraphPeriodButton
            current={graphPeriod} graphPeriod={GraphPeriod.ONE_DAY}
            onClick={() => setGraphPeriod(GraphPeriod.ONE_DAY)}
          />
          <GraphPeriodButton
            current={graphPeriod} graphPeriod={GraphPeriod.ONE_WEEK}
            onClick={() => setGraphPeriod(GraphPeriod.ONE_WEEK)}
          />
          <GraphPeriodButton
            current={graphPeriod} graphPeriod={GraphPeriod.ONE_MONTH}
            onClick={() => setGraphPeriod(GraphPeriod.ONE_MONTH)}
          />
          <GraphPeriodButton
            current={graphPeriod} graphPeriod={GraphPeriod.THREE_MONTHS}
            onClick={() => setGraphPeriod(GraphPeriod.THREE_MONTHS)}
          />
        </div>
      </div>
      {(isLoading || feed === undefined)
        ? (<Spinner />)
        : (<PriceAreaChart feed={feed} current={graphPeriod} />)}
      <p className='text-xs m-5 italic text-gray-900/50'>Data is thankfully provided by <a className='hover:text-primary-700' href='https://defichain-income.com/' target='_blank' rel='noreferrer'>DeFiChain-Income.com</a></p>
    </div>
  )
}

function GraphPeriodButton ({
  current,
  graphPeriod,
  onClick
}: {
  current: GraphPeriod
  graphPeriod: GraphPeriod
  onClick: MouseEventHandler<HTMLDivElement>
}): JSX.Element {
  return (
    <div
      data-testid='Oracles.GraphPeriodButton'
      className={classNames('rounded p-2 border cursor-pointer mx-0.5 mt-1 lg:mt-0', graphPeriod === current ? 'text-primary-500 bg-primary-100 border-primary-100 dark:bg-dark-primary-500 dark:border-dark-primary-500 dark:text-dark-gray-900' : 'text-gray-900 dark:text-dark-primary-500 dark:border-gray-700 dark:hover:bg-dark-primary-500 dark:hover:text-white dark:bg-gray-900 bg-gray-200 border-gray-200 hover:bg-primary-50 hover:border-primary-50')}
      onClick={onClick}
      key={graphPeriod}
    >
      {graphPeriod}
    </div>
  )
}

function PriceAreaChart ({
  feed,
  current
}: { feed: GraphPriceFeed[], current: GraphPeriod }): JSX.Element {
  const data = feed.map(value => ({
    feed: value,
    data: Number(value.aggregated.amount),
    oracleData: Number(value.aggregated.amountOracle),
    volumeData: Number(value.aggregated.volume),
    time: value.aggregated.time.start * 1000
  }))

  function formatXAxis (tickItem): string {
    switch (current) {
      case GraphPeriod.THREE_MONTHS:
        return format(tickItem, 'dd MMM')
      case GraphPeriod.ONE_MONTH:
        return format(tickItem, 'dd MMM')
      case GraphPeriod.ONE_WEEK:
        return format(tickItem, 'dd MMM')
      case GraphPeriod.ONE_DAY:
      default:
        return format(tickItem, 'hh aa')
    }
  }

  function formatYAxis (tickItem): string {
    const units = {
      3: 'k',
      6: 'm',
      9: 'b'
    }
    let value = new BigNumber(tickItem)
    const places = Math.floor(value.e! / 3)
    if (value.isGreaterThanOrEqualTo(new BigNumber(1))) {
      value = value.dividedBy(Math.pow(1000, places))
    }
    return `$${value.toFormat(2, {
      decimalSeparator: '.',
      suffix: units[places * 3]
    })}`
  }

  if (feed.length === 0) {
    return (
      <div
        className='flex w-full justify-center grid h-full content-center'
      >
        No data found in past {current}
      </div>
    )
  }

  return (
    <ResponsiveContainer width='100%' height='100%' className='rounded-md'>
      <ComposedChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 48,
          right: 64,
          bottom: 12,
          left: 32
        }}
      >
        <defs>
          <linearGradient id='gradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#11426e' stopOpacity={0.2} />
            <stop offset='50%' stopColor='#11426e' stopOpacity={0.1} />
            <stop offset='95%' stopColor='#11426e' stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke='#EEEEEE' />

        <XAxis
          dataKey='time'
          type='number'
          minTickGap={64}
          tickMargin={12}
          scale='time'
          domain={['dataMin', 'dataMax']}
          tickFormatter={formatXAxis}
        />
        <YAxis
          yAxisId='left'
          dataKey='data'
          type='number'
          allowDataOverflow
          tickMargin={12}
          scale='linear'
          domain={[dataMin => (dataMin * 0.80).toPrecision(3), dataMax => (dataMax * 1.10).toPrecision(3)]}
          tickFormatter={formatYAxis}
        />
        <YAxis
          yAxisId='right'
          orientation='right'
          dataKey='volumeData'
          type='number'
          allowDataOverflow
          tickMargin={12}
          scale='linear'
          domain={[dataMin => (dataMin * 0).toPrecision(3), dataMax => (dataMax * 5).toPrecision(3)]}
          hide
        />

        <Tooltip content={props => <TooltipDialog {...props} />} />

        <Area
          yAxisId='left'
          type='monotone'
          dataKey='data'
          stroke='#11426e'
          strokeWidth={2}
          fill='url(#gradient)'
          id='poolsGraphArea'
        />
        <Bar yAxisId='right' dataKey='volumeData' barSize={20} fill='#1c6bb0' />
        <Area
          yAxisId='left'
          type='monotone'
          dataKey='oracleData'
          stroke='#91C1EE'
          strokeWidth={2}
          fill='url(#gradient)'
          id='oraclesGraphArea2'
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

function TooltipDialog ({ payload }: TooltipProps<any, any>): JSX.Element | null {
  const feed = payload?.[0]?.payload.feed as GraphPriceFeed
  if (feed === undefined) {
    return null
  }

  function Row (props: { title: string, content: any }): JSX.Element {
    return (
      <div className='flex flex-wrap mt-1.5 text-gray-900'>
        <div className='w-full text-gray-500 text-sm'>{props.title}</div>
        <div className='font-medium'>{props.content}</div>
      </div>
    )
  }

  return (
    <div className='table px-4 py-3 rounded shadow-lg bg-white ring-1 ring-gray-500 ring-opacity-5'>
      <div className='font-medium text-gray-900'>
        {format(feed.aggregated.time.start * 1000, 'MMM dd, hh:mm aa')}
      </div>
      <Row
        title='DEX Price' content={
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={feed.aggregated.amount}
            decimalScale={2}
            prefix=''
            suffix=' USD'
            data-testid='LiquidityCardStat.Liquidity.Value'
          />
        }
      />
      <Row
        title='Oracle Price'
        content={
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={feed.aggregated.amountOracle}
            decimalScale={2}
            prefix=''
            suffix=' USD'
          />
        }
      />
      <Row
        title='Premium'
        content={
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={(parseFloat(feed.aggregated.amount) / parseFloat(feed.aggregated.amountOracle ?? '0') - 1) * 100}
            decimalScale={2}
            prefix=''
            suffix=' %'
          />
        }
      />
      <Row
        title='Volume 24h'
        content={
          <ReactNumberFormat
            displayType='text'
            thousandSeparator
            value={feed.aggregated.volume}
            decimalScale={2}
            prefix=''
            suffix=' USD'
          />
        }
      />
    </div>
  )
}

function Spinner (): JSX.Element {
  return (
    <div className='flex w-full justify-center grid h-full content-center' data-testid='Oracles.Spinner'>
      <CgSpinner size={54} className='animate-spin text-primary-500' />
    </div>
  )
}

async function loadHistory (tokenA: string, tokenB: string, timeRange: number, interval: number): Promise<GraphPriceFeed[]> {
  const prices: GraphPriceFeed[] = []

  const fromDate = new Date(Date.now() - (timeRange * 1000))
  const tillDate = new Date()

  const data = await fetchDexPrices(fromDate, tillDate)
  const oracleData: OracleFeed = await fetchOraclePrices(stablecoins.includes(tokenA) ? tokenB : tokenA, fromDate.toISOString())

  for (const history of data.getFarmingHistory) {
    for (const pool of history.pools.filter(p => p.symbol === (tokenA + '-' + tokenB))) {
      const date: number = new Date(history.date).getTime() / 1000
      const oracleFiltered = oracleData.getOracleHistory.filter(o => o.dateTime <= history.date)
      const oracleAmount = oracleFiltered.length === 0 ? oracleData.getOracleHistory[0].price.toString() : oracleFiltered[oracleFiltered.length - 1].price.toString()
      prices.push({
        token: stablecoins.includes(tokenA) ? tokenB : tokenA,
        currency: stablecoins.includes(tokenA) ? tokenB : tokenA,
        aggregated: {
          amount: stablecoins.includes(tokenA) ? pool.priceB.toString() : pool.priceA.toString(),
          amountOracle: oracleAmount,
          volume: pool.volume24h,
          time: {
            start: date,
            end: date
          }
        }
      })
    }
  }

  return prices
}

async function fetchOraclePrices (token: string, date: string): Promise<OracleFeed> {
  const { data } = await client.query({
    query: HISTORY_ORACLE,
    variables: {
      token: token,
      date: date
    }
  })

  return data
}

async function fetchDexPrices (fromDate: Date, tillDate: Date): Promise<DexFeed> {
  const { data } = await client.query({
    query: HISTORY,
    variables: {
      fromYear: fromDate.getFullYear(),
      fromMonth: fromDate.getMonth() + 1,
      fromDay: fromDate.getUTCDate(),
      fromHour: fromDate.getHours(),
      tillYear: tillDate.getFullYear(),
      tillMonth: tillDate.getMonth() + 1,
      tillDay: tillDate.getUTCDate(),
      tillHour: tillDate.getHours()
    }
  })

  return data
}

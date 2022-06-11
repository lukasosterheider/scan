import {gql} from '@apollo/client';

export const HISTORY = gql`
  query ($fromYear: Int!, $fromMonth: Int!, $fromDay: Int!, $fromHour: Int!,
          $tillYear: Int!, $tillMonth: Int!, $tillDay: Int!, $tillHour: Int!){
      getFarmingHistory (
          from : {year: $fromYear, month: $fromMonth, day: $fromDay, hour: $fromHour, min: 0,s: 0},
          till : {year: $tillYear, month: $tillMonth, day: $tillDay, hour: $tillHour, min: 0,s: 0}) {
    date, pools {symbol, pair, priceA, priceB, reserveA, apr, volumeA, totalLiquidity, totalLiquidityLpToken, totalStaked, volume24h}
    }
  }
`;

export const HISTORY_ORACLE = gql`
  query ($token: String!, $date: Date) {
  getOracleHistory(token: $token, date: $date) {
    price
    dateTime
  }
}
`;

export interface DexFeed {
getFarmingHistory: GetFarmingHistory[]
}

export interface GetFarmingHistory {
__typename: string
date: string
pools: Pool[]
}

export interface Pool {
__typename: string
symbol: string
pair?: string
priceA: number
priceB: number
reserveA: string
apr: number
volumeA: any
totalLiquidity: number
totalLiquidityLpToken: number
totalStaked?: number
volume24h: number
}

export interface OracleFeed {
getOracleHistory: GetOracleHistory[]
}

export interface GetOracleHistory {
__typename: string
price: number
dateTime: string
}

export interface GraphPriceFeed {
    token: string;
    currency: string;
    aggregated: {
        amount: string;
        amountOracle?: string,
        volume?: number,
        time: {
            start: number;
            end: number;
        };
    };
}
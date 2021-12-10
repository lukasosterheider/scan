import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'

import { Container } from '@components/commons/Container'
import { VaultIdHeading } from '@components/vaults/[vaultid]/VaultIdHeading'
import { VaultIdDetails } from '@components/vaults/[vaultid]/VaultIdDetails'
import { VaultIdCollateralDetails } from '@components/vaults/[vaultid]/VaultIdCollateralDetails'
import { VaultIdLoansDetails } from '@components/vaults/[vaultid]/VaultIdLoansDetails'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { isAlphanumeric } from '../../../utils/commons/StringValidator'
import { VaultAuctions } from '@components/vaults/[vaultid]/VaultIdAuctionsDetails'
import { calculateLiquidationValues } from '../../../utils/vaults/LiquidatedVaultDerivedValues'
import { Head } from '@components/commons/Head'
import React from 'react'

interface VaultsPageData {
  vault: LoanVaultActive | LoanVaultLiquidated
}

export default function VaultIdPage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <Head title={`Vault #${props.vault.vaultId}`} />

      <Container className='pt-4 pb-20'>
        <VaultIdHeading vault={props.vault} />
        <VaultIdDetails vault={props.vault} liquidatedVaultDerivedValues={calculateLiquidationValues(props.vault)} />
        {
          (props.vault.state === LoanVaultState.IN_LIQUIDATION) ? (
            <VaultAuctions vault={props.vault} />
          ) : (
            <>
              <VaultIdCollateralDetails
                collateralValue={props.vault.collateralValue}
                vaultState={props.vault.state}
                collaterals={props.vault.collateralAmounts}
              />
              <VaultIdLoansDetails
                loans={props.vault.loanAmounts}
                interests={props.vault.interestAmounts}
                vault={{
                  interest: props.vault.loanScheme.interestRate,
                  state: props.vault.state
                }}
              />
            </>
          )
        }
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VaultsPageData>> {
  try {
    const vaultid = context.params?.vaultid?.toString().trim() as string

    if (!isAlphanumeric(vaultid)) {
      return { notFound: true }
    }

    const api = getWhaleApiClient(context)

    return {
      props: {
        vault: await api.loan.getVault(vaultid)
      }
    }
  } catch
  (e) {
    return {
      notFound: true
    }
  }
}
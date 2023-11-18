import { getEnvironment } from "@contexts/Environment";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useContext } from "react";
import {
  Network as NetworkObject,
  getNetwork,
} from "@defichain/jellyfish-network";
import { EnvironmentNetwork } from "@waveshq/walletkit-core";

/**
 * What connection is DeFi Scan connected to.
 * This is different from NetworkName, and should not be used as NetworkName.
 */
export enum NetworkConnection {
  LocalPlayground = 'Local',
  MainNet = 'MainNet',
  TestNet = 'TestNet',
  OceanMainNet = 'Ocean MainNet',
  OceanTestNet = 'Ocean TestNet',
  RemotePlayground = 'Ocean Playground',
  MyMainNet = 'mydefichain MainNet',
  MyTestNet = 'mydefichain TestNet'
}

export type NetworkName = NetworkObject['name']

export interface NetworkContextObject extends NetworkObject {
  connection: EnvironmentNetwork;
}

const NetworkContext = createContext<NetworkContextObject>(undefined as any);

export function useNetwork(): NetworkContextObject {
  return useContext(NetworkContext);
}

export function NetworkProvider(
  props: PropsWithChildren<any>
): JSX.Element | null {
  const router = useRouter();
  const env = getEnvironment();
  const connection = env.resolveConnection(router.query.network);

  return (
    <NetworkContext.Provider value={mapNetworkObject(connection)}>
      {props.children}
    </NetworkContext.Provider>
  );
}

function mapNetworkObject(
  connection: EnvironmentNetwork
): NetworkContextObject {
  switch (connection) {
    case NetworkConnection.MainNet:
      return { connection: connection, ...getNetwork('mainnet') }
    case NetworkConnection.TestNet:
      return { connection: connection, ...getNetwork('testnet') }
    case NetworkConnection.OceanMainNet:
      return { connection: connection, ...getNetwork('mainnet') }
    case NetworkConnection.OceanTestNet:
      return { connection: connection, ...getNetwork('testnet') }
    case NetworkConnection.MyMainNet:
      return { connection: connection, ...getNetwork('mainnet') }
    case NetworkConnection.MyTestNet:
      return { connection: connection, ...getNetwork('testnet') }
    case NetworkConnection.RemotePlayground:
    case NetworkConnection.LocalPlayground:
      return { connection: connection, ...getNetwork('regtest') }
    default:
      throw new Error(`${connection as string} network not found`);
  }
}

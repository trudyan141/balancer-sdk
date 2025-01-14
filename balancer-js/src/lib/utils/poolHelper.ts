import { parseFixed } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Pool } from '../../types';
import {
  SolidityMaths,
  _computeScalingFactor,
  _upscaleArray,
} from '@/lib/utils/solidityMaths';
import { AssetHelpers } from '@/lib/utils/assetHelpers';

const AMP_PRECISION = 3; // number of decimals -> precision 1000

interface ParsedPoolInfo {
  parsedTokens: string[];
  parsedDecimals: string[];
  parsedBalances: string[];
  parsedWeights: string[];
  parsedPriceRates: string[];
  parsedAmp: string;
  parsedTotalShares: string;
  parsedSwapFee: string;
  upScaledBalances: string[];
  scalingFactors: bigint[];
  scalingFactorsWithoutBpt: bigint[];
  parsedTokensWithoutBpt: string[];
  parsedBalancesWithoutBpt: string[];
  bptIndex: number;
  parsedPriceRatesWithoutBpt: string[];
  upScaledBalancesWithoutBpt: string[];
}

/**
 * Parse pool info into EVM amounts. Sorts by token order if wrappedNativeAsset param passed.
 * @param {Pool}  pool
 * @param {string}  wrappedNativeAsset
 * @param unwrapNativeAsset if true, changes wETH address to ETH address
 * @returns       parsed pool info
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const parsePoolInfo = (
  pool: Pool,
  wrappedNativeAsset?: string,
  unwrapNativeAsset?: boolean
): ParsedPoolInfo => {
  const defaultOne = '1000000000000000000';
  let parsedTokens = unwrapNativeAsset
    ? pool.tokens.map((token) => token.address)
    : pool.tokens.map((token) =>
        token.address === wrappedNativeAsset ? AddressZero : token.address
      );
  let parsedDecimals = pool.tokens.map((token) => {
    return token.decimals ? token.decimals.toString() : '18';
  });
  let parsedBalances = pool.tokens.map((token) =>
    parseFixed(token.balance, token.decimals).toString()
  );
  let parsedWeights = pool.tokens.map((token) => {
    return token.weight ? parseFixed(token.weight, 18).toString() : defaultOne;
  });
  let parsedPriceRates = pool.tokens.map((token) => {
    return token.priceRate
      ? parseFixed(token.priceRate, 18).toString()
      : defaultOne;
  });
  const scalingFactorsRaw = parsedDecimals.map((decimals) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    _computeScalingFactor(BigInt(decimals!))
  );
  let scalingFactors = scalingFactorsRaw.map((sf, i) =>
    SolidityMaths.mulDownFixed(sf, BigInt(parsedPriceRates[i]))
  );
  // This assumes token.balance is in human scale (e.g. from SG)
  let upScaledBalances = _upscaleArray(
    parsedBalances.map(BigInt),
    scalingFactors
  ).map((b) => b.toString());
  // let upScaledBalances = pool.tokens.map((token) =>
  //   parseFixed(token.balance, 18).toString()
  // );
  if (wrappedNativeAsset) {
    const assetHelpers = new AssetHelpers(wrappedNativeAsset);
    let sfString;
    [
      parsedTokens,
      parsedDecimals,
      sfString,
      parsedBalances,
      upScaledBalances,
      parsedWeights,
      parsedPriceRates,
    ] = assetHelpers.sortTokens(
      parsedTokens,
      parsedDecimals,
      scalingFactors,
      parsedBalances,
      upScaledBalances,
      parsedWeights,
      parsedPriceRates
    ) as [string[], string[], string[], string[], string[], string[], string[]];
    scalingFactors = sfString.map(BigInt);
  }

  const parsedAmp = pool.amp
    ? parseFixed(pool.amp, AMP_PRECISION).toString() // Solidity maths uses precison method for amp that must be replicated
    : defaultOne;
  const parsedTotalShares = parseFixed(pool.totalShares, 18).toString();
  const parsedSwapFee = parseFixed(pool.swapFee, 18).toString();

  const scalingFactorsWithoutBpt: bigint[] = [],
    parsedTokensWithoutBpt: string[] = [],
    parsedBalancesWithoutBpt: string[] = [],
    parsedPriceRatesWithoutBpt: string[] = [],
    upScaledBalancesWithoutBpt: string[] = [];
  const bptIndex = parsedTokens.indexOf(pool.address);
  if (bptIndex !== -1) {
    scalingFactors.forEach((_, i) => {
      if (i !== bptIndex) {
        scalingFactorsWithoutBpt.push(scalingFactors[i]);
        parsedTokensWithoutBpt.push(parsedTokens[i]);
        parsedBalancesWithoutBpt.push(parsedBalances[i]);
        parsedPriceRatesWithoutBpt.push(parsedPriceRates[i]);
        upScaledBalancesWithoutBpt.push(upScaledBalances[i]);
      }
    });
  }

  return {
    parsedTokens,
    parsedDecimals,
    parsedBalances,
    parsedWeights,
    parsedPriceRates,
    parsedAmp,
    parsedTotalShares,
    parsedSwapFee,
    upScaledBalances,
    scalingFactors,
    scalingFactorsWithoutBpt,
    parsedTokensWithoutBpt,
    parsedBalancesWithoutBpt,
    bptIndex,
    parsedPriceRatesWithoutBpt,
    upScaledBalancesWithoutBpt,
  };
};

import { structureOne } from "./structureOne.js";
import { structureTwo } from "./structureTwo.js";
import { gdaiAsset } from "./gdaiAsset.js";
import { glpAsset } from "./glpAsset.js";
import { offChainAsset } from "./offChainAsset.js";
import { uniswapAsset } from "./uniswapAsset.js";
import { marketMaket } from "./marketMaket.js";

export const assets = {
  'Aave V3 Asset': [...structureOne],
  'bIB01 Asset': [...structureOne],
  'Compound V3 Asset': [...structureOne],
  'DSR Asset': [...structureTwo],
  'ETS Asset': [...structureOne],
  'gDAI Asset': [...gdaiAsset],
  'GLP Asset': [...glpAsset],
  // 'Maple Asset': [],
  'Off Chain Asset': [...offChainAsset],
  'sFrax Asset': [...structureTwo],
  'WETH Asset': [...structureTwo],
  'WBTC Asset': [...structureTwo],
  'Uniswap Asset': [...uniswapAsset],
  'USDPlus Asset': [...structureTwo],
  'Market Maker': [...marketMaket],

  'default': [...structureOne],
}

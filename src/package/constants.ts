import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";

// From solana-program-library/token-lending/js/src/constants.ts
/**
 * Define the token program key
 */
export const SOSOL_PROGRAM_ID: PublicKey = new PublicKey(
  "8DqELvN5TFeMtNJciUYvGqso2CyG5M6XNWxh3HRr3Vjv"
);

export const SOSOL_TOKEN_ID: PublicKey = new PublicKey(
  "4qH751PJLxuaZmspt77XNsViw2uNDPJhE5XUfXxYXFCX"
);

/** @internal */
export const WAD = new BigNumber("1e+18");

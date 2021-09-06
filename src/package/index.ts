import fs from "mz/fs";
import os from "os";
import path from "path";
import yaml from "yaml";
import {
  Connection,
  Keypair,
  PublicKey,
  Signer,
  BpfLoader,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { SOSOL_PROGRAM_ID } from "./constants";
import { createInteraction } from "./instructions/createInteraction";

const REMOVE_MY_ID: PublicKey = new PublicKey(
  "CtjoSnmJHWuJiemKxpbFM1hb9CkMGBXEKDHmdoqmhh4z"
);

/**
 * Connection to the network
 */
let connection: Connection;

/**
 * Keypair associated to the fees' consumer
 */
let consumer: Keypair;

/**
 * The public key of the creator account of the content
 */
let creatorPubKey: PublicKey;

/**
 * The public key of the storage account of the content
 */
let storagePubkey: PublicKey;

// authority of the token and accounts
let programAccount: Keypair;
// nonce used to generate the authority public key
// let nonce: number;

/**
 * Path to program files
 */
const PROGRAM_PATH = path.resolve(__dirname, "../../program/target/deploy");

/**
 * Path to program shared object file which should be deployed on chain.
 * This file is created when running either:
 *   - `npm run build:program-c`
 *   - `npm run build:program-rust`
 */
const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, "sosol_program.so");

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program/target/deploy/sosol_program.so`
 */
export const PROGRAM_KEYPAIR_PATH = path.join(
  PROGRAM_PATH,
  "sosol_program-keypair.json"
);

/**
 * Create a Keypair from a secret key stored in file as bytes' array
 */
export async function createKeypairFromFile(
  filePath: string
): Promise<Keypair> {
  const secretKeyString = await fs.readFile(filePath, { encoding: "utf8" });
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}

/**
 * @private
 */
async function getConfig(): Promise<any> {
  // Path to Solana CLI config file
  const CONFIG_FILE_PATH = path.resolve(
    os.homedir(),
    ".config",
    "solana",
    "cli",
    "config.yml"
  );
  const configYml = await fs.readFile(CONFIG_FILE_PATH, { encoding: "utf8" });
  return yaml.parse(configYml);
}

/**
 * Load and parse the Solana CLI config file to determine which RPC url to use
 */
export async function getRpcUrl(): Promise<string> {
  try {
    const config = await getConfig();
    if (!config.json_rpc_url) throw new Error("Missing RPC URL");
    return config.json_rpc_url;
  } catch (err) {
    console.warn(
      "Failed to read RPC url from CLI config file, falling back to localhost"
    );
    return "http://localhost:8899";
  }
}

/**
 * TODO: Remove in favour of wallet connection check
 */
// export async function newAccountWithLamports(
//   connection: Connection,
//   seed: string,
//   keyPair?: Keypair,
//   lamports: number = 10000000
// ): Promise<PublicKey> {
//   let publicKey = keyPair ? keyPair.publicKey : new Keypair().publicKey;
//   console.log(`Creating key with seed '${seed}' from pubKey: ${publicKey}`);
//   const account = await PublicKey.createWithSeed(
//     publicKey,
//     seed,
//     SOSOL_PROGRAM_ID
//   );
//   console.log(`Account created for '${seed}': ${account}`);

//   let retries = 30;
//   await connection.requestAirdrop(account, lamports);
//   for (;;) {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     if (lamports === (await connection.getBalance(account))) {
//       return account;
//     }
//     if (--retries <= 0) {
//       break;
//     }
//   }
//   throw new Error(`Airdrop of ${lamports} failed`);
// }
export async function newAccountWithLamports(
  connection: Connection,
  lamports: number = 1000000
): Promise<Keypair> {
  const account = Keypair.generate();

  let retries = 30;
  await connection.requestAirdrop(account.publicKey, lamports);
  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (lamports === (await connection.getBalance(account.publicKey))) {
      return account;
    }
    if (--retries <= 0) {
      break;
    }
  }
  throw new Error(`Airdrop of ${lamports} failed`);
}

/**
 * Establish a connection to the cluster
 */
async function establishConnection(): Promise<void> {
  try {
    const rpcUrl = await getRpcUrl();
    connection = new Connection(rpcUrl, "confirmed");
    const version = await connection.getVersion();
    console.log("Connection to cluster established:", rpcUrl, version);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Check if the Sosol BPF program has been deployed and execute
 *
 * NB: this whole thing needs to be refactored to work with a wallet address and
 * inputs from the appplication
 */
export async function executeProgram(): Promise<string> {
  // Check if the program has been deployed
  const programInfo = await connection.getAccountInfo(SOSOL_PROGRAM_ID);
  if (programInfo === null) {
    if (fs.existsSync(PROGRAM_SO_PATH)) {
      throw new Error(`Key not found: with program key ${SOSOL_PROGRAM_ID}`);
    } else {
      throw new Error("Program needs to be built and deployed");
    }
  } else if (!programInfo.executable) {
    throw new Error(`Program is not executable`);
  }
  console.log(`Using program ${SOSOL_PROGRAM_ID.toBase58()}`);

  // We want the same keys for the payment account so we don't need to init SOSOL acc
  const newAcc = new PublicKey('43sbdrRDyg3R2jNzrny8sAHDTbuBHaR9vWguLvo2NtC7');
  creatorPubKey = await PublicKey.createWithSeed(newAcc, 'creator', SOSOL_PROGRAM_ID);
  storagePubkey = await PublicKey.createWithSeed(newAcc, 'storage', SOSOL_PROGRAM_ID);

  // Check if the sosol account has already been created
  const sosolAccount = await connection.getAccountInfo(SOSOL_PROGRAM_ID);

  if (sosolAccount === null)
    throw new Error(
      `No such program_id for publicKey: ${SOSOL_PROGRAM_ID.toBase58()}`
    );

  const transaction = await createInteraction(
    connection,
    consumer,
    creatorPubKey,
    1000000000,
    storagePubkey,
    10
  );
  console.log(`Transaction ID: ${transaction}`);

  return transaction;
}

async function main() {
  console.log("Init sosol transaction");

  await establishConnection();

  consumer = await createKeypairFromFile("/home/ezy/.config/solana/id.json");

  await executeProgram();

  console.log("Success");
}

main().then(
  () => process.exit(),
  (err) => {
    console.error(err);
    process.exit(-1);
  }
);

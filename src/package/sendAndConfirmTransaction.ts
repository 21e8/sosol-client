import { sendAndConfirmTransaction as realSendAndConfirmTransaction } from "@solana/web3.js";
import type {
  Keypair,
  Connection,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";

export async function sendAndConfirmTransaction(
  title: string,
  connection: Connection,
  transaction: Transaction,
  ...signers: Array<Keypair>
): Promise<TransactionSignature> {  
  return await realSendAndConfirmTransaction(connection, transaction, signers, {
    skipPreflight: false,
    commitment: "recent",
    preflightCommitment: "recent",
  });
}

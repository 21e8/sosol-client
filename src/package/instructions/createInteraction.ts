import * as Layout from "../layout";
import { Buffer } from "buffer";
import {
  Connection,
  Keypair,
  PublicKey,
  Signer,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { SOSOL_PROGRAM_ID, SOSOL_TOKEN_ID } from "../constants";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  AccountLayout,
} from "@solana/spl-token";
import { sendAndConfirmTransaction } from "../sendAndConfirmTransaction";
import { newAccountWithLamports } from "../index";
// @ts-ignore
import { struct, u8 } from "buffer-layout";

interface Data {
  instruction: number;
  interactionFee: bigint;
  storagePercentFee: number | bigint;
}

const dataLayout = struct<Data>([
  u8("instruction"),
  Layout.u64("interactionFee"),
  Layout.decimal("storagePercentFee"),
]);

const tokenAccPK = new PublicKey(
  "4qH751PJLxuaZmspt77XNsViw2uNDPJhE5XUfXxYXFCX"
);

/**
 * Create an interaction payment from consumer to the contentcreator and storage host
 *
 * @param connection The connection to use
 * @param consumerAccount The account of the content consumer
 * @param consumerPayAccKey The account shared by the consumer and program
 * @param creatorAccount The account of the contents creator/owner
 * @param interactionFee The token swap's Token B account
 * @param storagePercentFee The percentage allocation of the `interactionFee` to the storage host as a decimal between 0-1 eg. 0.15
 * @param storageAccount The account of the content provider where the content is stored
 */
const createInteractionInstruction = (
  consumerAccount: Keypair,
  tokenTransferAuthority: Keypair,
  consumerTokenAccount: PublicKey,
  creatorKey: PublicKey,
  interactionFee: number,
  storageKey: PublicKey,
  storagePercentFee: number
): TransactionInstruction => {
  if (storagePercentFee > 100)
    throw new Error(
      `storagePercentFee is gt ${storagePercentFee}, but must be lte 100`
    );

  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: 0,
      interactionFee: BigInt(interactionFee),
      storagePercentFee,
    },
    data
  );

  const keys = [
    { pubkey: consumerAccount.publicKey, isSigner: true, isWritable: false },
    { pubkey: tokenTransferAuthority.publicKey, isSigner: true, isWritable: false, },
    { pubkey: consumerTokenAccount, isSigner: false, isWritable: true },
    { pubkey: creatorKey, isSigner: false, isWritable: false },
    { pubkey: storageKey, isSigner: false, isWritable: false },
    { pubkey: SOSOL_TOKEN_ID, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ];

  return new TransactionInstruction({
    keys,
    programId: SOSOL_PROGRAM_ID,
    data,
  });
};

export async function createInteraction(
  connection: Connection,
  consumer: Keypair,
  creatorKey: PublicKey,
  interactionFee: number,
  storageKey: PublicKey,
  storagePercentFee: number
): Promise<string> {
  console.log("Fetching SOSOL mint");
  const sosolToken = new Token(
    connection,
    SOSOL_TOKEN_ID,
    TOKEN_PROGRAM_ID,
    consumer
  );

  const balanceNeeded = await Token.getMinBalanceRentForExemptAccount(
    connection
  );

  console.log("Fetching consumer token account");
  const consumerTokenAcc = await sosolToken.getOrCreateAssociatedAccountInfo(
    consumer.publicKey
  );
  console.log("Consumer token account: ", consumerTokenAcc.address.toBase58());

  const creatorTokenAcc = await connection.getTokenAccountsByOwner(creatorKey, {
    programId: SOSOL_PROGRAM_ID,
    mint: SOSOL_TOKEN_ID,
  });
  const creatorTokenAccPubKey = creatorTokenAcc.value[0].pubkey;
  console.log("Creator token account: ", creatorTokenAccPubKey.toBase58());

  // const newAccount = new Keypair();
  const tokenTransferAuthority = new Keypair();
  const transaction = new Transaction();
  // transaction.add(
  //   SystemProgram.createAccount({
  //     fromPubkey: consumer.publicKey,
  //     newAccountPubkey: tokenTransferAuthority.publicKey,
  //     lamports: balanceNeeded,
  //     space: AccountLayout.span,
  //     programId: SOSOL_PROGRAM_ID,
  //   }),
  // );

  // transaction.add(
  //   Token.createInitAccountInstruction(
  //     sosolToken.programId,
  //     sosolToken.publicKey,
  //     newAccount.publicKey,
  //     consumer.publicKey,
  //   ),
  // );

  console.log(
    sosolToken.programId.toBase58(),
    consumerTokenAcc.address.toBase58(),
    tokenTransferAuthority.publicKey.toBase58(),
    consumer.publicKey.toBase58()
  );


  transaction.add(
    Token.createApproveInstruction(
      sosolToken.programId,
      consumerTokenAcc.address,
      tokenTransferAuthority.publicKey,
      consumer.publicKey,
      [consumer],
      interactionFee
    )
  );

  // transaction.add(
  //   createInteractionInstruction(
  //     consumer,
  //     tokenTransferAuthority,
  //     consumerTokenAcc.address,
  //     creatorKey,
  //     interactionFee,
  //     storageKey,
  //     storagePercentFee
  //   )
  // );

  // Send the instructions
  console.log("sending create interaction instruction");
  return await sendAndConfirmTransaction(
    "create account, approve transfer, swap",
    connection,
    transaction,
    consumer,
    tokenTransferAuthority,
  );
}

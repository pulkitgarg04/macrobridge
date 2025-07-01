import {
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
  sendAndConfirmTransaction,
  Connection,
} from "@solana/web3.js";
import base58 from "bs58";

const connection = new Connection(
  "https://api.testnet.solana.com",
  "confirmed"
);

export async function sendSol(to: string, amount: string) {
  try {
    const privateKeyBase58 = process.env.SOLANA_PRIVATE_KEY || "";
    if (!privateKeyBase58) throw new Error("Missing SOL_PRIVATE_KEY");

    const privateKey = base58.decode(privateKeyBase58);
    const keypair = Keypair.fromSecretKey(Uint8Array.from(privateKey));
    const fromPubkey = keypair.publicKey;
    const toPubkey = new PublicKey(to);

    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
    const balanceBefore = await connection.getBalance(fromPubkey);

    if (balanceBefore < lamports) {
      throw new Error("Insufficient SOL in sender's wallet");
    }

    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports,
      })
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transferTransaction,
      [keypair],
      {
        commitment: "confirmed",
      }
    );

    console.log("Transaction Signature:", signature);
  } catch (error) {
    console.error("Error sending SOL:", error);
    throw error;
  }
}

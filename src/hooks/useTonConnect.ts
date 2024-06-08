import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "ton-core";
import { SenderArguments } from "ton-core";
import { Sender } from "ton-core";


export function useTonConnect(): {
    sender: Sender;
    connected: boolean;
    wallet: string | null;
    network: CHAIN | null;
} {
    // с помощью useTonConnectUI мы отправляем наши транзакции
    const [tonConnectUI] = useTonConnectUI()
    // useTonWallet нужен чтоб достать адрес кошелька пользователя
    const wallet = useTonWallet();

    return {
        sender: {
            send: async (args: SenderArguments) => {
              tonConnectUI.sendTransaction({
                messages: [
                  {
                    // address: args.to.toString(), // адрес контракта, на который мы отправляем сообщение
                    address: 'UQB0t098I8dQqliRhnKie-bzNfCASCV5xwganbU6FPwp1arw',
                    amount: args.value.toString(), // сумма
                    payload: args.body?.toBoc().toString("base64"), // тело сообщения. Представляется в формате ячейки.
                  },
                ],
                validUntil: Date.now() + 5 * 60 * 1000, // Сколько минут нужно юзеру, чтоб апрувнуть транзакцию. Тут 5 мин
              });
            },
            address: wallet?.account?.address ? Address.parse(wallet?.account?.address as string) : undefined 
            // адрес, который мы достали с помощью useTonWallet dsgsdgsdgsdg
          }, 

        connected: !!wallet?.account.address,  // подключен ли кошель. Тру если в wallet имеет account.address
        wallet: wallet?.account.address ?? null, // адрес кошеля пользователя
        network: wallet?.account.chain ?? null // сеть (mainnet|testnet)
        
    }
}
import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import {Mint, SampleJetton} from "../../build/SampleJetton/tact_SampleJetton";
import {JettonDefaultWallet} from "../../build/SampleJetton/tact_JettonDefaultWallet";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const {client} = useTonClient() // достаём клиента (наш кошель)
    const {wallet, sender} = useTonConnect() // кошель юзера
    const [balance, setBalance] = useState<string | null>()

    const jettonContract = useAsyncInitialize(async()=>{ // инициализируем контракт жетона
        // контрактек нашей монетки
        if(!client || !wallet) return; //проверяем, существует ли клиент
        // продолжаем создавать контракт, используя адрес задеплоенного контракта
        const contract = SampleJetton.fromAddress(Address.parse("EQB8StgTQXidy32a8xfu7j4HMoWYV0b0cFM8nXsP2cza_b7Y"))
        // открываем контракт при помощи клиента (клиент это доступ к нашему блокчейну)
        return client.open(contract) as OpenedContract<SampleJetton>
    }, [client, wallet])  // это зависимости. Если клиент переподключится к тестнету то жетон тоже переподключится.

    const jettonWalletContract = useAsyncInitialize(async()=>{
        // наш баланс кошелька для монеты
        if(!jettonContract || !client) return;

        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet!).toString())
        )

        return client.open(JettonDefaultWallet.fromAddress(jettonWalletAddress))
    }, [jettonContract, client])  // адрес нашего жетон кошелька

    // эта херня достаёт баланс пользователя
    useEffect(()=>{
        async function getBalance() {
            if(!jettonWalletContract) return // проверяем, инициализирован ли контракт.
            setBalance(null)
            const balance = (await jettonWalletContract.getGetWalletData()).balance
            setBalance(fromNano(balance))
            await sleep(5000)
            getBalance()
        }

        getBalance()

    }, [jettonWalletContract]) // зависимости

    return {
        // Используем адрес контракта для минта.
        jettonWalletAddress: jettonWalletContract?.address.toString(),
        balance: balance,
        mint: () => {
            const message: Mint = {
                $$type: "Mint",
                amount: 150n
            }

            jettonContract?.send(sender, {
                value: toNano("0.001")
            }, message)
        }
    }
}
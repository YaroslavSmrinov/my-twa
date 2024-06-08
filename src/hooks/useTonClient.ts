import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";



// Хук возвращает клиент, который подключен к ноде блокчена. Нужен для чтения инфы из блокчейна и отправки транзакций в блокчейн.
// Это наш кошелёчек.
export function useTonClient() {
    const {network} = useTonConnect() // определяем какая у нас сеть. 

    return {
        // принимает функцию, создающую клиента, вторым аргументом массив зависимостей. 
        // Если какая-то из зависимостей поменяет своё значение - клиент будет заново инициализироваться
        // клиент это доступ к нашему блокчейну

        client: useAsyncInitialize(async ()=>{
            if(!network) return;
            // возвращаем тон клиента
            return new TonClient({
                endpoint: await getHttpEndpoint({
                    // это эндпоинт, к которому мы подключаемся.
                    network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
                })
            })
        }, [network]) // network это зависимость
    }
}
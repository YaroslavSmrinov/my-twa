import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";

export function Jetton() {
  const {connected, wallet} = useTonConnect()
  const {jettonWalletAddress, balance, mint} = useJettonContract()  // это адрес для монеты на кошельке юзера

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>Jettoываывавыаываn</h3>
        <FlexBoxRow>
          Wallet address ( connected one )
          <Ellipsis>{ wallet ? Address.parse(wallet as string).toString() : "Loading..."}</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          Jetton Wallet (contract address )
          <Ellipsis>{jettonWalletAddress ? jettonWalletAddress : "Loading..."}</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          Баланс жетонов Balance
          <div>{balance ?? "Loading..."}</div>
        </FlexBoxRow>
        <Button
          disabled={!connected} onClick={mint}>
          Кнопка Mint jettons( в дальнейшем claim)
        </Button>
      </FlexBoxCol>
    </Card>
  );
}

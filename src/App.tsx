import "./App.css";
import { Jetton } from "./components/Jetton";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk"

const StyledApp = styled.div`
  background-color: white;
  color: black; // color foor text

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton />
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "minnet"
                  : "testnet"
                : "N/A (сеть не определена"}
            </Button>
          </FlexBoxRow>
          <Jetton />
        </FlexBoxCol>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <button style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajaYoMhslxwehHM2xDU3MzYVAVxqVm9OF5w&s"
              alt="Icon 1"
              style={{ width: '100%', height: 'auto' }}
            />
            <span>Проверить дроп</span>
          </button>

          <button style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Feels_good_man.jpg/200px-Feels_good_man.jpg"
              alt="Icon 1"
              style={{ width: '100%', height: 'auto' }}
            />
            <span>Найден дроп</span>
          </button>

          <button style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
            <img
              src="https://png.pngitem.com/pimgs/s/14-148125_pepe-png-pepe-pride-suicide-pepe-transparent-png.png"
              alt="Icon 1"
              style={{ width: '100%', height: 'auto' }}
            />
            <span>Нажал "Claim"</span>
            
          </button>
        </div>
      </AppContainer>
    </StyledApp>
  );
}


export default App;
// git add . && git commit -m 'add memes' && git push && yarn build && yarn deploy

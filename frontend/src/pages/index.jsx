import Image from "next/image";
import Coin from "../images/Coin.png";
import Coin1 from "../images/coin1.png";
import Coin2 from "../images/coin2.png";
import Coin3 from "../images/coin3.png";
import Coin4 from "../images/coin4.png";
import Coin5 from "../images/coin5.png";
import Coin6 from "../images/coin6.png";
import Coin7 from "../images/coin7.png";
import Recarga from "../components/recargas";
import "../style/index.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Container para os ícones de fundo */}
      <div className="background-icons">
        <Image src={Coin} alt="Ícone de moeda" id="coin" />
        <Image src={Coin1} alt="Ícone de moeda 1" className="coin-icon coin1" />
        <Image src={Coin2} alt="Ícone de moeda 2" className="coin-icon coin2" />
        <Image src={Coin3} alt="Ícone de moeda 3" className="coin-icon coin3" />
        <Image src={Coin4} alt="Ícone de moeda 4" className="coin-icon coin4" />
        <Image src={Coin5} alt="Ícone de moeda 5" className="coin-icon coin5" />
        <Image src={Coin6} alt="Ícone de moeda 6" className="coin-icon coin6" />
        <Image src={Coin7} alt="Ícone de moeda 7" className="coin-icon coin7" />
      </div>

      {/* Conteúdo principal acima dos ícones */}
      <div className="content">
        <h1 id="tittle-home">Recargas</h1>
        <p id="paragrafo-home">
          Aqui você consegue fornecer diversos tipos de recargas, créditos e vale compras aos seus clientes
        </p>
        <section>
          <Recarga />
        </section>
      </div>
    </div>
  );
}

import Image from "next/image";
import Coin from "../images/Coin.png"
import Recarga from "../components/recargas";
import "../style/index.css";

export default function Home() {
  return (
    <div>
       <Image src={Coin} alt="Ícone de moeda" id="coin" />
      <h1 id="tittle-home">Recargas</h1>
      <p id="paragrafo-home">Aqui você consegue fornecer diversos  tipos de recargas, créditos e vale compras aos seus clientes</p>

      <section>
        <Recarga />
      </section>
    </div>


  );
}

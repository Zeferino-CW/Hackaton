import Image from "next/image";
import Recarga from "../components/recargas";

export default function Home() {
  return (
    <div>
      <h1 id="tittle-home">Recargas</h1>
      <p>Aqui você consegue fornecer diversos  tipos de recargas, créditos e vale compras aos seus clientes</p>

      <section>
        <Recarga />
      </section>
    </div>


  );
}

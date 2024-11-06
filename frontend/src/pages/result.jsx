import { useRouter } from 'next/router';
import Image from "next/image";
import iconInfPay from "../images/InfinitePayWhiteGround.png";
import "../style/recargaConcluida.css";

export default function RecargaConcluida() {
  const router = useRouter();
  const { valorPagamento, telefone, id } = router.query;

  return (
    <div id="recarga-concluida">
      <section id="description">
        <Image src={iconInfPay} alt="ícone InfinitePay" id="icon-image" />
        <h3>Recarga Concluída com Sucesso!</h3>
      </section>

      <section id="section-recarga-details">
        <div id="details">
          <h4>Detalhes da Recarga</h4>
          <p>Telefone: <strong>{telefone}</strong></p>
          <p>Valor da Recarga: <strong>R$ {valorPagamento}</strong></p>
          <p>NSU: <strong>000002342</strong></p>
          <p>ID: <strong>{id}</strong></p>
        </div>
        
        <div id="message">
          <p>Sua recarga foi processada com sucesso! Agradecemos por utilizar nosso serviço.</p>
        </div>

        <div id="btn-concluir">
          <button
            type="button"
            className="button"
            onClick={() => router.push('/')}
          >
            Nova Recarga
          </button>
        </div>
      </section>
    </div>
  );
}

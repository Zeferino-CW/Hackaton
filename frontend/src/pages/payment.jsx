import iconInfPay from "../images/InfinitePayWhiteGround.png";
import Image from "next/image";
import telefonia from "../services/getTelefonia";

export default function Payment () {
  return (
    <div id="mom-payment">
      <section id="description">
        <Image src={iconInfPay} alt="ícone InfinitePay"/>
        <h3>Como quer receber?</h3>
        <p>Escolha o meio de pagamento.</p>
      </section>

      <section id="section-payment">
        <div id="valor">
          <h3>Meio de pagamento</h3>
          <p>*estado global do valor vai entrar aqui*</p>
        </div>

        <div id="div-payment-type">
          {
            telefonia.paymentMethod.map(({image, type}, ind) => (
              <div key={ind}>
                <Image src={image}/>
                <span>{type}</span>
              </div>
            ))
          }
        </div>

        <div id="btn-payment">
          <button
            type="button"
            onClick={ () => router.push('/')}
          >
            Voltar ao início
          </button>

          <button
            type="button"
          >
            Fazer recarga
          </button>
        </div>
      </section>
    </div>
  )
}
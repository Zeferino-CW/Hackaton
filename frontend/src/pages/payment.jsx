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
        {/* Vamos fazer o fluxo seja por débito ou por crédito, se for cŕedito deve-se definir o número de parcelas. */}
      </section>

      <section id="section-payment">
        <div id="valor">
          <h3>Meio de pagamento</h3>
          <p>*estado global do valor vai entrar aqui*</p> 
          {/* Colocar o valor do pagamento aqui */}
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

{/* Quando clicar nesse botão de recarga ele deve ser dinamico com a url para abrir o tap baseado com a forma de pagamento escolhida
link para a documentação aqui: https://www.infinitepay.io/desenvolvedores 
Exemplo: infinitepaydash://infinitetap-app? amount=100&payment_method=credit&installments=1&order_id=3262&result_url=mypocapp%3A%2F%2Fexample%2Ftap_result&app_client_referrer=POCApp&af_force_deeplink=true */}
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
import Image from "next/image";
import InfPaySimpleSymbol from "../images/InfinitePayWhiteGround.png"
import {rechargeType, operadoras, rechargeValues} from "../services/getTelefonia";
import telefonia from "../services/getTelefonia";

export default function Telefonia () {
  return (
    <div id="telefonia">
      <div id="card">
        <Image src={InfPaySimpleSymbol}/>
        <h2>Telefonia</h2>
        <p>Aqui você pode vender recargas de celular pré-pago, recargas de telefone fixo e tvs pré pagas.</p>
      </div>

      <div id="form-recarga">
        <h3>Recarga escolhida</h3>
        <form action="">
          <label htmlFor="select-recarga-tipo">Tipos de recarga disponíveis</label>
          <select name="input-recarga-tipo" id="select-recarga-tipo">
            {
              telefonia.rechargeType.map((type) => (
                <option value={type}>{type}</option>
              ))
            }
          </select>

          <label htmlFor="select-operadoras">Operadoras disponíveis</label>
          <select name="input-operadora" id="select-operadoras">
            {
              telefonia.operadoras.map((type) => (
                <option value={type}>{type}</option>
              ))
            }
          </select>

          <label htmlFor="select-operadoras">Operadoras disponíveis</label>
          <select name="input-operadora" id="select-operadoras">
            {
              telefonia.rechargeValues.map((type) => (
                <option value={type}>{type}</option>
              ))
            }
          </select>

          <label for="telefone">Número do celular/telefone:</label>
          <input type="tel" id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX" pattern="\(\d{2}\) \d{4,5}-\d{4}" required />

          <div id="button">
            <button
              type="button"
            >
              Voltar ao início
            </button>

            <button
              type="button"
            >
              Fazer recarga
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
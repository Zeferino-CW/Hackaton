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
          <label htmlFor="">Tipos de recarga disponíveis</label>
          <select name="input-recarga-tipo" id="select-recarga-tipo">
            {
              telefonia.rechargeType.map((type) => (
                <option value={type}>Telefonia</option>
              ))
            }
          </select>
        </form>
      </div>
    </div>
  )
}
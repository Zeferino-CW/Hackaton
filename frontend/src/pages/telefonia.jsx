import Image from "next/image";
import InfPaySimpleSymbol from "../images/InfinitePayWhiteGround.png"
// import {rechargeType, operadoras, rechargeValues} from "../services/getTelefonia";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import telefonia from "../services/getTelefonia";
import Loading from "./loading";
import "../style/telefonia.css";

export default function Telefonia () {
  const router = useRouter();
  const [operadora, setOperadora] = useState('');
  const [recarga, setRecarga] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isBtnRechargeBlock, setIsBtnRechargeBlock] = useState(true);
  const [response, setResponse] = useState(false);

  const controlGeneralState = ({ target }) => {
    const { value, name } = target;

    if (name === 'input-operadora') setOperadora(value);
    if (name === 'input-valor-recarga') setRecarga(value);
    if (name === 'telefone') setTelefone(value);
  }

  const validPhoneNumber = () => {
    const regex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;
    return regex.test(telefone);    
  }

  const validateButton = () => {
    const numberPhoneIsOK = validPhoneNumber()
    if (numberPhoneIsOK && operadora.length > 1 && recarga.length > 1) {
      setIsBtnRechargeBlock(false)
    } else {
      setIsBtnRechargeBlock(true)
    }
  }

  const makeRequest = async () => {
    setResponse(true);
    try {
      const { operadorasId } = telefonia;
      const bodyToRequest = {
        product_id: operadorasId[operadora].toString(),
        area_code: telefone.slice(0, 2).toString(),
        cell_phone_number: telefone.slice(2).toString(),
        amount: recarga
      };
      const result = await axios.post('http://localhost:4567/recarga', bodyToRequest);
  
      if (result.status === 200) {
        setResponse(false)
        console.log(result.data, "aqui");
        router.push(`/payment?valorPagamento=${recarga}&operadora=${operadora}&telefone=${telefone}&id=${result.data.data.id}`);
      } else {
        console.log(`Erro: ${result.status}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  
  useEffect(() => {
    validateButton();
  }, [operadora, recarga, telefone])

  return (
    <div id="telefonia">{response ?
      <Loading /> :
      <div>      
        <div id="card">
          <Image src={InfPaySimpleSymbol} id="image-telefonia"/>
          <h2>Telefonia</h2>
          <p>Aqui você pode vender recargas de celular pré-pago e recargas de telefone fixo.</p>
        </div>

        <div id="form-recarga">
          <h3>Recarga escolhida</h3>
          <form action="">
            {/* <label htmlFor="select-recarga-tipo">Tipos de recarga disponíveis</label>
            <select name="input-recarga-tipo" id="select-recarga-tipo">
              {
                telefonia.rechargeType.map((type, ind) => (
                  <option value={type} key={ind}>{type}</option>
                ))
              }
            </select> */}

            <label htmlFor="select-operadoras">Operadoras disponíveis</label>
            <select 
              name="input-operadora"
              id="select-operadoras"
              onChange={controlGeneralState}
            >
              {
                telefonia.operadoras.map((type, ind) => (
                  <option value={type} key={ind}>{type}</option>
                ))
              }
            </select>

            <label htmlFor="select-valor-recarga">Recargas disponíveis</label>
            <select
              name="input-valor-recarga" 
              id="select-valor-recarga"
              onChange={controlGeneralState}
            >
              {
                telefonia.rechargeValues.map((type, ind) => (
                  <option value={type} key={ind}>{type}</option>
                ))
              }
            </select>

            <label htmlFor="telefone">Número do celular/telefone:</label>
              <input 
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(XX) XXXXX-XXXX"
                pattern="\(\d{2}\) \d{4,5}-\d{4}"
                onChange={controlGeneralState}
                maxLength={11}
                required
              />

              <div id="button">
                <button
                  type="button"
                  className="back-button"
                  onClick={() => router.push('/')}
                >
                  Voltar ao início
                </button>

                <button
                  type="button"
                  className="recharge-button"
                  disabled={isBtnRechargeBlock}
                  onClick={makeRequest}
                >
                  Fazer recarga
                </button>
              </div>
          </form>
        </div>
      </div>
}</div>
  )
}
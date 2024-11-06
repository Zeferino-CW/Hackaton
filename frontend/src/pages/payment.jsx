"use client"

import { useState } from "react";
import iconInfPay from "../images/InfinitePayWhiteGround.png";
import Image from "next/image";
import telefonia from "../services/getTelefonia";
import axios from 'axios';
import { useRouter } from 'next/router';
import "../style/payment.css";

export default function Payment() {
  const router = useRouter();
  const { valorPagamento, telefone, id } = router.query;
  const lucro = (valorPagamento * 0.02).toFixed(2);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // Armazena o tipo selecionado
  const [parcelas, setParcelas] = useState(1); // Armazena o número de parcelas

    // Função para selecionar o tipo de pagamento
    const handleCardClick = (type, index) => {
      setSelectedCard(index);
      setSelectedType(type);
    };

    const makeRequest = async () => {
      try {
        const result = await axios.post(`http://localhost:4567/transacoes/${id}/confirmar`);
        if (result.status === 200) {
          console.log(result.data);
          router.push(`/result?valorPagamento=${valorPagamento}&telefone=${telefone}&id=${result.data.data.id}`);
        } else {
          console.log(`Erro: ${result.status}`);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

  return (
    <div id="mom-payment">
      <section id="description">
        <Image src={iconInfPay} alt="ícone InfinitePay" id="icon-image" />
        <h3>Como quer receber?</h3>
      </section>

      <section id="section-payment">
        <div id="valor">
          <h3>Meio de pagamento</h3>
          <h6 id="valor-dinheiro">R$ {valorPagamento}</h6>
          <h4 id="descricao-lucro">Seu lucro: <span className="lucro-valor">R$ {lucro}</span></h4> 
        </div>

        <div id="div-payment-type">
          {telefonia.paymentMethod.map(({ image, type }, ind) => (
            <div
              key={ind}
              className={selectedCard === ind ? "card selected" : "card"}
              onClick={() => handleCardClick(type, ind)}
            >
              <Image src={image} alt={`${type} icon`} />
              <span>{type}</span>
            </div>
          ))}
        </div>

        {/* Exibir o select de parcelas se "crédito" estiver selecionado */}
        {selectedType === "Crédito" && (
          <div id="parcelas-container">
            <p htmlFor="parcelas">Número de parcelas:</p>
            <select
              id="parcelas"
              value={parcelas}
              onChange={(e) => setParcelas(e.target.value)}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}x
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div id="btn-payment">
          <button
            type="button"
            className="back-button"
            onClick={() => router.push('/')}
          >
            Voltar ao início
          </button>

          <button
            onClick={makeRequest}
            type="button"
            className="recharge-button"
          >
            Fazer recarga
          </button>
        </div>
      </section>
    </div>
  );
}

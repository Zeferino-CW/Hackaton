import Image from "next/image";
import recharges from "../services/getOptionsRecharge"
import "../style/recargas.css";

export default function Recarga () {
  return (
    <div classe="divMae-comp-recarga">
        {
          recharges.map(({image, title, text, buttonText, arrowRightIcon}, ind) => (
            <div className="div-comp-recarga" key={ind}>
              <Image src={image} alt="ícone InfinitePay"/>
              <h3>{title}</h3>
              <p>{text}</p>
              <button
                type="button"
                
              >
                {buttonText}
                <Image src={arrowRightIcon} alt="Ícone de seta" className="icon-arrow"  />
              </button>

            </div>
          ))
        }
    </div>
  )
}

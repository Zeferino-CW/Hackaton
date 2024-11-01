import Image from "next/image";
import recharges from "../services/getOptionsRecharge"
import { useRouter } from 'next/router';
import "../style/recargas.css";

export default function Recarga () {
  const router = useRouter();

  const goToRecharges = (ind) => {
    if (ind == 0) {
      router.push('/telefonia');
    }
    
  }

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
                onClick={() => { goToRecharges(ind) } }
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

import Image from "next/image";
import iconInfPay from "../images/InfinitePayWhiteGround.png";
import gifLoading from "../images/loadingGif.gif";
import "../style/loading.css";


export default function Loading () {
  return (
    <div id="div-mom-loading">
      <section id="description-loading">
        <Image src={iconInfPay} alt="ícone InfinitePay" id="icon-image" />
        <h3>Um momento, estamos realizando a recarga...</h3>
      </section>

      <section id="section-gif-loading">
        <Image src={gifLoading} alt="gif de loading" id="gif-loading" />
      </section>
    </div>
  )
}
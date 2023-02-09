import { Link } from "react-router-dom";
import style from './buttons.module.css'

export default function NextButton(props) {
  const state = props.preForm

  const showModal = () => {
    document.getElementById('completeProfile').showModal()
    document.getElementById('completeProfile').classList.add('showModal')
  }

  const exitModal = () => {
    document.getElementById('completeProfile').close()
    document.getElementById('completeProfile').classList.remove('showModal')
  }

  return props.validate
    ? <Link to={{
        pathname: '/register/complete',
        state: state
      }}>
        <button className={`${style['next-button']}`}>
            Siguiente
        </button>
      </Link>
    : 
  <>
    <dialog id='completeProfile'>
      <h3>Usuario o contraseña no válidos.</h3>
      <h3>La contraseña deber tener un mínimo de 8 caracteres.</h3>
      <button
        className={`${style['exit-modal']}`}
        onClick={exitModal}>
          Cerrar
      </button>
    </dialog>
    <button onClick={showModal}
      className={`${style['next-button']}`}>
        Siguiente
    </button>
  </>
}
import './style.css';

function Modal() {
  return (
    <div className='modal-background'>
      <div className='modal'>
        <span className='close-modal'>X</span>
        <span>O username do usuário é *</span>
        <span>O id do usuário é * e sua posição é *</span>
      </div>
    </div>
  );
}

export default Modal;

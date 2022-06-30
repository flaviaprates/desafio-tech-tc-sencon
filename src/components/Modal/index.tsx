import './style.css';

interface IModalProps {
  currentUser: {
    id: number;
    username: string;
    index: number;
  }
  handleCloseModal: () => void;
}

function Modal({ currentUser, handleCloseModal }: IModalProps) {
  return (
    <div className='modal-background'>
      <div className='modal'>
        <span
          className='close-modal'
          onClick={handleCloseModal}
        >
          x
        </span>
        <span>O username do usuário é {currentUser.username}</span>
        <span>O id do usuário é {currentUser.id} e sua posição é {currentUser.index}</span>
      </div>
    </div>
  );
}

export default Modal;

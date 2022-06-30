import './style.css';
import Modal from '../../components/Modal';
import { useEffect, useState } from 'react';
import api from '../../service/api';

interface IUsers {
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  email: string;
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    }
    street: string;
    suite: string;
    zipcode: string;
  }
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  }
}

interface IUserModal {
  id: number;
  username: string;
  index: number;
}

function Main() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setcurrentUser] = useState<IUserModal>({ id: 0, username: '', index: 0 });

  useEffect(() => {
    loadData();

  }, []);


  async function loadData() {
    try {
      const response = await api.get<IUsers[]>('/users');

      if (response.status > 204) {
        return;
      }

      setUsers(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  function handleCompany(userIndex: number) {

    if (userIndex % 3 === 0 && userIndex % 5 === 0) {
      return 'TC / SENCON';

    } else if (userIndex % 3 === 0) {
      return 'TC';

    } else if (userIndex % 5 === 0) {
      return 'SENCON';

    } else {
      return 'Sem empresa';
    }
  }

  function handleOpenModal(user: IUsers) {
    setOpenModal(true);

    const userIndex = users.findIndex(currentUser => currentUser.id === user.id);

    setcurrentUser({ id: user.id, username: user.username, index: userIndex });
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className='background'>
      <div className='table'>
        <div className='table-title'>
          <span>Nome</span>
          <span>Email</span>
          <span>Telefone</span>
          <span>Endereço Completo</span>
          <span>Cidade</span>
          <span>Empresa</span>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className='table-content'
            onClick={() => handleOpenModal(user)}
          >
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.phone}</span>
            <span>{user.address.street + ', ' + user.address.suite + ', ' + user.address.zipcode}</span>
            <span>{user.address.city}</span>
            <span>{handleCompany(users.findIndex(currentUser => currentUser.id === user.id))}</span>
          </div>
        ))}
      </div>

      {openModal &&
        <Modal
          currentUser={currentUser}
          handleCloseModal={handleCloseModal}
        />}

    </div>
  );
}

export default Main;

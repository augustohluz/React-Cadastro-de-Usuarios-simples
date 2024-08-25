import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash-icon.svg'
import api from '../../services/api'


function Home() {
  const [users, setUsers] = useState([])

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers(){
    await api.post('/usuarios', {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value,
    })
    
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type='text' ref={inputNome}/>
        <input placeholder="Idade" name="idade" type='number'ref={inputIdade} />
        <input placeholder="Email" name="email" type='email' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.nome}</span> </p>
            <p>Idade: <span>{user.idade}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home

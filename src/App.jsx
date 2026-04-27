import { useEffect, useState } from "react";
import Tarefa from "./components/Tarefa";

// endereço da API, Crud CRUD sempre verificar se ainda está ativa
const API_URL = 'https://crudcrud.com/api/8324392d1bb74a8abe1ad1f95b9f2364/tarefas'


function App() {

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovatarefa] = useState('');



  /*faz o uso do use effect para fazer uma unica solicitação quando renderizar a página, usa uma arrow function 
    para fazer as solicitações: Fetch url, busca os dados e aguarda uma resposta: promisse
    com as repostas em mãos transforma em Json em seguida chama o set tarefa para setar as tarefas com os dados recebidos.
    catch ele pega o erro se houver na solicitação dos dados  */

  // Buscar dados na API quando o componente for montado "useEffect"
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(dados => setTarefas(dados))
      .catch(error => console.error("Error ao buscar tarefas", error))
  }, [])




  const handleSubmit = (e) => {
    e.preventDefault();

    if (novaTarefa.trim() === '') return;

    
    // ENVIO DA TAREFA PARA A API
    const nova = { texto: novaTarefa.trim()}
    /*  utiliza o metodo POST para enviar a tarefa para o banco mesmo com o metodo post sempre recebe uma resposta
    .then, então transforma em Json, então seta as tarefas e via operator "..." pega o arraw antigo e adiciona o novo ...antigo, +Novo.*/
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-type' : 'Application/json'},
      body:JSON.stringify(nova)
    })
      .then(res => res.json())  
      .then(tarefaCriada => {
        setTarefas([...tarefas, tarefaCriada]);
        setNovatarefa('');
      })
      .catch(error => console.error("Error ao buscar tarefas", error))



    setTarefas([...tarefas, nova]);
    setNovatarefa('');


  }


  return (

    <main>
      <h1> To-Do-List App</h1>

      <form onSubmit={handleSubmit}>

        <input type="text" placeholder="Digite nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovatarefa(e.target.value)}

        />

        <button type="submit" >Adicionar</button>
      </form>

      <ul>
        {tarefas.map(tarefa => <Tarefa key={tarefa._id} texto={tarefa.texto} />)}

      </ul>

    </main>

  )
}

export default App

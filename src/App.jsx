import { useState } from "react";
import Tarefa from "./components/Tarefa";

const API_URL ='https://crudcrud.com/api/8324392d1bb74a8abe1ad1f95b9f2364/tarefas'


function App() {

  const [tarefas, setTarefas] = useState([
    { id: 1, texto: "Estudar React" },
    { id: 2, texto: "Fazer compras" },
    { id: 3, texto: "E-mails"}
  ]);

  const [novaTarefa, setNovatarefa] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (novaTarefa.trim() === '') return;

    const novoId = tarefas[tarefas.length - 1]. id+1;
    
    const nova = {
      id: novoId,
      texto: novaTarefa.trim()
    }

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
        {tarefas.map(tarefa => <Tarefa key={tarefa.id } texto={tarefa.texto} />)}

      </ul>

    </main>

  )
}

export default App

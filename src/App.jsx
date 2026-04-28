import { useEffect, useState } from "react";
import Tarefa from "./components/Tarefa";
import { useInput } from "./hooks/useInput";
import ListaTarefas from "./components/ListaTarefas";
import Login from "./components/Login";
import { UserContext } from "./contexts/UserContext";

// endereço da API, Crud CRUD sempre verificar se ainda está ativa


function App() {

  const [usuario, setUsuario] = useState({ nome: null, estaLogado: false });

  return (
    <UserContext.Provider value={{usuario,setUsuario}}>
    <main>
      <h1> To-Do-List App</h1>
      {usuario.estaLogado ? <ListaTarefas/> : <Login/>}
    </main>
    </UserContext.Provider>



  )
}

export default App

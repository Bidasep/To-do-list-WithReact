import { useContext, useEffect, useState } from "react";
import Tarefa from "./Tarefa";
import { useInput } from "../hooks/useInput";
import { UserContext } from "../contexts/UserContext";

// endereço da API, Crud CRUD sempre verificar se ainda está ativa
const API_URL = 'https://crudcrud.com/api/58d5904984814067ac90229400e4fc68/tarefas'


function ListaTarefas() {

    const [tarefas, setTarefas] = useState([]);
    const tarefa = useInput();
    const {usuario} = useContext(UserContext);




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

        if (tarefa.valor === '') return;


        // ENVIO DA TAREFA PARA A API
        const nova = { usuario: usuario.nome, texto: tarefa.valor }
        /*  utiliza o metodo POST para enviar a tarefa para o banco mesmo com o metodo post sempre recebe uma resposta
        .then, então transforma em Json, então seta as tarefas e via operator "..." pega o arraw antigo e adiciona o novo ...antigo, +Novo.*/
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-type': 'Application/json' },
            body: JSON.stringify(nova)
        })
            .then(res => res.json())
            .then(tarefaCriada => {
                setTarefas([...tarefas, tarefaCriada]);
                tarefa.limpar();
            })
            .catch(error => console.error("Error ao buscar tarefas", error))



        setTarefas([...tarefas, nova]);
        tarefa.limpar();


    }


    return (

        <>

            <form onSubmit={handleSubmit}>

                <input type="text"
                    placeholder="Digite nova tarefa"
                    value={tarefa.valor}
                    onChange={tarefa.onChange}

                />

                <button type="submit" > Adicionar</button>
            </form>

            <ul>
                {tarefas
                .filter(tarefa => tarefa.usuario === usuario.nome) 
                .map(tarefa => <Tarefa key={tarefa._id} texto={tarefa.texto} />)}

            </ul>

        </>

    )
}

export default ListaTarefas;

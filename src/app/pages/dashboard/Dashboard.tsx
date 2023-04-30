import { useCallback, useEffect, useState } from 'react';
import { ITarefa, TarefasService } from '../../shared/services/api/tarefas/TarefasService';
import { ApiException } from '../../shared/services/api/ApiException';


export const Dashboard = () => {

  const [lista, setLista] = useState<ITarefa[]>([]);

  useEffect(() => {
    TarefasService.getAll()
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setLista(result);
        }
      });
  }, []);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === 'Enter') {
      if (e.currentTarget.value.trim().length === 0) return;
      
      const value = e.currentTarget.value;
      e.currentTarget.value = '';

      if (lista.some((listItem) => listItem.title === value)) return;

      TarefasService.create({ title: value, isCompleted: false }).then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setLista((oldLista) => [...oldLista, result]);
        }
      });
    }
  }, [lista]);

  const handleToggleComplete = useCallback((id: number) => {

    const tarefaToUpdate = lista.find((tarefa) => tarefa.id === id);
    if (!tarefaToUpdate) return;

    TarefasService.updateById(id, {
      ...tarefaToUpdate,
      isCompleted: !tarefaToUpdate.isCompleted
    })
    .then((result) => {
      if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setLista(oldLista => {
            return oldLista.map(oldListItem => {
              if (oldListItem.id === id) return result;

              return oldListItem
            });
          });          
        }
    });
  }, [lista]);

  const handleDelete = useCallback((id: number) => {

    TarefasService.deleteById(id)
    .then((result) => {
      if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setLista(oldLista => {
            return oldLista.filter(oldListItem => oldListItem.id !== id);
          });          
        }
    });
  }, []);

  return (
    <div className="container">
      
      <div className="w-100 mb-3">
        <h1>Lista</h1>
        <br />
        <input
          className="w-100"
          type="text"
          onKeyDown={handleInputKeyDown}
          placeholder="Adicione uma tarefa..."
        />
        <p className="mt-3">Pressione a tecla <span style={{ background: "#eee", padding: "5px 10px", borderRadius: "5px" }}>Enter</span> para adicionar a tarefa.</p>
        <p className="mt-3">Tarefas concluídas: {lista.filter((listItem) => listItem.isCompleted).length}</p>
      </div>

      <div className="w-100 mb-3">
        <ul>
          {lista.map((listItem) => {
            return (
              <li className="task-item flex gap-1 mt-2" key={listItem.id}>
                <input
                  type="checkbox"
                  checked={listItem.isCompleted}
                  onChange={() => handleToggleComplete(listItem.id)}
                />

                <span>{listItem.title}</span>

                <button className="btn-delete" onClick={() => {handleDelete(listItem.id)}}>Apagar</button>
              </li>
            );
          })}
        </ul>
      </div>
    
    </div>
  );
}
import { useCallback, useState } from 'react';

interface ITarefa {
  id: number;
  title: string;
  isCompleted: boolean;
}

export const Dashboard = () => {

  const [lista, setLista] = useState<ITarefa[]>([])

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === 'Enter') {
      if (e.currentTarget.value.trim().length === 0) return;
      
      const value = e.currentTarget.value;
      e.currentTarget.value = '';

      setLista((oldLista) => {
        if (oldLista.some((listItem) => listItem.title === value)) return oldLista;
        return [
          ...oldLista,
          {
            id: oldLista.length,
            title: value,
            isCompleted: false,
          }
        ];
      });
    }
  }, []);

  return (
    <div>
      
      <div className="mb-3">
        <h1>Lista</h1>
        <br />
        <input
          type="text"
          onKeyDown={handleInputKeyDown}
        />
        <p className="mt-3">{lista.filter((listItem) => listItem.isCompleted).length}</p>
      </div>

      <div className="mb-3">
        <ul>
          {lista.map((listItem) => {
            return (
              <li className="flex gap-1" key={listItem.id}>
                <input
                  type="checkbox"
                  checked={listItem.isCompleted}
                  onChange={() => {
                    setLista(oldLista => {
                      return oldLista.map(oldListItem => {
                        const newIsCompleted = oldListItem.title === listItem.title
                        ? !oldListItem.isCompleted
                        : oldListItem.isCompleted;
                        
                        return {
                          ...oldListItem,
                          isSelected: newIsCompleted,
                        }
                      })
                    })
                  }}
                />
                {listItem.title}
              </li>
            );
          })}
        </ul>
      </div>
    
    </div>
  );
}
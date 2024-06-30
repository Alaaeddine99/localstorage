Composants Principaux
1. TaskItem
Ce composant représente un élément de tâche individuel dans la liste des tâches. Il affiche les détails de la tâche, comme son nom et sa description, ainsi que des boutons pour éditer, supprimer et marquer la tâche comme complétée.

jsx

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
      </div>
    </div>
  );
};
Props:
task: Objet représentant la tâche avec des propriétés comme id, name, description, et completed.
onEdit: Fonction appelée lorsqu'on clique sur le bouton "Edit" pour éditer une tâche.
onDelete: Fonction appelée lorsqu'on clique sur le bouton "Delete" pour supprimer une tâche.
onToggleComplete: Fonction appelée lorsqu'on clique sur le bouton "Complete" ou "Undo" pour marquer ou démarquer une tâche comme complétée.
2. TaskForm
Ce composant gère le formulaire d'ajout et d'édition des tâches. Il effectue une validation simple pour s'assurer que les champs de nom et de description sont remplis avant d'ajouter ou de mettre à jour une tâche.

jsx

const TaskForm = ({ onSave, taskToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError('Both fields are required.');
      return;
    }
    setError('');
    onSave({ id: taskToEdit ? taskToEdit.id : Date.now(), name, description, completed: false });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Task Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Task Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};
Props:
onSave: Fonction appelée lorsqu'on soumet le formulaire pour ajouter ou mettre à jour une tâche.
taskToEdit: Tâche à éditer, utilisée pour pré-remplir le formulaire lorsqu'on édite une tâche existante.
3. TaskList
Ce composant est responsable de la gestion de la liste des tâches. Il gère l'état des tâches, les opérations d'ajout, de modification, de suppression et de marquage des tâches comme complétées. Il utilise également localStorage pour persister les tâches entre les sessions.

jsx

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = (task) => {
    if (taskToEdit) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setTaskToEdit(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTask = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className="task-list">
      <TaskForm onSave={addOrUpdateTask} taskToEdit={taskToEdit} />
      <div className="tasks">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={editTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
};
Fonctions:
addOrUpdateTask: Ajoute une nouvelle tâche ou met à jour une tâche existante selon taskToEdit.
deleteTask: Supprime une tâche après confirmation de l'utilisateur.
toggleComplete: Marque une tâche comme complétée ou non complétée.
editTask: Pré-remplit le formulaire avec les détails d'une tâche pour l'édition.
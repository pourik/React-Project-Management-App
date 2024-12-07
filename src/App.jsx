import { useState } from "react";

import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import ProjectsSidebar from "./ProjectsSidebar";
import SelectedProject from "./SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTasks(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevState.selectedProjectId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTasks(id) {
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((t) => t.id !== id),
    }));
  }

  function handleSelectProject(projectId) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: projectId,
    }));
  }

  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      projects: prevState.projects.filter(
        (p) => p.id !== prevState.selectedProjectId
      ),
      selectedProjectId: undefined,
    }));
  }

  function handleStartAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleAddProjects(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProjects() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  let content = (
    <SelectedProject
      project={projectState.projects.find(
        (p) => p.id === projectState.selectedProjectId
      )}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTasks}
      onDeleteTask={handleDeleteTasks}
      tasks={projectState.tasks.filter(
        (t) => t.projectId === projectState.selectedProjectId
      )}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProjects}
        onCancel={handleCancelAddProjects}
      />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="flex h-screen my-8 gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

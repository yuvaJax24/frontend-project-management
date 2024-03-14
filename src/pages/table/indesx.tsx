import { useEffect, useState } from "react";
import "./index.css";

const Table = () => {
  const [mappedData, setMappedData] = useState<any>();

  const data = {
    projects: [
      {
        id: 1,
        name: "Project A",
        tasks: [
          {
            id: 2,
            name: "Task A1",
            notes: [
              { id: 3, name: "Note A1.1" },
              { id: 4, name: "Note A1.2" },
            ],
          },
          {
            id: 5,
            name: "Task A2",
            notes: [
              { id: 6, name: "Note A2.1" },
              { id: 7, name: "Note A2.2" },
              { id: 8, name: "Note A2.3" },
            ],
          },
          {
            id: 9,
            name: "Task A3",
            notes: [{ id: 10, name: "Note A3.1" }],
          },
        ],
      },
      {
        id: 11,
        name: "Project B",
        tasks: [
          {
            id: 12,
            name: "Task B1",
            notes: [{ id: 13, name: "Note B1.1" }],
          },
        ],
      },
    ],
  };

  const mapTask = (task: any) => {
    const notes = task?.notes?.map((note: any, index: any) => ({
      ...note,
      firstInTask: index === 0 ? task : null,
      parentTask: task,
    }));
    // console.log("first1", notes);
    return { ...task, notes };
  };

  const mapProject = (project: any) => {
    const tasks = project?.tasks?.map(mapTask);
    const projectNotes = tasks?.reduce(
      (all: any, task: any) => [...all, ...task.notes],
      []
    );
    const notes = projectNotes?.map((note: any, index: any) => ({
      ...note,
      firstInProject:
        index === 0
          ? { ...project, count: projectNotes?.length, parentProject: project }
          : null,
    }));
    // console.log("first2", tasks);
    // console.log("first3", projectNotes);
    // console.log("first4", notes);
    return { ...project, tasks, notes };
  };

  const mapData = (data: any) => {
    const projects = data?.projects?.map(mapProject);
    const notes = projects?.reduce(
      (all: any, project: any) => [...all, ...project?.notes],
      []
    );
    // console.log("first5", projects);
    // console.log("first6", notes);
    return { ...data, projects, notes };
  };

  useEffect(() => {
    setMappedData(mapData(data));
  }, [data]);

  console.log("first7", mappedData);

  return (
    <table cellSpacing="10" cellPadding="5">
      <tbody>
        {mappedData?.notes?.map((note: any) => (
          <tr key={note?.id}>
            {note?.firstInProject ? (
              <td rowSpan={note?.firstInProject?.count}>
                <span>{note?.firstInProject?.name}</span>
              </td>
            ) : null}
            {note?.firstInTask ? (
              <td rowSpan={note?.firstInTask?.notes?.length}>
                {note?.firstInTask?.name}
              </td>
            ) : null}
            <td>
              <span>{note?.name}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

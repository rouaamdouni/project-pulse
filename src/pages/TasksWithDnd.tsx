import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNotifications } from "@/contexts/NotificationContext";

interface Task {
  id: number;
  title: string;
  project: string;
  priority: "Haute" | "Moyenne" | "Basse";
  assignee: string;
  status: "todo" | "doing" | "done";
}

const SortableTask = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="border-border/50 shadow-soft hover:shadow-soft-md transition-all duration-300 cursor-move group"
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div {...attributes} {...listeners}>
            <GripVertical className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1 cursor-grab active:cursor-grabbing" />
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                {task.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {task.project}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  task.priority === "Haute"
                    ? "destructive"
                    : task.priority === "Moyenne"
                    ? "default"
                    : "secondary"
                }
                className="text-xs"
              >
                {task.priority}
              </Badge>
              <Avatar className="h-7 w-7 border-2 border-background">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {task.assignee.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TasksWithDnd() {
  const { addNotification } = useNotifications();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Révision design interface", project: "Refonte Site Web", priority: "Haute", assignee: "Alice", status: "todo" },
    { id: 2, title: "Développement API REST", project: "Application Mobile", priority: "Haute", assignee: "Bob", status: "doing" },
    { id: 3, title: "Tests unitaires API", project: "Application Mobile", priority: "Moyenne", assignee: "Charlie", status: "doing" },
    { id: 4, title: "Configuration serveurs", project: "Migration Cloud", priority: "Haute", assignee: "Diana", status: "done" },
    { id: 5, title: "Documentation technique", project: "Migration Cloud", priority: "Basse", assignee: "Eve", status: "done" },
    { id: 6, title: "Wireframes mobile", project: "Nouveau CRM", priority: "Moyenne", assignee: "Frank", status: "todo" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: "todo", title: "À faire", color: "bg-status-todo", tasks: tasks.filter(t => t.status === "todo") },
    { id: "doing", title: "En cours", color: "bg-status-doing", tasks: tasks.filter(t => t.status === "doing") },
    { id: "done", title: "Terminé", color: "bg-status-done", tasks: tasks.filter(t => t.status === "done") },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id;
    let newStatus: "todo" | "doing" | "done" = activeTask.status;

    // Check if dropped over a column
    if (overId === "todo" || overId === "doing" || overId === "done") {
      newStatus = overId;
    } else {
      // Dropped over another task
      const overTask = tasks.find(t => t.id === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (newStatus !== activeTask.status) {
      setTasks(prev =>
        prev.map(task =>
          task.id === active.id ? { ...task, status: newStatus } : task
        )
      );

      addNotification({
        title: "Tâche déplacée",
        message: `"${activeTask.title}" a été déplacée vers "${
          newStatus === "todo" ? "À faire" : newStatus === "doing" ? "En cours" : "Terminé"
        }"`,
        type: "task",
      });
    }
  };

  const activeTask = activeId ? tasks.find(t => t.id === activeId) : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mes tâches</h1>
          <p className="text-muted-foreground">Vue Kanban de toutes vos tâches</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 transition-opacity shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle tâche
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-16rem)]">
          {columns.map((column, index) => (
            <SortableContext
              key={column.id}
              items={column.tasks.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <Card
                className="border-border/50 shadow-soft-md flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${column.color}`} />
                      {column.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {column.tasks.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent
                  id={column.id}
                  className="flex-1 overflow-y-auto space-y-3 min-h-[100px]"
                >
                  {column.tasks.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      Aucune tâche
                    </div>
                  ) : (
                    column.tasks.map((task) => (
                      <SortableTask key={task.id} task={task} />
                    ))
                  )}
                </CardContent>
              </Card>
            </SortableContext>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <Card className="border-border/50 shadow-soft-md cursor-grabbing">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                        {activeTask.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {activeTask.project}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          activeTask.priority === "Haute"
                            ? "destructive"
                            : activeTask.priority === "Moyenne"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {activeTask.priority}
                      </Badge>
                      <Avatar className="h-7 w-7 border-2 border-background">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {activeTask.assignee.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

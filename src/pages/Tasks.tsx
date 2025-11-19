import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Task {
  id: number;
  title: string;
  project: string;
  priority: "Haute" | "Moyenne" | "Basse";
  assignee: string;
  status: "todo" | "doing" | "done";
}

export default function Tasks() {
  const tasks: Task[] = [
    { id: 1, title: "Révision design interface", project: "Refonte Site Web", priority: "Haute", assignee: "Alice", status: "todo" },
    { id: 2, title: "Développement API REST", project: "Application Mobile", priority: "Haute", assignee: "Bob", status: "doing" },
    { id: 3, title: "Tests unitaires API", project: "Application Mobile", priority: "Moyenne", assignee: "Charlie", status: "doing" },
    { id: 4, title: "Configuration serveurs", project: "Migration Cloud", priority: "Haute", assignee: "Diana", status: "done" },
    { id: 5, title: "Documentation technique", project: "Migration Cloud", priority: "Basse", assignee: "Eve", status: "done" },
    { id: 6, title: "Wireframes mobile", project: "Nouveau CRM", priority: "Moyenne", assignee: "Frank", status: "todo" },
  ];

  const columns = [
    { id: "todo", title: "À faire", color: "bg-status-todo", tasks: tasks.filter(t => t.status === "todo") },
    { id: "doing", title: "En cours", color: "bg-status-doing", tasks: tasks.filter(t => t.status === "doing") },
    { id: "done", title: "Terminé", color: "bg-status-done", tasks: tasks.filter(t => t.status === "done") },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-16rem)]">
        {columns.map((column, index) => (
          <Card
            key={column.id}
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
            <CardContent className="flex-1 overflow-y-auto space-y-3">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="border-border/50 shadow-soft hover:shadow-soft-md transition-all duration-300 cursor-move group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
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
                            variant="secondary"
                            className={`text-xs ${
                              task.priority === "Haute"
                                ? "bg-destructive/10 text-destructive"
                                : task.priority === "Moyenne"
                                ? "bg-accent/10 text-accent"
                                : "bg-secondary/10 text-secondary"
                            }`}
                          >
                            {task.priority}
                          </Badge>
                          <Avatar className="h-6 w-6 border-2 border-background">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                              {task.assignee.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {column.tasks.length === 0 && (
                <div className="h-full flex items-center justify-center py-12">
                  <p className="text-muted-foreground text-sm text-center">
                    Aucune tâche
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

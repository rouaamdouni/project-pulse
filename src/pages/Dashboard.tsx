import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FolderKanban, ListTodo, Users, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    { title: "Projets actifs", value: "12", icon: FolderKanban, color: "text-primary", bg: "bg-primary/10" },
    { title: "Tâches en cours", value: "34", icon: ListTodo, color: "text-accent", bg: "bg-accent/10" },
    { title: "Membres d'équipe", value: "8", icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
    { title: "Taux de complétion", value: "76%", icon: TrendingUp, color: "text-status-done", bg: "bg-status-done/10" },
  ];

  const recentProjects = [
    { name: "Refonte Site Web", progress: 65, status: "En cours", color: "bg-status-doing" },
    { name: "Application Mobile", progress: 45, status: "En cours", color: "bg-status-doing" },
    { name: "Migration Cloud", progress: 90, status: "Presque terminé", color: "bg-status-done" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble de vos projets et tâches</p>
        </div>
        <div className="flex gap-3">
          <Link to="/projects/new">
            <Button className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 transition-opacity shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau projet
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="border-border/50 shadow-soft hover:shadow-soft-md transition-shadow duration-300" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-soft-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" />
              Projets récents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">{project.name}</h4>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={project.progress} className="flex-1 h-2" />
                  <span className={`text-xs px-2 py-1 rounded-full ${project.color} bg-opacity-10`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
            <Link to="/projects">
              <Button variant="ghost" className="w-full mt-2 text-primary hover:bg-primary/5">
                Voir tous les projets
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-soft-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-accent" />
              Tâches prioritaires
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Révision design interface", project: "Refonte Site Web", priority: "Haute" },
              { title: "Tests unitaires API", project: "Application Mobile", priority: "Moyenne" },
              { title: "Documentation technique", project: "Migration Cloud", priority: "Basse" },
            ].map((task, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                  <p className="text-xs text-muted-foreground">{task.project}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === "Haute" ? "bg-destructive/10 text-destructive" :
                  task.priority === "Moyenne" ? "bg-accent/10 text-accent" :
                  "bg-secondary/10 text-secondary"
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
            <Link to="/tasks">
              <Button variant="ghost" className="w-full mt-2 text-accent hover:bg-accent/5">
                Voir toutes les tâches
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

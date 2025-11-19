import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Grid3x3, List, FolderKanban, Users, Calendar } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ViewMode = "grid" | "list";

export default function Projects() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const projects = [
    {
      id: 1,
      name: "Refonte Site Web",
      description: "Modernisation complète du site web corporate",
      status: "En cours",
      progress: 65,
      team: 5,
      deadline: "15 Déc 2024",
      color: "bg-primary",
    },
    {
      id: 2,
      name: "Application Mobile",
      description: "Développement de l'app iOS et Android",
      status: "En cours",
      progress: 45,
      team: 4,
      deadline: "20 Jan 2025",
      color: "bg-accent",
    },
    {
      id: 3,
      name: "Migration Cloud",
      description: "Migration infrastructure vers AWS",
      status: "Presque terminé",
      progress: 90,
      team: 3,
      deadline: "30 Nov 2024",
      color: "bg-secondary",
    },
    {
      id: 4,
      name: "Nouveau CRM",
      description: "Implémentation Salesforce",
      status: "Planification",
      progress: 15,
      team: 6,
      deadline: "15 Fév 2025",
      color: "bg-status-todo",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projets</h1>
          <p className="text-muted-foreground">Gérez tous vos projets en un seul endroit</p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-lg border border-border bg-card p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary text-white" : ""}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary text-white" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Link to="/projects/new">
            <Button className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 transition-opacity shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau projet
            </Button>
          </Link>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="border-border/50 shadow-soft hover:shadow-soft-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${project.color} bg-opacity-10`}>
                    <FolderKanban className={`h-5 w-5 ${project.color.replace('bg-', 'text-')}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progression</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${project.color} transition-all duration-500`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{project.team} membres</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{project.deadline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/50 shadow-soft-md">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${project.color} bg-opacity-10 flex-shrink-0`}>
                      <FolderKanban className={`h-5 w-5 ${project.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {project.description}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                      <div className="w-32">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progression</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${project.color}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{project.team}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{project.deadline}</span>
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        {Array.from({ length: Math.min(project.team, 3) }).map((_, i) => (
                          <Avatar key={i} className="h-8 w-8 border-2 border-background">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                              {String.fromCharCode(65 + i)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team > 3 && (
                          <Avatar className="h-8 w-8 border-2 border-background">
                            <AvatarFallback className="bg-muted text-xs">
                              +{project.team - 3}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

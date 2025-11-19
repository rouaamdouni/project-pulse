import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Mail, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Team() {
  const members = [
    {
      id: 1,
      name: "Alice Dupont",
      role: "Chef de projet",
      email: "alice@example.com",
      projects: 5,
      tasks: 12,
      completion: 85,
      rating: 4.8,
      color: "from-primary to-accent",
    },
    {
      id: 2,
      name: "Bob Martin",
      role: "Développeur",
      email: "bob@example.com",
      projects: 3,
      tasks: 8,
      completion: 72,
      rating: 4.5,
      color: "from-secondary to-primary",
    },
    {
      id: 3,
      name: "Charlie Blanc",
      role: "Designer",
      email: "charlie@example.com",
      projects: 4,
      tasks: 10,
      completion: 90,
      rating: 4.9,
      color: "from-accent to-secondary",
    },
    {
      id: 4,
      name: "Diana Rousseau",
      role: "Chef de projet",
      email: "diana@example.com",
      projects: 6,
      tasks: 15,
      completion: 78,
      rating: 4.7,
      color: "from-primary to-secondary",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Équipe</h1>
          <p className="text-muted-foreground">Gérez les membres de votre équipe</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 transition-opacity shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Inviter un membre
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, index) => (
          <Card
            key={member.id}
            className="border-border/50 shadow-soft hover:shadow-soft-md transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-3 border-primary/20">
                  <AvatarFallback className={`bg-gradient-to-br ${member.color} text-white text-xl font-semibold`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-1 truncate">{member.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {member.role}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary">{member.projects}</div>
                  <div className="text-xs text-muted-foreground">Projets</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-accent/5">
                  <div className="text-2xl font-bold text-accent">{member.tasks}</div>
                  <div className="text-xs text-muted-foreground">Tâches</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Taux de complétion</span>
                  <span className="font-medium text-foreground">{member.completion}%</span>
                </div>
                <Progress value={member.completion} className="h-2" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Évaluation</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-accent">★</span>
                    <span className="text-sm font-medium text-foreground">{member.rating}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                  Voir profil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface EvaluationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  onSave: (evaluation: { rating: number; quality: number; communication: number; deadlines: number; comment: string }) => void;
}

export const EvaluationDialog = ({ open, onOpenChange, memberName, onSave }: EvaluationDialogProps) => {
  const [rating, setRating] = useState(5);
  const [quality, setQuality] = useState([80]);
  const [communication, setCommunication] = useState([80]);
  const [deadlines, setDeadlines] = useState([80]);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      rating,
      quality: quality[0],
      communication: communication[0],
      deadlines: deadlines[0],
      comment,
    });
    toast.success('Évaluation enregistrée!');
    onOpenChange(false);
    
    // Reset form
    setRating(5);
    setQuality([80]);
    setCommunication([80]);
    setDeadlines([80]);
    setComment('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Évaluer {memberName}</DialogTitle>
          <DialogDescription>
            Évaluez la performance du membre de l'équipe
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label>Note globale</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-colors"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Qualité du travail: {quality[0]}%</Label>
              <Slider
                value={quality}
                onValueChange={setQuality}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label>Communication: {communication[0]}%</Label>
              <Slider
                value={communication}
                onValueChange={setCommunication}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label>Respect des délais: {deadlines[0]}%</Label>
              <Slider
                value={deadlines}
                onValueChange={setDeadlines}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="comment">Commentaire</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajoutez vos commentaires..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

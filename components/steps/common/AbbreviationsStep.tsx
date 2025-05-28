
import React from 'react';
import Card from '../../ui/Card';
import { useNavigation } from '../../../contexts/NavigationContext';
import { abbreviationsList } from '../../../constants/abbreviationsData';
import { BookOpen, ChevronLeft } from 'lucide-react';
import Button from '../../ui/Button';

const AbbreviationsStep: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <Card 
      title="Liste des Abréviations" 
      icon={<BookOpen className="text-sky-600" />}
      className="border-sky-200"
    >
      <p className="mb-6 text-sm text-slate-600">
        Voici une liste des abréviations couramment utilisées dans ce guide et dans les recommandations GINA.
      </p>
      
      <div className="space-y-4">
        {abbreviationsList
          .sort((a, b) => a.abbr.localeCompare(b.abbr)) // Tri alphabétique
          .map((item) => (
          <div key={item.abbr} className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <p className="font-semibold text-sky-700">
              {item.abbr}: <span className="font-normal text-slate-700">{item.full}</span>
            </p>
            {item.description && (
              <p className="text-xs text-slate-500 mt-1">{item.description}</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200">
        <Button onClick={goBack} variant="secondary" leftIcon={<ChevronLeft />} size="lg" fullWidth>
          Retour au Guide
        </Button>
      </div>
    </Card>
  );
};

export default AbbreviationsStep;

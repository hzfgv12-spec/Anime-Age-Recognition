import React from "react";
import { Sparkles, Users } from "lucide-react";
import { AnimeAnalysis } from "../types";

interface SimilarCharacter {
  name: string;
  imageUrl: string;
  analysis: AnimeAnalysis;
}

interface SimilarCharactersProps {
  currentAnalysis: AnimeAnalysis;
  candidates: SimilarCharacter[];
  onSelect: (item: SimilarCharacter) => void;
}

export function SimilarCharacters({ currentAnalysis, candidates, onSelect }: SimilarCharactersProps) {
  // Simple similarity logic: match archetype or vibe
  const recommendations = candidates
    .filter(c => c.name !== currentAnalysis.characterName)
    .filter(c => 
      c.analysis.animeArchetype === currentAnalysis.animeArchetype || 
      c.analysis.personalityVibe.primaryVibe === currentAnalysis.personalityVibe.primaryVibe
    )
    .slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 glass-panel backdrop-blur-md">
      <h3 className="text-sm font-bold font-display text-white mb-4 flex items-center gap-2">
        <Users size={16} className="text-pink-400" />
        推薦相似風格角色
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(rec)}
            className="text-left bg-slate-950/40 border border-slate-800 rounded-xl p-3 hover:border-slate-600 transition-all"
          >
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-2">
              <img src={rec.imageUrl} alt={rec.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <p className="text-xs font-bold text-white truncate">{rec.name}</p>
            <p className="text-[10px] text-slate-400 truncate mt-1">{rec.analysis.animeArchetype}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

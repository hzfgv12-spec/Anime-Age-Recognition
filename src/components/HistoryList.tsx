import React from "react";
import { History, Clock, CheckSquare, Square } from "lucide-react";
import { HistoryItem } from "../types";

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  selectedForCompare: HistoryItem[];
  onToggleCompare: (item: HistoryItem) => void;
}

export function HistoryList({ history, onSelect, selectedForCompare, onToggleCompare }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 glass-panel backdrop-blur-md">
      <h3 className="text-sm font-bold font-display text-white mb-4 flex items-center gap-2">
        <History size={16} className="text-pink-400" />
        分析歷史記錄
      </h3>
      <div className="space-y-3">
        {history.map((item) => {
          const isSelected = selectedForCompare.some(s => s.id === item.id);
          return (
            <div
              key={item.id}
              className="w-full flex items-center gap-2"
            >
              <button
                onClick={() => onToggleCompare(item)}
                className="text-slate-500 hover:text-pink-400 p-1"
              >
                {isSelected ? <CheckSquare size={18} className="text-pink-400" /> : <Square size={18} />}
              </button>
              <button
                onClick={() => onSelect(item)}
                className="flex-1 flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-800/50 rounded-xl hover:border-slate-700 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.analysis.characterName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{item.analysis.characterName}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-slate-400 truncate">{item.analysis.estimatedAge} / {item.analysis.estimatedAgeGroup}</span>
                    <span className="text-[9px] text-slate-500 font-mono"><Clock size={10} className="inline mr-1" />{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

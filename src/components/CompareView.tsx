import React from "react";
import { AnimeAnalysis } from "../types";

interface CompareViewProps {
  item1: { name: string; analysis: AnimeAnalysis; imageUrl: string };
  item2: { name: string; analysis: AnimeAnalysis; imageUrl: string };
  onClose: () => void;
}

export function CompareView({ item1, item2, onClose }: CompareViewProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl glass-panel">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white font-display">角色特性比較</h2>
        <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 text-sm">關閉比較</button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {[item1, item2].map((item, idx) => (
          <div key={idx} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
             <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
             <h3 className="font-bold text-lg text-white mb-2">{item.name}</h3>
             <p className="text-sm text-slate-400">年齡: {item.analysis.estimatedAge}</p>
             <p className="text-sm text-slate-400">類型: {item.analysis.animeArchetype}</p>
             <p className="text-sm text-slate-400">萌屬性: {item.analysis.personalityVibe.primaryVibe}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 space-y-4">
        <h4 className="text-white font-bold">差異分析</h4>
        <div className="text-slate-300 text-sm p-4 bg-slate-800/50 rounded-xl">
           這裡可以做更細緻的差異比較，例如屬性得分與特徵詳細對比。
        </div>
      </div>
    </div>
  );
}

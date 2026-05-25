import React, { useState } from "react";
import { Eye, Shirt, Calendar, CheckSquare, Sparkles, Feather, Compass } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AnimeAnalysis } from "../types";

interface FeatureListProps {
  analysis: AnimeAnalysis;
}

export function FeatureList({ analysis }: FeatureListProps) {
  const { visualEvidence, features, personalityVibe, animeArchetype, estimatedAgeGroup, confidenceScore } = analysis;
  const [activeTab, setActiveTab] = useState<"features" | "evidence" | "radar">("features");

  // Simulated ability scores based on archetype/vibe
  const abilityData = [
    { subject: '可愛', A: Math.min(100, Math.max(20, confidenceScore + 5)), fullMark: 100 },
    { subject: '戰鬥力', A: Math.min(100, Math.max(20, confidenceScore - 10)), fullMark: 100 },
    { subject: '智慧', A: Math.min(100, Math.max(20, confidenceScore)), fullMark: 100 },
    { subject: '神秘感', A: Math.min(100, Math.max(20, confidenceScore - 20)), fullMark: 100 },
    { subject: '親和力', A: Math.min(100, Math.max(20, confidenceScore + 10)), fullMark: 100 },
  ];

  const featureSpecs = [
    {
      label: "髮色 / Hair Color",
      value: features.hairColor,
      icon: <span className="w-2.5 h-2.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: 'currentColor' }} />,
      colorClass: "text-purple-400 bg-purple-500/5 border-purple-500/10"
    },
    {
      label: "髮型 / Hair Style",
      value: features.hairStyle,
      icon: <Feather size={14} />,
      colorClass: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10"
    },
    {
      label: "眼睛神韻 / Eye Aspect",
      value: features.eyeStyle,
      icon: <Eye size={14} />,
      colorClass: "text-pink-400 bg-pink-500/5 border-pink-500/10"
    },
    {
      label: "衣著裝束 / Clothing",
      value: features.clothing,
      icon: <Shirt size={14} />,
      colorClass: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10"
    },
    {
      label: "配件附屬 / Accessory",
      value: features.accessory,
      icon: <Sparkles size={14} />,
      colorClass: "text-amber-400 bg-amber-500/5 border-amber-500/10"
    }
  ];

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 glass-panel backdrop-blur-md text-slate-100 shadow-xl">
      
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-800 pb-3 mb-6 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("features")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-medium transition-all ${
            activeTab === "features"
              ? "bg-slate-800 text-pink-400 border border-slate-705 shadow-inner"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Compass size={14} />
          二次元特徵
        </button>
        <button
          onClick={() => setActiveTab("evidence")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-medium transition-all ${
            activeTab === "evidence"
              ? "bg-slate-800 text-pink-400 border border-slate-705 shadow-inner"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Calendar size={14} />
          年齡判定
        </button>
        <button
          onClick={() => setActiveTab("radar")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-medium transition-all ${
            activeTab === "radar"
              ? "bg-slate-800 text-pink-400 border border-slate-705 shadow-inner"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles size={14} />
          能力數值
        </button>
      </div>

      {activeTab === "features" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3.5 col-span-1">
              <h4 className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">
                Visual Specifications / 外觀規格
              </h4>
              <div className="space-y-2.5">
                {featureSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-start gap-3 transition-colors hover:bg-slate-800/20 ${spec.colorClass}`}
                  >
                    <div className="mt-1 flex-shrink-0">
                      {spec.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-mono">
                        {spec.label}
                      </span>
                      <span className="text-sm text-slate-100 font-sans font-medium mt-0.5">
                        {spec.value || "未檢出"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 col-span-1">
              <div className="p-4 bg-gradient-to-br from-indigo-950/40 to-slate-900/40 border border-indigo-500/25 rounded-2xl">
                <span className="text-[9px] text-indigo-300 font-mono uppercase tracking-wider block">
                  Character Class Prototype / 角設定位
                </span>
                <span className="text-lg font-bold font-display text-indigo-200 block mt-1">
                  {animeArchetype}
                </span>
                <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                  本角色在二次元體系中定位為典型【{animeArchetype}】，屬於【{estimatedAgeGroup}】時段的經典外觀屬性，是動漫插畫及輕小說人設中不可或缺的萌點靈魂。
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-pink-950/40 to-slate-900/40 border border-pink-500/20 rounded-2xl">
                <span className="text-[9px] text-pink-300 font-mono uppercase tracking-wider block">
                  Moé Attribute / 二次元性格
                </span>
                <span className="text-lg font-bold font-display text-pink-200 block mt-1">
                  {personalityVibe.primaryVibe}
                </span>
                <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                  {personalityVibe.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === "evidence" ? (
        <div className="space-y-4">
          <h4 className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">
            Deep Learning Vision Evidence / 深度視覺依據
          </h4>
          
          <div className="space-y-3">
            {visualEvidence.map((clue, idx) => (
              <div
                key={idx}
                className="relative p-4 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition-all flex gap-3 items-start"
              >
                <div className="p-1 px-2.5 rounded-lg bg-slate-800 text-xs font-mono font-black text-pink-400 flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-200 font-sans leading-relaxed pt-0.5">
                  {clue}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={abilityData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Character Ability"
                dataKey="A"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
}

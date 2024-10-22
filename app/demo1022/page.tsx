'use client';

// pages/simulation.js

import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';

type Protein = {
  name: string;
  protein: number;
  starch: number;
  lipid: number;
  color: string;
  shape: string;
};

type Enzyme = {
  name: string;
  protease: number;
  amylase: number;
  lipase: number;
  color: string;
  shape: string;
};

const proteinPastes = [
  {
    name: '塩切り大豆ペースト',
    protein: 10,
    starch: 5,
    lipid: 3,
    color: '#FFCC80',
    shape: 'circle',
  },
  {
    name: '塩切りひよこ豆ペースト',
    protein: 8,
    starch: 7,
    lipid: 2,
    color: '#FFF59D',
    shape: 'triangle',
  },
  {
    name: '塩切りそら豆ペースト',
    protein: 9,
    starch: 6,
    lipid: 4,
    color: '#A5D6A7',
    shape: 'square',
  },
  {
    name: '塩切りアボガドペースト',
    protein: 6,
    starch: 4,
    lipid: 5,
    color: '#80CBC4',
    shape: 'pentagon',
  },
];

const enzymes = [
  { name: '米麹', protease: 5, amylase: 7, lipase: 3, color: '#CE93D8', shape: 'hexagon' },
  { name: '麦麹', protease: 6, amylase: 5, lipase: 4, color: '#B39DDB', shape: 'octagon' },
  { name: '豆麹', protease: 7, amylase: 6, lipase: 5, color: '#9FA8DA', shape: 'star' },
];

export default function SimulationPage() {
  const [selectedProteins, setSelectedProteins] = useState<Protein[]>([]);
  const [selectedEnzymes, setSelectedEnzymes] = useState<Enzyme[]>([]);

  // 材料を追加
  const addProtein = (paste: Protein) => {
    setSelectedProteins([...selectedProteins, paste]);
  };

  const addEnzyme = (enzyme: Enzyme) => {
    setSelectedEnzymes([...selectedEnzymes, enzyme]);
  };

  // 材料を除外
  const removeProtein = (index: number) => {
    const newProteins = [...selectedProteins];
    newProteins.splice(index, 1);
    setSelectedProteins(newProteins);
  };

  const removeEnzyme = (index: number) => {
    const newEnzymes = [...selectedEnzymes];
    newEnzymes.splice(index, 1);
    setSelectedEnzymes(newEnzymes);
  };

  // 計算部分
  const totalProtein = selectedProteins.reduce((sum, item) => sum + item.protein, 0);
  const totalProtease = selectedEnzymes.reduce((sum, item) => sum + item.protease, 1); // 1で割り算エラーを防ぐ
  const maturationIndex = totalProtein / totalProtease;
  const maturationPeriod = Math.round(maturationIndex * 80);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold my-4">発酵のクラフトKITシミュレーション</h1>
      <div className="flex w-full max-w-6xl">
        {/* 左側のタンパク質ペースト群 */}
        <div className="w-1/4 p-4">
          <h2 className="font-semibold mb-2">タンパク質ペースト</h2>
          {proteinPastes.map((paste, index) => (
            <button
              key={index}
              className="my-2 w-20 h-20 flex items-center justify-center"
              style={{
                backgroundColor: paste.color,
                clipPath: getShapeClipPath(paste.shape),
              }}
              onClick={() => addProtein(paste)}
            >
              {paste.name}
            </button>
          ))}
        </div>

        {/* 中央のグラフィカルな融合物 */}
        <div className="w-2/4 flex flex-col items-center justify-center relative">
          <div className="flex flex-wrap justify-center">
            {selectedProteins.map((item, index) => (
              <div
                key={`protein-${index}`}
                className="w-8 h-8 m-1"
                style={{
                  backgroundColor: item.color,
                  clipPath: getShapeClipPath(item.shape),
                }}
                onClick={() => removeProtein(index)}
              />
            ))}
            {selectedEnzymes.map((item, index) => (
              <div
                key={`enzyme-${index}`}
                className="w-8 h-8 m-1"
                style={{
                  backgroundColor: item.color,
                  clipPath: getShapeClipPath(item.shape),
                }}
                onClick={() => removeEnzyme(index)}
              />
            ))}
          </div>
          {/* アニメーションや融合物の表示を追加できます */}
        </div>

        {/* 右側の酵素群 */}
        <div className="w-1/4 p-4">
          <h2 className="font-semibold mb-2">酵素</h2>
          {enzymes.map((enzyme, index) => (
            <button
              key={index}
              className="my-2 w-20 h-20 flex items-center justify-center"
              style={{
                backgroundColor: enzyme.color,
                clipPath: getShapeClipPath(enzyme.shape),
              }}
              onClick={() => addEnzyme(enzyme)}
            >
              {enzyme.name}
            </button>
          ))}
        </div>
      </div>

      {/* 下部のパラメータ表示 */}
      <div className="w-full max-w-4xl mt-8 p-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-4">結果パラメータ</h2>
        {selectedProteins.length > 0 && selectedEnzymes.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>タンパク質量: {totalProtein}</p>
              <p>でんぷん量: {selectedProteins.reduce((sum, item) => sum + item.starch, 0)}</p>
              <p>脂質量: {selectedProteins.reduce((sum, item) => sum + item.lipid, 0)}</p>
            </div>
            <div>
              <p>
                プロアテーゼ力価: {selectedEnzymes.reduce((sum, item) => sum + item.protease, 0)}
              </p>
              <p>アミラーゼ力価: {selectedEnzymes.reduce((sum, item) => sum + item.amylase, 0)}</p>
              <p>リパーゼ力価: {selectedEnzymes.reduce((sum, item) => sum + item.lipase, 0)}</p>
            </div>
            <div className="col-span-2">
              <p>熟成期間指数: {maturationIndex.toFixed(2)}</p>
              <p>熟成期間: 約{maturationPeriod}日</p>
            </div>
          </div>
        ) : (
          <p>左と右から材料を選択してください。</p>
        )}
      </div>
    </div>
  );
}

// オーガニックな形状を定義する関数
function getShapeClipPath(shape: string) {
  switch (shape) {
    case 'circle':
      return 'circle(50% at 50% 50%)';
    case 'triangle':
      return 'polygon(50% 0%, 0% 100%, 100% 100%)';
    case 'square':
      return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    case 'pentagon':
      return 'polygon(50% 0%, 95% 38%, 77% 95%, 23% 95%, 5% 38%)';
    case 'hexagon':
      return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
    case 'octagon':
      return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
    case 'star':
      return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    default:
      return 'circle(50% at 50% 50%)';
  }
}

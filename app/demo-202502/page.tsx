'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
// pages/simulation.js

import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';

type Miso = {
  name: string;
  // protein: number;
  // starch: number;
  // lipid: number;
  color: string;
  borderColor?: string;
  pointPosition: { left?: string; right?: string; top?: string; bottom?: string };
  cardPosition: { left?: string; right?: string; top?: string; bottom?: string };
  image: string;
  ingredients: Ingredient[];
  facts: Fact[];
};

type Ingredient = {
  name: string;
  image: string;
};

type Fact = {
  name: string;
  value: string;
};

const localMisos: Miso[] = [
  {
    name: '白味噌',
    color: '#FFAB91',
    borderColor: 'border-[#FFAB91]',
    pointPosition: { left: '21%', top: '68%' },
    cardPosition: { left: '0%', top: '40%' },
    image: './img/miso-shiro.png',
    ingredients: [
      {
        name: '塩切り大豆ペースト',
        image: './img/daizu.jpg',
      },
      {
        name: '米麹',
        image: './img/kome-koji.jpg',
      },
      {
        name: '米麹',
        image: './img/kome-koji.jpg',
      },
    ],
    facts: [
      {
        name: '麹歩合',
        value: '20',
      },
      {
        name: '塩分',
        value: '7%',
      },
      {
        name: '醸造期間',
        value: '5〜20日',
      },
    ],
  },
  {
    name: '麦味噌',
    color: '#FFCC80',
    borderColor: 'border-[#FFCC80]',
    pointPosition: { left: '34%', right: undefined, top: '70%' },
    cardPosition: { left: '30%', right: undefined, bottom: '0' },
    image: './img/miso-aka.png',
    ingredients: [
      {
        name: '塩切り大豆ペースト',
        image: './img/daizu.jpg',
      },
      {
        name: '麦麹',
        image: './img/mugi-koji.jpg',
      },
    ],
    facts: [
      {
        name: '麹歩合',
        value: '10',
      },
      {
        name: '塩分',
        value: '12.5%',
      },
      {
        name: '醸造期間',
        value: '3〜12ヶ月',
      },
    ],
  },
  {
    name: '信州味噌',
    color: '#FFE57F',
    borderColor: 'border-[#FFE57F]',
    pointPosition: { left: '56%', right: undefined, top: '60%' },
    cardPosition: { left: undefined, right: '10%', bottom: '30%' },
    image: './img/miso-shiro.png',
    ingredients: [
      {
        name: '塩切り大豆ペースト',
        image: './img/daizu.jpg',
      },
      {
        name: '塩切り大豆ペースト',
        image: './img/daizu.jpg',
      },
      {
        name: '米麹',
        image: './img/kome-koji.jpg',
      },
    ],
    facts: [
      {
        name: '麹歩合',
        value: '7',
      },
      {
        name: '塩分',
        value: '12.5%',
      },
      {
        name: '醸造期間',
        value: '2〜3ヶ月',
      },
    ],
  },
];

export default function SimulationPage() {
  const [selectedMiso, setSelectedMiso] = useState<Miso | null>(null);

  // 計算部分
  // const totalProtein = selectedProteins.reduce((sum, item) => sum + item.protein, 0);
  // const totalProtease = selectedEnzymes.reduce((sum, item) => sum + item.protease, 1); // 1で割り算エラーを防ぐ
  // const maturationIndex = totalProtein / totalProtease;
  // const maturationPeriod = Math.round(maturationIndex * 80);

  return (
    <div className="flex justify-center items-center max-w-screen-xl mx-auto min-h-screen bg-gray-100 p-8">
      {/* 日本地図のイラスト */}
      <div className="relative w-full max-w-screen-md aspect-square animate-fadein0">
        <h1 className="absolute left-0 top-0 text-3xl font-bold my-4">日本全国のご当地味噌</h1>
        <Image
          src="/img/japan-map.png"
          fill
          alt="日本地図"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative w-full h-full">
          {localMisos.map((miso, index) => (
            <div key={index}>
              {/* 点の描画 */}
              <div
                className={cn(
                  'absolute rounded-full w-[16px] h-[16px] translate-x-[-50%] translate-y-[-50%]',
                  selectedMiso && selectedMiso.name == miso.name ? 'scale-150 animate-pulse' : '',
                )}
                style={{
                  left: miso.pointPosition.left,
                  right: miso.pointPosition.right,
                  top: miso.pointPosition.top,
                  backgroundColor: miso.color,
                }}
                // onClick={() => addProtein(miso)}
              />
              {/* カード形式の表示 */}
              <div
                className={cn(
                  'absolute w-32 p-2 bg-white transform rounded shadow',
                  miso.borderColor,
                  selectedMiso && selectedMiso.name == miso.name
                    ? 'scale-110 border-4'
                    : 'border-2',
                )}
                style={{
                  left: miso.cardPosition.left,
                  right: miso.cardPosition.right,
                  top: miso.cardPosition.top,
                  bottom: miso.cardPosition.bottom,
                }}
                onClick={() => {
                  setSelectedMiso(selectedMiso && selectedMiso.name === miso.name ? null : miso);
                  console.log(miso.name);
                }}
              >
                <h3>{miso.name}</h3>
                <Image
                  src={miso.image}
                  width={80}
                  height={80}
                  alt={miso.name}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 下部のパラメータ表示 */}
      <div className="flex-1 bg-white rounded-lg shadow min-h-[768px]">
        {selectedMiso && (
          <div className="flex flex-col items-center h-full justify-between space-y-4 p-8">
            <h2 className="text-2xl text-center font-bold">「{selectedMiso.name}」</h2>
            <div className="w-full text-center">
              <h3 className="border-b-2 px-4 text-2xl my-4">特徴</h3>
              <dl className="px-4 w-full text-xl">
                {selectedMiso.facts.map((fact, index) => (
                  <div key={index} className="flex gap-x-[10%] flex-wrap justify-between my-3">
                    <dt className="w-[45%] text-right">{fact.name}</dt>
                    <dd className="w-[45%] text-left">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="w-full text-center">
              <h3 className="border-b-2 px-4 text-2xl my-4">hackohクラフトの構成</h3>
              <ul className="flex flex-wrap">
                {selectedMiso.ingredients.map((ingredient, index) => (
                  <li
                    key={`${ingredient.name}_${index}`}
                    className={cn(
                      'w-1/2',
                      // index === 0 && 'animate-fadein0',
                      // index === 1 && 'animate-fadein1',
                      // index === 2 && 'animate-fadein2',
                      // index === 3 && 'animate-fadein3',
                    )}
                  >
                    <div className="m-2 bg-gray-100 rounded-lg p-2 flex gap-2 flex-col items-center">
                      <Image src={ingredient.image} width={85} height={85} alt="" />
                      <p className="text-sm">{ingredient.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Button className="w-full">注文する</Button>
          </div>
        )}
      </div>
    </div>
  );
}

// オーガニックな形状を定義する関数
// function getShapeClipPath(shape: string) {
//   switch (shape) {
//     case 'circle':
//       return 'circle(50% at 50% 50%)';
//     case 'triangle':
//       return 'polygon(50% 0%, 0% 100%, 100% 100%)';
//     case 'square':
//       return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
//     case 'pentagon':
//       return 'polygon(50% 0%, 95% 38%, 77% 95%, 23% 95%, 5% 38%)';
//     case 'hexagon':
//       return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
//     case 'octagon':
//       return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
//     case 'star':
//       return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
//     default:
//       return 'circle(50% at 50% 50%)';
//   }
// }

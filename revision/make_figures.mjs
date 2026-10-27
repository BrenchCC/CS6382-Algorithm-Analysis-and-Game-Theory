import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(root, 'figures');
fs.mkdirSync(dir, { recursive: true });
const C = { blue: '#245b91', light: '#eaf2f9', teal: '#19766e', mint: '#e9f5f1', red: '#b94f3d', pale: '#fff1eb', gray: '#536274', ink: '#203247' };
const text = (x, y, value, size = 22, fill = C.ink, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${value}</text>`;
const line = (x1, y1, x2, y2, color = C.gray, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" ${extra}/>`;
const circle = (x, y, label, fill = C.light, r = 27) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${C.blue}" stroke-width="2"/>${text(x,y+7,label,21,C.ink,'text-anchor="middle"')}`;
const box = (x,y,w,h,label,fill=C.light) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${C.blue}" stroke-width="2"/>${text(x+w/2,y+h/2+7,label,22,C.ink,'text-anchor="middle"')}`;
function svg(name, title, desc, body, height = 350) {
  fs.writeFileSync(path.join(dir, `${name}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${height}" viewBox="0 0 960 ${height}" role="img" aria-labelledby="title desc"><title id="title">${title}</title><desc id="desc">${desc}</desc><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="${C.gray}"/></marker></defs><rect width="960" height="${height}" fill="white"/><g font-family="PingFang SC, Arial, sans-serif">${body}</g></svg>\n`);
}
svg('01-bounds', 'LP 松弛的界', '扩大可行域后，最大化最优值上升，最小化最优值下降。',
 box(20,30,250,72,'整数可行解')+box(385,30,250,72,'LP 可行解')+line(275,66,375,66,C.gray,'marker-end="url(#arrow)"')+text(705,74,'范围扩大',23)+
 text(60,165,'最大化',26,C.blue)+text(310,165,'ALG ≤ OPT ≤ OPT_LP',29)+text(60,235,'最小化',26,C.teal)+text(310,235,'OPT_LP ≤ OPT ≤ ALG',29)+text(60,302,'ALG 仍须是原问题中的可行整数解。',23));
svg('02-knapsack-region', '双资源背包的 LP 可行域', '取 delta 等于二分之一。整数最优点在坐标轴上，LP 最优点为三分之二、三分之二。',
 `<polygon points="130,335 130,95 290,175 370,335" fill="${C.light}" stroke="${C.blue}" stroke-width="3"/>`+
 line(130,335,450,335,C.gray,'marker-end="url(#arrow)"')+line(130,335,130,35,C.gray,'marker-end="url(#arrow)"')+
 text(456,343,'x₁')+text(105,32,'x₂')+text(108,365,'0')+text(365,365,'1')+text(90,102,'1')+
 `<circle cx="290" cy="175" r="8" fill="${C.red}"/>`+text(310,165,'(2/3, 2/3)',23,C.red)+text(170,288,'可行域',24,C.blue)+
 text(520,80,'δ = 1/2，A = B = 1',25)+text(520,140,'x₁ + x₂/2 ≤ 1',25)+text(520,190,'x₁/2 + x₂ ≤ 1',25)+text(520,255,'整数最优值：1',25,C.teal)+text(520,305,'LP 最优值：4/3',25,C.red)+text(520,355,'向下取整后：(0, 0)',24),400);
svg('03-perturbation','极点与双向扰动','线段中点可向两侧移动，因此不是极点；尖角无法成为可行域内两个不同点的中点。',
 `<polygon points="90,300 120,80 380,65 440,300" fill="${C.light}" stroke="${C.blue}" stroke-width="3"/>`+
 line(145,190,390,190,C.gray)+circle(170,190,'−',C.mint,19)+circle(270,190,'x',C.pale,22)+circle(370,190,'+',C.mint,19)+
 text(70,340,'x = [(x − ηd) + (x + ηd)] / 2',22)+text(490,100,'三个分数变量 → 三个未知量',25)+text(490,165,'两个资源等式 → 至多两个独立约束',22)+text(490,235,'存在非零方向 d',26,C.teal)+text(490,300,'足够小的 η 保持 0 ≤ xᵢ ± ηdᵢ ≤ 1',22),380);
svg('04-hyperedges','超边与阈值覆盖','两个超边共享顶点 b，选择 b 可以同时覆盖两条超边。',
 `<ellipse cx="300" cy="155" rx="245" ry="105" fill="${C.light}" stroke="${C.blue}" stroke-width="3"/><ellipse cx="635" cy="155" rx="245" ry="105" fill="${C.mint}" fill-opacity="0.75" stroke="${C.teal}" stroke-width="3"/>`+
 circle(150,155,'a')+circle(465,155,'b',C.pale)+circle(795,155,'d')+circle(300,210,'c')+circle(635,210,'e')+
 text(100,35,'e₁ = {a, b, c}',24,C.blue)+text(620,35,'e₂ = {b, d, e}',24,C.teal)+text(235,315,'选择 b：每条超边中至少有一个被选顶点。',24));
svg('05-gap-cover','完全 r 元超图的覆盖','取 n 等于五、r 等于三；若漏掉三个顶点，这三个点本身就是未覆盖超边。',
 [100,280,460,640,820].map((x,i)=>circle(x,110,String(i+1),i<2?C.mint:C.pale)).join('')+
 `<rect x="400" y="60" width="480" height="100" rx="45" fill="none" stroke="${C.red}" stroke-width="3" stroke-dasharray="8 6"/>`+
 text(65,205,'只选 2 个：漏下 {3, 4, 5}，存在未覆盖超边。',26,C.red)+text(65,270,'至少选 n − r + 1 = 3 个，最多漏下 r − 1 = 2 个。',25,C.teal));
svg('06-dominating-path','忽略费用的三顶点反例','路径两端费用一，中心费用 L；忽略费用会选中心，最优选择两端。',
 line(180,130,480,130)+line(480,130,780,130)+circle(180,130,'a')+circle(480,130,'b',C.pale)+circle(780,130,'c')+
 text(150,200,'费用 1',24)+text(440,200,'费用 L',24,C.red)+text(750,200,'费用 1',24)+text(90,285,'中心覆盖 3 点；两端各覆盖 2 点。ALG / OPT = L / 2。',25));
svg('07-prices','贪心支配集的价格分摊','四顶点路径的费用分别为二三二二。先选 c，新覆盖三个顶点，每个分摊三分之二，再选 a。',
 [180,380,580].map((x)=>line(x,100,x+200,100)).join('')+[180,380,580,780].map((x,i)=>circle(x,100,['a','b','c','d'][i],i===2?C.mint:C.light)).join('')+
 text(142,155,'cₐ = 2',22)+text(342,155,'c_b = 3',22)+text(542,155,'c_c = 2',22)+text(742,155,'c_d = 2',22)+
 box(70,205,820,65,'第 1 步选 c：b、c、d 各分摊 2/3',C.mint)+box(70,290,820,65,'第 2 步选 a：a 分摊 2；总价 2 + 3 × 2/3 = 4'),390);
svg('08-harmonic','调和数的分母变化','某闭邻域还剩四、三、二、一个顶点时，比较候选的单位费用界依次增大。',
 [4,3,2,1].map((s,i)=>{const x=65+i*225; return `<rect x="${x}" y="${260-160/s}" width="145" height="${160/s}" fill="${i===3?C.pale:C.light}" stroke="${C.blue}" stroke-width="2"/>`+text(x+72,305,`剩 ${s} 个`,23,C.ink,'text-anchor="middle"')+text(x+72,240-160/s,`cᵥ / ${s}`,24,C.blue,'text-anchor="middle"');}).join(''),350);
svg('09-euler','树边倍增与终端捷径','一棵三终端星形树每条边走两次，总费用六；终端距离环每条边费用二，总费用也为六。',
 line(200,175,80,65)+line(200,175,80,285)+line(200,175,350,175)+line(207,175,87,65,C.teal,'stroke-dasharray="7 5"')+line(207,175,87,285,C.teal,'stroke-dasharray="7 5"')+line(207,180,350,180,C.teal,'stroke-dasharray="7 5"')+
 circle(200,175,'s',C.mint)+circle(80,65,'r₁')+circle(80,285,'r₂')+circle(350,175,'r₃')+
 line(650,65,650,285)+line(650,65,850,175)+line(650,285,850,175)+circle(650,65,'r₁')+circle(650,285,'r₂')+circle(850,175,'r₃')+
 text(430,170,'捷径',24,C.teal)+line(420,195,550,195,C.gray,'marker-end="url(#arrow)"')+text(185,330,'2c(T*) = 6',23)+text(650,330,'距离环长 = 6',23),380);
svg('10-steiner-tight','Steiner 树紧例','三个终端与中心相连的边费用为一，终端间边费用为二减 epsilon。',
 line(300,190,110,70,C.teal)+line(300,190,110,310,C.teal)+line(300,190,480,190,C.teal)+line(110,70,110,310,C.gray,'stroke-dasharray="7 5"')+line(110,70,480,190,C.gray,'stroke-dasharray="7 5"')+line(110,310,480,190,C.gray,'stroke-dasharray="7 5"')+
 circle(300,190,'s',C.mint)+circle(110,70,'r₁')+circle(110,310,'r₂')+circle(480,190,'r₃')+
 text(175,110,'1',25,C.teal)+text(175,280,'1',25,C.teal)+text(385,175,'1',25,C.teal)+text(550,85,'实线：中心边，费用 1',25,C.teal)+text(550,150,'虚线：终端边，费用 2 − ε',23)+text(550,230,'最优：k 条中心边，费用 k',23)+text(550,295,'算法：(k − 1) 条终端边',23),380);
svg('11-rent-timeline','租买决策时间线','购买费用十，租金三四五一；前两日租，第三日买，不付第三日租金。',
 line(90,115,870,115,C.gray,'marker-end="url(#arrow)"')+[150,370,590,810].map((x,i)=>circle(x,115,String(i+1),i===2?C.pale:C.light)).join('')+
 text(105,60,'第 1 天',22)+text(325,60,'第 2 天',22)+text(545,60,'第 3 天',22)+text(765,60,'第 4 天',22)+
 text(105,185,'租 3',26)+text(325,185,'租 4',26)+text(545,185,'买 10',26,C.red)+text(765,185,'免费',26,C.teal)+
 text(95,245,'已付 R = 3',21)+text(315,245,'已付 R = 7',21)+text(535,245,'7 + 5 ≥ 10',21,C.red)+text(95,315,'ALG = 3 + 4 + 10 = 17；OPT = min{10, 13} = 10。',25));
svg('12-matching-slots','贪心与离线最优的容量使用','顶点 a 有两个槽位，b 有一个。贪心将前两个请求放到 a；最优把第一个请求放到 b。',
 text(75,40,'贪心 ALG = 2',27,C.blue)+text(545,40,'离线 OPT = 3',27,C.teal)+
 box(60,80,170,65,'a：u₁')+box(60,165,170,65,'a：u₂')+box(260,80,170,65,'b：空闲',C.pale)+text(80,290,'u₃ 只连 a → 拒绝',24,C.red)+
 box(530,80,170,65,'a：u₂',C.mint)+box(530,165,170,65,'a：u₃',C.mint)+box(730,80,170,65,'b：u₁',C.mint)+text(540,290,'把选择多的 u₁ 留给 b。',24,C.teal));

// Mermaid definitions remain editable as fenced blocks in Markdown.
const mermaidSource = fs.readFileSync(path.join(root, 'Mermaid_Source.md'), 'utf8');
const blocks = [...mermaidSource.matchAll(/## ([0-9a-z-]+)\n\n```mermaid\n([\s\S]*?)```/g)];
if (blocks.length !== 4) throw new Error('Expected four named Mermaid blocks.');
for (const [, name, source] of blocks) fs.writeFileSync(path.join(dir, name + '.mmd'), source);
console.log('Wrote 12 SVG figures and 4 Mermaid sources.');

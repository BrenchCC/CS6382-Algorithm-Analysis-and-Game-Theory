# 作业 1：第 1、2、6 题答案

学号：____________________　姓名：____________________

## 问题 1：有两种资源约束的背包问题

**(a)** 令 $x_i$ 表示是否选物品 $i$。整数规划：

```math
\begin{aligned}
\max\quad & \sum_{i=1}^{n} v_i x_i\\
\text{s.t.}\quad & \sum_{i=1}^{n} a_i x_i \le A,\\
& \sum_{i=1}^{n} b_i x_i \le B,\\
& x_i \in \{0,1\}\quad (i=1,\ldots,n).
\end{aligned}
```

LP 松弛：将 $x_i\in\{0,1\}$ 改为 $0\le x_i\le1$。整数可行域包含于 LP 可行域，故 $\mathrm{OPT}\le\mathrm{OPT}_{LP}$。

**(b)** 同时选两件会使两种资源用量均为 $1+\delta\gt1$；故任选一件最优，$\mathrm{OPT}=1$。

LP 两约束相加得 $(1+\delta)(x_1+x_2)\le2$；取等号时两约束都紧，唯一解为

```math
x_1^*=x_2^*=\frac{1}{1+\delta},\qquad
\mathrm{OPT}_{LP}=\frac{2}{1+\delta}.
```

两变量均为分数，向下取整得 $(0,0)$，价值 $0$。

**(c)** 若极点 $x$ 有至少三个分数坐标，则在其中三个坐标上，两个资源等式有非零解 $d$：

```math
\sum_i a_i d_i=\sum_i b_i d_i=0.
```

取足够小的 $\varepsilon\gt0$，$x\pm\varepsilon d$ 均可行且互异，$x$ 是其中点，与极点定义矛盾。故分数坐标至多两个。

**(d)** $S$ 可行（删去分数物品不增加资源消耗），$\{j\}$ 也可行（题设保证）。令 $F=\{i:0\lt x_i^*\lt1\}$，则 $|F|\le2$ 且 $v_i\le v_j$。故

```math
\begin{aligned}
\mathrm{OPT}&\le\mathrm{OPT}_{LP}
=v(S)+\sum_{i\in F}v_ix_i^*\\
&\le v(S)+2v_j
\le3\max\{v(S),v_j\}.
\end{aligned}
```

返回值至少为 $\mathrm{OPT}/3$。求最优极点、找 $j$、比较集合均为多项式时间。

## 问题 2：超图中的带权顶点覆盖

**(a)** 令 $x_v$ 表示是否选顶点 $v$。整数规划：

```math
\begin{aligned}
\min\quad & \sum_{v\in V}c_vx_v\\
\text{s.t.}\quad & \sum_{v\in e}x_v\ge1\quad(e\in\mathcal E),\\
& x_v\in\{0,1\}\quad(v\in V).
\end{aligned}
```

LP 松弛：将 $x_v\in\{0,1\}$ 改为 $0\le x_v\le1$。整数可行域包含于 LP 可行域，故 $\mathrm{OPT}_{LP}\le\mathrm{OPT}$。

**(b)** 若某超边 $e$ 与 $C$ 不相交，则每个 $x_v^*\lt1/r$，从而

```math
\sum_{v\in e}x_v^*\lt\frac{|e|}{r}\le1,
```

与 LP 约束 $\sum_{v\in e}x_v^*\ge1$ 矛盾。故 $C$ 是顶点覆盖。

**(c)** 对 $v\in C$，有 $1\le r x_v^*$，故

```math
\begin{aligned}
c(C)&=\sum_{v\in C}c_v
\le r\sum_{v\in C}c_vx_v^*\\
&\le r\mathrm{OPT}_{LP}
\le r\mathrm{OPT}.
\end{aligned}
```

超边显式列出；LP 求解和舍入均为多项式时间。因此是 $r$-近似算法。

**(d)** 覆盖至多漏掉 $r-1$ 个顶点，否则存在未覆盖的 $r$ 元超边；漏掉 $r-1$ 个可行。故

```math
\mathrm{OPT}=n-r+1.
```

令 $x_v=1/r$，LP 值为 $n/r$。将全部超边约束相加，每个顶点出现 $\binom{n-1}{r-1}$ 次，得

```math
\binom{n-1}{r-1}\sum_{v\in V}x_v
\ge\binom{n}{r},
\qquad
\sum_{v\in V}x_v\ge\frac nr.
```

于是

```math
\mathrm{OPT}_{LP}=\frac nr,
\qquad
\frac{\mathrm{OPT}}{\mathrm{OPT}_{LP}}
=\frac{r(n-r+1)}{n}\longrightarrow r
\quad(n\to\infty,\ r\text{ fixed}).
```

**不能**据此排除更好的算法：整数性间隙只是该 LP 的局限，并非算法困难性下界。

## 问题 6：带容量的在线匹配

**(a)** 贪心：$u_1\to a,\ u_2\to a$，拒绝 $u_3$，值为 $2$。最优：$u_1\to b,\ u_2\to a,\ u_3\to a$，值为 $3$。

**(b)** 每个 $v$ 设计数器 $q_v=0$。到达 $u$ 时扫描 $N(u)$：若有 $q_v\lt b_v$，分配给 $v$ 并令 $q_v\leftarrow q_v+1$；否则拒绝。共检查至多 $\sum_u|N(u)|$ 个邻居，计数器与容量比较的位数不超过输入长度，故为多项式时间；无需复制顶点。

**(c)** 若 $u\in O\setminus A$，它曾被贪心拒绝，故当时全部邻居已满；容量不释放，所以最优解给 $u$ 的顶点必在 $S$。按容量计数，

```math
|O\setminus A|\le\sum_{v\in S}b_v\le|A|.
```

后一不等式因贪心在每个 $v\in S$ 上恰好分配 $b_v$ 次。

**(d)** 由 (c) 得

```math
\begin{aligned}
\mathrm{OPT}=|O|&=|O\cap A|+|O\setminus A|\\
&\le|A|+|A|=2\mathrm{ALG}.
\end{aligned}
```

故贪心是 $1/2$-竞争的。

**(e)** 令 $b_a=b_b=1$，$N(u_1)=\{a,b\}$。若算法拒绝 $u_1$，立即结束：$\mathrm{ALG}=0,\ \mathrm{OPT}=1$。若将 $u_1$ 分配给 $v\in\{a,b\}$，再令 $N(u_2)=\{v\}$：算法只能得 $1$，最优解将 $u_1$ 分配给另一顶点、$u_2$ 给 $v$，可得 $2$。故任何确定性算法的竞争比均不能严格大于 $1/2$。

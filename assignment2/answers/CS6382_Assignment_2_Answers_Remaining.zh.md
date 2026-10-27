# 作业 2：第 3、4、5 题答案

学号：____________________　姓名：____________________

## 问题 3：带权支配集

**(a)** 取三点路径 $a-b-c$，设 $c_a=c_c=1$，$c_b=L\gt 2$。顶点 $b$ 能支配全部 3 个点，两端各只能支配 2 个点。忽略费用的算法因此选 $b$，花费 $L$；最优解选 $a,c$，花费 2。近似比为 $L/2$，可任意大。

**(b)** 每一步选中 $v$ 时，设新支配的点集为 $Q=N[v]\cap U$。该步分配的总价格为

```math
\sum_{u\in Q}p_u=|Q|\frac{c_v}{|Q|}=c_v.
```

各步新支配的点集互不相交，且并集为 $V$。选中的顶点不会再次被选中，故将各步等式相加，得到 $\sum_{u\in V}p_u=c(D)$。

**(c)** 固定 $v$，设 $s=|N[v]|$。在 $u_j$ 被支配的那一步开始时，$u_j,\ldots,u_s$ 都在 $U$ 中。因此 $|N[v]\cap U|\ge s-j+1$，且 $v$ 是可选顶点。设该步选中 $w$。由贪心规则，

```math
\begin{aligned}
p_{u_j}&=\frac{c_w}{|N[w]\cap U|}\\
&\le\frac{c_v}{|N[v]\cap U|}\\
&\le\frac{c_v}{s-j+1}.
\end{aligned}
```

同一步被支配的点可以任意排序；上述不等式仍成立。逐项求和，

```math
\sum_{u\in N[v]}p_u
\le c_v\sum_{j=1}^{s}\frac1{s-j+1}
=H_sc_v.
```

**(d)** 令 $D^*$ 为最优支配集。其闭邻域覆盖 $V$。价格均为正，且 $|N[v]|\le\Delta+1$，由 (b)、(c) 得

```math
\begin{aligned}
c(D)&=\sum_{u\in V}p_u\\
&\le\sum_{v\in D^*}\sum_{u\in N[v]}p_u\\
&\le\sum_{v\in D^*}H_{|N[v]|}c_v\\
&\le H_{\Delta+1}\,\mathrm{OPT}.
\end{aligned}
```

当 $U$ 非空时，任取 $u\in U$，都有 $|N[u]\cap U|\ge1$，故算法总能继续。每步至少删去一个点，最多运行 $|V|$ 步。每步扫描各顶点的闭邻域并比较有理数，时间为多项式。

## 问题 4：通过终端 MST 构造 Steiner 树

**(a)** 从 $u$ 到 $v$、再从 $v$ 到 $w$ 的路径给出

```math
d(u,w)\le d(u,v)+d(v,w).
```

从每个终端求最短路后，构造终端距离图并求 MST；最后展开最短路，求其并集的生成树。这些操作均为多项式时间。

**(b)** $M$ 连通全部终端，故展开后的路径并集也连通全部终端。其生成树 $A$ 是可行的 Steiner 树。并集中的共享边只计一次，取生成树也不会增加费用，所以

```math
c(A)\le c(\text{路径并集})
\le\sum_{uv\in M}d(u,v)=d(M).
```

**(c)** 将最优树 $T^*$ 的每条边复制一次。所得多重图有一条费用为 $2c(T^*)$ 的 Euler 回路。从一个终端出发，按首次遇到的顺序记终端为 $r_1,\ldots,r_k$。这些访问位置把回路分成 $k$ 段；每段费用不小于对应终端间的最短路距离。对 $k\ge3$，

```math
\sum_{i=1}^{k}d(r_i,r_{i+1})\le2c(T^*),
\qquad r_{k+1}=r_1.
```

**(d)** 记该终端环费用为 $L$。最贵边至少花费 $L/k$。删去这条边后，剩余路径 $P$ 是终端距离图的生成树。由 MST 的最优性，

```math
\begin{aligned}
c(A)&\le d(M)\le d(P)\\
&\le\left(1-\frac1k\right)L\\
&\le2\left(1-\frac1k\right)c(T^*).
\end{aligned}
```

若 $k=2$，算法返回两终端间的最短路，费用为 $d(u,v)$。任何可行树都含一条 $u$ 到 $v$ 的路径，费用至少为 $d(u,v)$。因此算法在此情形下精确最优。

**(e)** 全部 $k$ 条中心边组成一棵费用为 $k$ 的星形树。若可行树不含 $s$，它的费用为 $(k-1)(2-\varepsilon)\gt k$。若含 $s$，设其中有 $t$ 条中心边，则其余 $k-t$ 条是终端边，费用为

```math
t+(k-t)(2-\varepsilon)
=k+(k-t)(1-\varepsilon)\ge k.
```

因此 $\mathrm{OPT}=k$。两终端间的直接边费用为 $2-\varepsilon\lt 2$；经过 $s$ 需花费 2，绕经其他终端则至少用两条边，都更贵。故终端 MST 使用 $k-1$ 条直接边。算法费用为 $(k-1)(2-\varepsilon)$，于是

```math
\frac{c(A)}{\mathrm{OPT}}
=\frac{(k-1)(2-\varepsilon)}k
\longrightarrow2\left(1-\frac1k\right)
\quad(\varepsilon\downarrow0).
```

## 问题 5：租金变化时的租或买

**(a)** 一直租用需支付 $\sum_{t=1}^{T}r_t$。若决定购买，第一天购买的费用为 $B$；任何更晚购买的方案还要支付此前租金。因此

```math
\mathrm{OPT}=\min\left\{B,\sum_{t=1}^{T}r_t\right\}.
```

**(b)** 第 1、2 天租用，累计支付 3、7。第 3 天有 $7+5\ge10$，因此当天购买；第 4 天不再付费。于是 $\mathrm{ALG}=3+4+10=17$，$\mathrm{OPT}=\min\{10,3+4+5+1\}=10$。

另一规则没有有限竞争比：取 $B=1,T=1,r_1=K\gt 1$。它在第一天租用，支付 $K$；最优方案第一天购买，只支付 1。比值 $K$ 可任意大。

**(c)** 初始 $R=0\lt B$。算法只在 $R+r_t\lt B$ 时租用，因此更新后的 $R$ 仍小于 $B$。若始终不买，全部租金为 $R\lt B$，故 $\mathrm{ALG}=R=\mathrm{OPT}$。

若在第 $\tau$ 天购买，则 $R+r_\tau\ge B$。完整输入的租金总和至少为 $B$，所以 $\mathrm{OPT}=B$；算法在购买当天不付租金，故 $\mathrm{ALG}=R+B\lt 2B=2\mathrm{OPT}$。这证明算法是 2-竞争的。

**(d)** 若每天 $r_t=B/M$，算法先租 $M-1$ 天，并在第 $M$ 天仍有需求时买入。若 $T\lt M$，双方费用都是 $TB/M$；若 $T\ge M$，

```math
\mathrm{ALG}=\frac{M-1}{M}B+B,
\qquad\mathrm{OPT}=B,
\qquad\frac{\mathrm{ALG}}{\mathrm{OPT}}=2-\frac1M.
```

所以固定 $M$ 时，最坏比值恰为 $2-1/M$。令 $M$ 增大，比值趋近 2；结合 (c) 的上界，完整问题的精确竞争比为 2。

**(e)** 固定任意确定性算法，持续提供每天租金均为 $B/M$ 的输入，记其首次购买日为 $\tau$。

- 若 $\tau\le M$，令输入在第 $\tau$ 天结束。此时 $\mathrm{OPT}=\tau B/M$，而 $\mathrm{ALG}=B+(\tau-1)B/M$，故

  ```math
  \frac{\mathrm{ALG}}{\mathrm{OPT}}
  =1+\frac{M-1}{\tau}\ge2-\frac1M.
  ```

- 若 $\tau\gt M$，仍在第 $\tau$ 天结束。此时 $\mathrm{OPT}=B$，故 $\mathrm{ALG}/\mathrm{OPT}=1+(\tau-1)/M\ge2$。
- 若算法永不购买，取 $T=2M$，则 $\mathrm{ALG}/\mathrm{OPT}=2B/B=2$。

截至所选结束日，算法看到的输入与持续供给的序列相同，故三个分支都有效。任意确定性算法的竞争比至少为 $2-1/M$；令 $M\to\infty$，得到下界 2。

# 作业 2：作业 1 剩余第 3、4、5 题答案

学号：____________________　姓名：____________________

## 问题 3：带权支配集

**(a)** 取三点路径 $a-b-c$，令 $c_a=c_c=1$，$c_b=L\gt 2$。忽略费用时，$b$ 一次支配 3 个点，两端各只能支配 2 个点，故算法选 $b$，费用为 $L$。最优解选 $a,c$，费用为 2。比值 $L/2$ 随 $L$ 增大而无界。

**(b)** 每一步选中 $v$ 时，设新支配的点集为 $Q=N[v]\cap U$。该步分配的总价格为

```math
\sum_{u\in Q}p_u=|Q|\frac{c_v}{|Q|}=c_v.
```

各步的 $Q$ 互不相交，最终覆盖 $V$；每个选中的顶点只付费一次。因此 $\sum_{u\in V}p_u=c(D)$。

**(c)** 固定 $v$，设 $s=|N[v]|$。在 $u_j$ 被支配的那一步开始时，$u_j,\ldots,u_s$ 都还未被支配，所以 $|N[v]\cap U|\ge s-j+1$。设该步实际选中 $w$。由贪心选择，

```math
p_{u_j}=\frac{c_w}{|N[w]\cap U|}
\le\frac{c_v}{|N[v]\cap U|}
\le\frac{c_v}{s-j+1}.
```

同一步被支配的点任意排序也成立。求和得

```math
\sum_{u\in N[v]}p_u
\le c_v\sum_{j=1}^{s}\frac1{s-j+1}
=H_sc_v.
```

**(d)** 令 $D^*$ 为最优支配集。其闭邻域覆盖 $V$，且价格非负、$|N[v]|\le\Delta+1$，故

```math
\begin{aligned}
c(D)&=\sum_{u\in V}p_u
\le\sum_{v\in D^*}\sum_{u\in N[v]}p_u\\
&\le\sum_{v\in D^*}H_{|N[v]|}c_v
\le H_{\Delta+1}\,\mathrm{OPT}.
\end{aligned}
```

当 $U$ 非空时，任取 $u\in U$，顶点 $u$ 的分母至少为 1；每步至少删去一个点，所以最多 $|V|$ 步。每步扫描顶点及邻域并比较有理数即可，运行时间为多项式。

## 问题 4：通过终端 MST 构造 Steiner 树

**(a)** 从 $u$ 到 $v$、再从 $v$ 到 $w$ 的路径给出

```math
d(u,w)\le d(u,v)+d(v,w).
```

从每个终端求最短路，再构造终端距离图、求 MST、展开对应路径并求并集的生成树，均可在多项式时间内完成。

**(b)** MST 连通所有终端，所以展开后的路径并集也连通所有终端；它的生成树 $A$ 是可行的 Steiner 树。共享边在并集中只计一次，删边也不增费用，故

```math
c(A)\le c(\text{路径并集})
\le\sum_{uv\in M}d(u,v)=d(M).
```

**(c)** 将最优树 $T^*$ 的每条边复制一次，得到费用为 $2c(T^*)$ 的 Euler 回路。从一个终端出发，按首次遇到的顺序记终端为 $r_1,\ldots,r_k$。回路被相邻终端的访问位置分成 $k$ 段，每段的费用至少为对应的最短路距离。因此，对 $k\ge3$，

```math
\sum_{i=1}^{k}d(r_i,r_{i+1})\le2c(T^*),
\qquad r_{k+1}=r_1.
```

**(d)** 记上述终端环费用为 $L$。最贵边费用至少为 $L/k$；删去它所得路径 $P$ 是终端距离图的生成树。由 MST 的最优性，

```math
c(A)\le d(M)\le d(P)
\le\left(1-\frac1k\right)L
\le2\left(1-\frac1k\right)c(T^*).
```

若 $k=2$，算法直接返回两终端间的最短路，费用为 $d(u,v)$；任何可行树都含一条 $u$ 到 $v$ 的路径，费用至少为 $d(u,v)$。故此时算法精确最优。

**(e)** 星形树使用全部 $k$ 条中心边，费用为 $k$。若可行树不含 $s$，其费用为 $(k-1)(2-\varepsilon)\gt k$。若含 $s$ 且使用 $t$ 条中心边，则其余 $k-t$ 条为终端边，费用为

```math
t+(k-t)(2-\varepsilon)
=k+(k-t)(1-\varepsilon)\ge k.
```

因此 $\mathrm{OPT}=k$。任意两终端的直接边费用 $2-\varepsilon\lt 2$，比经过 $s$ 的路径短，所以终端 MST 使用 $k-1$ 条直接边，算法费用为 $(k-1)(2-\varepsilon)$。于是

```math
\frac{c(A)}{\mathrm{OPT}}
=\frac{(k-1)(2-\varepsilon)}k
\longrightarrow2\left(1-\frac1k\right)
\quad(\varepsilon\downarrow0).
```

## 问题 5：租金变化时的租或买

**(a)** 从不买的费用是 $\sum_{t=1}^{T}r_t$。若要买，第一天买只需 $B$；延后购买还要多付此前租金，不会更便宜。故

```math
\mathrm{OPT}=\min\left\{B,\sum_{t=1}^{T}r_t\right\}.
```

**(b)** 第 1、2 天分别租用，已付租金依次为 3、7；第 3 天因 $7+5\ge10$ 而买入，第 4 天免费。因此 $\mathrm{ALG}=3+4+10=17$，$\mathrm{OPT}=\min\{10,3+4+5+1\}=10$。对另一规则，取 $B=1,T=1,r_1=K\gt 1$：它先租，费用为 $K$，而最优费用为 1。令 $K$ 任意增大，竞争比无界。

**(c)** 初始 $R=0\lt B$；只有在 $R+r_t\lt B$ 时才租，故每次更新后仍有 $R\lt B$。若始终不买，则总租金 $R\lt B$，所以 $\mathrm{ALG}=R=\mathrm{OPT}$。若在第 $\tau$ 天买，$R+r_\tau\ge B$，故全程租金至少为 $B$，于是 $\mathrm{OPT}=B$；而 $\mathrm{ALG}=R+B\lt 2B=2\mathrm{OPT}$。因此算法是 2-竞争的。

**(d)** 若每天 $r_t=B/M$，算法先租 $M-1$ 天，并在第 $M$ 天仍有需求时买入。若 $T\lt M$，双方费用都是 $TB/M$；若 $T\ge M$，

```math
\mathrm{ALG}=\frac{M-1}{M}B+B,
\qquad\mathrm{OPT}=B,
\qquad\frac{\mathrm{ALG}}{\mathrm{OPT}}=2-\frac1M.
```

所以该实例族的精确竞争比是 $2-1/M$。令 $M$ 增大，此比值趋近 2；结合 (c) 的统一上界，完整问题的精确竞争比为 2。

**(e)** 固定任意确定性算法，在每天租金均为 $B/M$ 的无限序列上观察它首次购买的日期 $\tau$。

- 若 $\tau\le M$，令输入在第 $\tau$ 天结束。此时 $\mathrm{OPT}=\tau B/M$，而 $\mathrm{ALG}=B+(\tau-1)B/M$，故

  ```math
  \frac{\mathrm{ALG}}{\mathrm{OPT}}
  =1+\frac{M-1}{\tau}\ge2-\frac1M.
  ```

- 若 $\tau\gt M$，仍在第 $\tau$ 天结束。此时 $\mathrm{OPT}=B$，故 $\mathrm{ALG}/\mathrm{OPT}=1+(\tau-1)/M\ge2$。
- 若算法永不购买，取 $T=2M$，则 $\mathrm{ALG}/\mathrm{OPT}=2B/B=2$。

这些输入与算法在结束日之前看到的前缀相同。故任意确定性算法的竞争比至少为 $2-1/M$；令 $M\to\infty$，得到下界 2。

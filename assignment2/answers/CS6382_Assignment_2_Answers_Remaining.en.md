# Assignment 2: Answers to Questions 3, 4, and 5

Student No.: ____________________　Student Name: ____________________

## Question 3: Weighted dominating set

**(a)** Use the path $a-b-c$. Set $c_a=c_c=1$ and $c_b=L\gt 2$. Vertex $b$ dominates all 3 vertices. Each end dominates only 2. The cost-blind rule picks $b$ and pays $L$. The optimum picks $a,c$ and pays 2. The ratio $L/2$ can be arbitrarily large.

**(b)** When the algorithm picks $v$, let $Q=N[v]\cap U$. These are the new vertices it dominates. Their prices sum to

```math
\sum_{u\in Q}p_u=|Q|\frac{c_v}{|Q|}=c_v.
```

The sets $Q$ from all steps partition $V$. A picked vertex cannot be picked again. Adding the equalities over all steps gives $\sum_{u\in V}p_u=c(D)$.

**(c)** Fix $v$ and let $s=|N[v]|$. At the start of the step that covers $u_j$, the vertices $u_j,\ldots,u_s$ are still in $U$. Thus $|N[v]\cap U|\ge s-j+1$, and $v$ is a valid choice. Suppose the algorithm picks $w$. By the greedy rule,

```math
\begin{aligned}
p_{u_j}&=\frac{c_w}{|N[w]\cap U|}\\
&\le\frac{c_v}{|N[v]\cap U|}\\
&\le\frac{c_v}{s-j+1}.
\end{aligned}
```

The bound still holds if several vertices are covered in the same step. Sum over $j$ to get

```math
\sum_{u\in N[v]}p_u
\le c_v\sum_{j=1}^{s}\frac1{s-j+1}
=H_sc_v.
```

**(d)** Let $D^*$ be an optimal dominating set. Its closed neighborhoods cover $V$. Also, prices are positive and $|N[v]|\le\Delta+1$. By (b) and (c),

```math
\begin{aligned}
c(D)&=\sum_{u\in V}p_u\\
&\le\sum_{v\in D^*}\sum_{u\in N[v]}p_u\\
&\le\sum_{v\in D^*}H_{|N[v]|}c_v\\
&\le H_{\Delta+1}\,\mathrm{OPT}.
\end{aligned}
```

If $U$ is nonempty, choose any $u\in U$. Then $|N[u]\cap U|\ge1$, so the algorithm can continue. Each step removes at least one vertex. There are at most $|V|$ steps. In each step, scan the closed neighborhoods and compare rational ratios. This takes polynomial time.

## Question 4: Steiner tree through a terminal MST

**(a)** A shortest $u$–$v$ path followed by a shortest $v$–$w$ path is a walk from $u$ to $w$. Hence

```math
d(u,w)\le d(u,v)+d(v,w).
```

Find shortest paths from each terminal. Then build the terminal distance graph and find its MST. Expand the MST edges into paths and find a spanning tree of their union. Each step takes polynomial time.

**(b)** The MST connects all terminals. Its expanded paths also connect them. Thus a spanning tree $A$ of their union is a feasible Steiner tree. A shared edge is counted once in the union. Taking a spanning tree cannot add cost. Hence

```math
c(A)\le c(\text{path union})
\le\sum_{uv\in M}d(u,v)=d(M).
```

**(c)** Double every edge of an optimal tree $T^*$. The new multigraph has an Euler tour of cost $2c(T^*)$. Start at a terminal. List the terminals $r_1,\ldots,r_k$ in order of first visit. These visits divide the tour into $k$ segments. Each segment costs at least the shortest-path distance between its endpoints. Thus, for $k\ge3$,

```math
\sum_{i=1}^{k}d(r_i,r_{i+1})\le2c(T^*),
\qquad r_{k+1}=r_1.
```

**(d)** Let $L$ be the cost of this terminal cycle. Its largest edge costs at least $L/k$. Remove it. The remaining path $P$ spans the terminal distance graph. Since $M$ is an MST,

```math
\begin{aligned}
c(A)&\le d(M)\le d(P)\\
&\le\left(1-\frac1k\right)L\\
&\le2\left(1-\frac1k\right)c(T^*).
\end{aligned}
```

For $k=2$, the algorithm returns a shortest $u$–$v$ path of cost $d(u,v)$. Every feasible tree contains a $u$–$v$ path and costs at least $d(u,v)$. So the algorithm is exact.

**(e)** The star using all $k$ edges from $s$ costs $k$. A tree without $s$ costs $(k-1)(2-\varepsilon)\gt k$. Now take a tree with $s$. If it uses $t$ edges from $s$, its other $k-t$ edges join terminals. Its cost is

```math
t+(k-t)(2-\varepsilon)
=k+(k-t)(1-\varepsilon)\ge k.
```

Thus $\mathrm{OPT}=k$. A direct terminal edge costs $2-\varepsilon\lt 2$. A path through $s$ costs 2; a detour through other terminals uses at least two edges. Both cost more. The terminal MST uses $k-1$ direct edges. The algorithm costs $(k-1)(2-\varepsilon)$. Hence

```math
\frac{c(A)}{\mathrm{OPT}}
=\frac{(k-1)(2-\varepsilon)}k
\longrightarrow2\left(1-\frac1k\right)
\quad(\varepsilon\downarrow0).
```

## Question 5: Rent-or-buy with changing rental prices

**(a)** Renting on every day costs $\sum_{t=1}^{T}r_t$. Buying on day 1 costs $B$. Buying later also pays the earlier rents, so it cannot cost less. Hence

```math
\mathrm{OPT}=\min\left\{B,\sum_{t=1}^{T}r_t\right\}.
```

**(b)** Rent on days 1 and 2. The total rent paid is 7. On day 3, $7+5\ge10$, so buy for 10. Day 4 is free. Thus $\mathrm{ALG}=3+4+10=17$ and $\mathrm{OPT}=\min\{10,3+4+5+1\}=10$.

The other rule has no finite ratio. Take $B=1,T=1,r_1=K\gt 1$. It rents on day 1 and pays $K$. OPT buys on day 1 and pays 1. The ratio is $K$, which can be arbitrarily large.

**(c)** At first, $R=0\lt B$. The algorithm rents only if $R+r_t\lt B$. Thus $R\lt B$ after each rental. If it never buys, all rents sum to $R\lt B$, so $\mathrm{ALG}=R=\mathrm{OPT}$.

If it buys on day $\tau$, then $R+r_\tau\ge B$. The total rent for the whole input is at least $B$, so $\mathrm{OPT}=B$. The algorithm does not pay rent on the buying day. Hence $\mathrm{ALG}=R+B\lt 2B=2\mathrm{OPT}$. It is 2-competitive.

**(d)** Let $r_t=B/M$ every day. The algorithm rents on days 1 to $M-1$. If day $M$ occurs, it buys then. For $T\lt M$, both costs are $TB/M$. For $T\ge M$,

```math
\mathrm{ALG}=\frac{M-1}{M}B+B,
\qquad\mathrm{OPT}=B,
\qquad\frac{\mathrm{ALG}}{\mathrm{OPT}}=2-\frac1M.
```

So the worst ratio for this fixed $M$ is $2-1/M$. It tends to 2 as $M$ grows. Part (c) gives the matching upper bound for the full problem.

**(e)** Fix any deterministic algorithm. Keep giving it days with rent $B/M$. Let $\tau$ be its first buying day.

- If $\tau\le M$, stop on day $\tau$. Then $\mathrm{OPT}=\tau B/M$ and $\mathrm{ALG}=B+(\tau-1)B/M$. Thus

  ```math
  \frac{\mathrm{ALG}}{\mathrm{OPT}}
  =1+\frac{M-1}{\tau}\ge2-\frac1M.
  ```

- If $\tau\gt M$, stop on day $\tau$. Then $\mathrm{OPT}=B$ and $\mathrm{ALG}/\mathrm{OPT}=1+(\tau-1)/M\ge2$.
- If it never buys, stop on day $2M$. Then $\mathrm{ALG}/\mathrm{OPT}=2B/B=2$.

Up to and including the chosen stopping day, the algorithm sees the same input. Thus every deterministic algorithm has ratio at least $2-1/M$. Letting $M\to\infty$ gives the lower bound 2.

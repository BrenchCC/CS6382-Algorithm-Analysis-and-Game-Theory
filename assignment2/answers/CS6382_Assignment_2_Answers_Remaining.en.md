# Assignment 2 — Solutions to the Remaining Questions 3, 4, and 5 of Assignment 1

Student No.: ____________________　Student Name: ____________________

## Question 3: Weighted dominating set

**(a)** Take the path $a-b-c$ with $c_a=c_c=1$ and $c_b=L\gt 2$. Ignoring costs, the heuristic chooses $b$, which dominates all three vertices, at cost $L$. The optimum chooses $a,c$ at cost 2. The ratio $L/2$ is unbounded.

**(b)** When $v$ is selected, let $Q=N[v]\cap U$ be the newly dominated vertices. The prices assigned in this step sum to

```math
\sum_{u\in Q}p_u=|Q|\frac{c_v}{|Q|}=c_v.
```

The sets $Q$ from different steps partition $V$, and each selected vertex is charged once. Hence $\sum_{u\in V}p_u=c(D)$.

**(c)** Fix $v$ and let $s=|N[v]|$. At the start of the step that dominates $u_j$, all of $u_j,\ldots,u_s$ are still undominated. Thus $|N[v]\cap U|\ge s-j+1$. If the algorithm selects $w$ in that step, its greedy choice gives

```math
p_{u_j}=\frac{c_w}{|N[w]\cap U|}
\le\frac{c_v}{|N[v]\cap U|}
\le\frac{c_v}{s-j+1}.
```

This also holds for any order among vertices dominated simultaneously. Summing yields

```math
\sum_{u\in N[v]}p_u
\le c_v\sum_{j=1}^{s}\frac1{s-j+1}
=H_sc_v.
```

**(d)** Let $D^*$ be an optimal dominating set. Its closed neighborhoods cover $V$. Since prices are nonnegative and $|N[v]|\le\Delta+1$,

```math
\begin{aligned}
c(D)&=\sum_{u\in V}p_u
\le\sum_{v\in D^*}\sum_{u\in N[v]}p_u\\
&\le\sum_{v\in D^*}H_{|N[v]|}c_v
\le H_{\Delta+1}\,\mathrm{OPT}.
\end{aligned}
```

If $U$ is nonempty, any $u\in U$ has $|N[u]\cap U|\ge1$, so a candidate exists. Each step removes at least one vertex; there are at most $|V|$ steps. Scanning vertices and neighborhoods and comparing rational ratios in each step takes polynomial time.

## Question 4: Steiner tree through a terminal MST

**(a)** Concatenating a shortest $u$–$v$ path and a shortest $v$–$w$ path gives

```math
d(u,w)\le d(u,v)+d(v,w).
```

Compute shortest paths from each terminal, form the terminal distance graph, compute its MST, expand its edges into paths, and find a spanning tree of their union. Every step takes polynomial time.

**(b)** Expanding the MST connects all terminals; a spanning tree $A$ of the path union is therefore a feasible Steiner tree. Shared edges are counted only once in the union, and deleting edges cannot increase cost. Thus

```math
c(A)\le c(\text{path union})
\le\sum_{uv\in M}d(u,v)=d(M).
```

**(c)** Double every edge of an optimal tree $T^*$. The resulting Euler tour has cost $2c(T^*)$. Starting at a terminal, list the terminals $r_1,\ldots,r_k$ in order of first visit. The tour splits into $k$ segments between consecutive listed terminals; each segment costs at least the corresponding shortest-path distance. For $k\ge3$,

```math
\sum_{i=1}^{k}d(r_i,r_{i+1})\le2c(T^*),
\qquad r_{k+1}=r_1.
```

**(d)** Let $L$ be the cost of this terminal cycle. Its most expensive edge costs at least $L/k$. Deleting that edge leaves a spanning path $P$ in the terminal distance graph. By optimality of the MST,

```math
c(A)\le d(M)\le d(P)
\le\left(1-\frac1k\right)L
\le2\left(1-\frac1k\right)c(T^*).
```

For $k=2$, the algorithm returns a shortest path between the terminals, costing $d(u,v)$. Every feasible tree contains a $u$–$v$ path and costs at least $d(u,v)$. Thus the algorithm is exact.

**(e)** The star using all $k$ edges incident to $s$ costs $k$. A tree avoiding $s$ costs $(k-1)(2-\varepsilon)\gt k$. A tree containing $s$ and using $t$ edges incident to it uses $k-t$ terminal edges and costs

```math
t+(k-t)(2-\varepsilon)
=k+(k-t)(1-\varepsilon)\ge k.
```

Hence $\mathrm{OPT}=k$. Each direct terminal edge costs $2-\varepsilon\lt 2$, less than a path through $s$, so the terminal MST uses $k-1$ direct edges. Its expansion costs $(k-1)(2-\varepsilon)$. Therefore

```math
\frac{c(A)}{\mathrm{OPT}}
=\frac{(k-1)(2-\varepsilon)}k
\longrightarrow2\left(1-\frac1k\right)
\quad(\varepsilon\downarrow0).
```

## Question 5: Rent-or-buy with changing rental prices

**(a)** Renting throughout costs $\sum_{t=1}^{T}r_t$. If buying is chosen, buying on day 1 costs $B$; buying later adds earlier rental payments. Hence

```math
\mathrm{OPT}=\min\left\{B,\sum_{t=1}^{T}r_t\right\}.
```

**(b)** Rent on days 1 and 2, paying 3 and 4. On day 3, $7+5\ge10$, so buy for 10. Day 4 is free. Thus $\mathrm{ALG}=17$ and $\mathrm{OPT}=\min\{10,3+4+5+1\}=10$. For the other rule, take $B=1,T=1,r_1=K\gt 1$. It rents for $K$, while OPT buys for 1. The ratio $K$ is unbounded.

**(c)** Initially $R=0\lt B$, and renting occurs only when $R+r_t\lt B$. Thus $R\lt B$ before any purchase. If the algorithm never buys, the total rent $R\lt B$ and $\mathrm{ALG}=R=\mathrm{OPT}$. If it buys on day $\tau$, then $R+r_\tau\ge B$, so total rent over the input is at least $B$ and $\mathrm{OPT}=B$. Meanwhile $\mathrm{ALG}=R+B\lt 2B=2\mathrm{OPT}$. Thus it is 2-competitive.

**(d)** With $r_t=B/M$ every day, the algorithm rents for the first $M-1$ days and buys on day $M$ if service continues. For $T\lt M$, both costs equal $TB/M$. For $T\ge M$,

```math
\mathrm{ALG}=\frac{M-1}{M}B+B,
\qquad\mathrm{OPT}=B,
\qquad\frac{\mathrm{ALG}}{\mathrm{OPT}}=2-\frac1M.
```

The exact ratio on this family is $2-1/M$. As $M$ grows it approaches 2; part (c) supplies the matching upper bound for the full problem.

**(e)** Fix any deterministic algorithm and consider an indefinite sequence with daily rent $B/M$. Let $\tau$ be its first buying day.

- If $\tau\le M$, end the input on day $\tau$. Then $\mathrm{OPT}=\tau B/M$ and $\mathrm{ALG}=B+(\tau-1)B/M$, so

  ```math
  \frac{\mathrm{ALG}}{\mathrm{OPT}}
  =1+\frac{M-1}{\tau}\ge2-\frac1M.
  ```

- If $\tau\gt M$, end the input on day $\tau$. Then $\mathrm{OPT}=B$ and $\mathrm{ALG}/\mathrm{OPT}=1+(\tau-1)/M\ge2$.
- If it never buys, set $T=2M$. Then $\mathrm{ALG}/\mathrm{OPT}=2B/B=2$.

All chosen inputs share the same prefix seen by the algorithm up to the ending day. Thus every deterministic algorithm has ratio at least $2-1/M$; letting $M\to\infty$ gives the lower bound 2.

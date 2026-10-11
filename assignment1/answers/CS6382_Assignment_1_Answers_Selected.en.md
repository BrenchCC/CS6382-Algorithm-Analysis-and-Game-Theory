# Assignment 1 — Answers to Questions 1, 2, and 6

Student No.: ____________________　Student Name: ____________________

## Question 1: Knapsack with two resource constraints

**(a)** Let $x_i$ indicate selection of item $i$. The integer program is

```math
\begin{aligned}
\max\quad & \sum_{i=1}^{n} v_i x_i\\
\text{subject to}\quad & \sum_{i=1}^{n} a_i x_i \le A,\\
& \sum_{i=1}^{n} b_i x_i \le B,\\
& x_i \in \{0,1\}\quad (i=1,\ldots,n).
\end{aligned}
```

Relax $x_i\in\{0,1\}$ to $0\le x_i\le1$. Every integer solution is LP-feasible; hence $\mathrm{OPT}\le\mathrm{OPT}_{LP}$.

**(b)** Selecting both uses $1+\delta\gt1$ of each resource. Either singleton is optimal: $\mathrm{OPT}=1$.

Adding the two LP constraints gives $(1+\delta)(x_1+x_2)\le2$. Equality makes both tight; their unique intersection is

```math
x_1^* = x_2^* = \frac{1}{1+\delta}, \qquad
\mathrm{OPT}_{LP} = \frac{2}{1+\delta}.
```

Both variables are fractional; rounding down gives $(0,0)$ of value $0$.

**(c)** If an extreme point $x$ has three fractional coordinates, the two resource equations on those coordinates have a nonzero solution $d$:

```math
\sum_i a_i d_i = \sum_i b_i d_i = 0.
```

For small $\varepsilon\gt0$, $x\pm\varepsilon d$ are distinct feasible points with midpoint $x$, a contradiction. Thus at most two coordinates are fractional.

**(d)** $S$ is feasible because removing fractional items does not increase resource use; $\{j\}$ is feasible by assumption. Let $F=\{i:0\lt x_i^*\lt1\}$. Then $|F|\le2$ and $v_i\le v_j$. Thus

```math
\begin{aligned}
\mathrm{OPT} &\le \mathrm{OPT}_{LP}
= v(S) + \sum_{i\in F}v_i x_i^*\\
&\le v(S)+2v_j
\le 3\max\{v(S),v_j\}.
\end{aligned}
```

The return value is at least $\mathrm{OPT}/3$. Finding an optimal extreme point, $j$, and the better set takes polynomial time.

## Question 2: Weighted vertex cover in a hypergraph

**(a)** Let $x_v$ indicate selection of vertex $v$. The integer program is

```math
\begin{aligned}
\min\quad & \sum_{v\in V}c_vx_v\\
\text{subject to}\quad & \sum_{v\in e}x_v \ge 1\quad(e\in\mathcal E),\\
& x_v\in\{0,1\}\quad(v\in V).
\end{aligned}
```

Relax $x_v\in\{0,1\}$ to $0\le x_v\le1$. Every integer solution is LP-feasible; hence $\mathrm{OPT}_{LP}\le\mathrm{OPT}$.

**(b)** If a hyperedge $e$ misses $C$, every $x_v^*\lt1/r$, so

```math
\sum_{v\in e}x_v^* \lt \frac{|e|}{r}\le1,
```

contradicting the LP constraint $\sum_{v\in e}x_v^*\ge1$. Hence $C$ is a cover.

**(c)** For $v\in C$, $1\le r x_v^*$. Thus

```math
\begin{aligned}
c(C)&=\sum_{v\in C}c_v
\le r\sum_{v\in C}c_vx_v^*\\
&\le r\mathrm{OPT}_{LP}
\le r\mathrm{OPT}.
\end{aligned}
```

The hyperedges are listed explicitly, so solving the LP and rounding take polynomial time. This is an $r$-approximation.

**(d)** A cover omits at most $r-1$ vertices; otherwise an $r$-edge is uncovered. Omitting $r-1$ is feasible, so

```math
\mathrm{OPT}=n-r+1.
```

Setting $x_v=1/r$ gives LP value $n/r$. Summing all edge constraints, with each vertex appearing $\binom{n-1}{r-1}$ times, gives

```math
\binom{n-1}{r-1}\sum_{v\in V}x_v
\ge\binom{n}{r},
\qquad
\sum_{v\in V}x_v\ge\frac nr.
```

Consequently,

```math
\mathrm{OPT}_{LP}=\frac nr,
\qquad
\frac{\mathrm{OPT}}{\mathrm{OPT}_{LP}}
=\frac{r(n-r+1)}{n}\longrightarrow r
\quad(n\to\infty,\ r\text{ fixed}).
```

This does **not** rule out a better algorithm: the gap concerns this LP, not the hardness of all algorithms.

## Question 6: Online matching with capacities

**(a)** Greedy: $u_1\to a,\ u_2\to a$; reject $u_3$. Value: $2$. Optimum: $u_1\to b,\ u_2\to a,\ u_3\to a$. Value: $3$.

**(b)** Keep one counter $q_v=0$ per offline vertex. On arrival of $u$, scan $N(u)$: if some $q_v\lt b_v$, assign $u$ to $v$ and increment $q_v$; otherwise reject. There are at most $\sum_u|N(u)|$ checks, each on integers of at most input length in bits. Thus time is polynomial, with no vertex copies.

**(c)** For $u\in O\setminus A$, greedy rejected $u$, so all its neighbors were full. Capacity never becomes free; hence optimum assigns $u$ to a vertex in $S$. Counting slots gives

```math
|O\setminus A|\le\sum_{v\in S}b_v\le|A|,
```

The last inequality holds because greedy fills every $v\in S$ with $b_v$ assignments.

**(d)** By (c),

```math
\begin{aligned}
\mathrm{OPT}=|O|&=|O\cap A|+|O\setminus A|\\
&\le|A|+|A|=2\mathrm{ALG}.
\end{aligned}
```

Thus greedy is $1/2$-competitive.

**(e)** Set $b_a=b_b=1$ and $N(u_1)=\{a,b\}$. If the algorithm rejects $u_1$, stop: $\mathrm{ALG}=0$, $\mathrm{OPT}=1$. If it assigns $u_1$ to $v\in\{a,b\}$, reveal $N(u_2)=\{v\}$. It gets $1$; optimum sends $u_1$ to the other vertex and $u_2$ to $v$, getting $2$. No deterministic algorithm guarantees more than $1/2$.

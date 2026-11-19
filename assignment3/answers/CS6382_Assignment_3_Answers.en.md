# Assignment 3 Answers

Student No.: ____________________　Student Name: ____________________

## Question 1 Packing disjoint triples

### (a) Conflict graph

The graph is the following path. The letters above the edges are the shared elements.

```text
     c       e       g       i
S1 ----- S2 ----- S3 ----- S4 ----- S5
```

A packing is feasible if and only if its vertices form an independent set: no two chosen vertices are adjacent.

### (b) All maximal packings

There are four maximal packings.

| Packing | Profit |
| --- | --- |
| $\{S_1,S_3,S_5\}$ | $4+5+4=13$ |
| $\{S_1,S_4\}$ | $4+7=11$ |
| $\{S_2,S_4\}$ | $8+7=15$ |
| $\{S_2,S_5\}$ | $8+4=12$ |

To prove completeness, consider whether $S_3$ is chosen.

If $S_3$ is chosen, $S_2,S_4$ are excluded. Maximality forces both $S_1,S_5$, giving $\{S_1,S_3,S_5\}$.

If $S_3$ is not chosen, maximality requires one of $S_1,S_2$ and one of $S_4,S_5$. The choice $\{S_1,S_5\}$ allows us to add $S_3$, so it is not maximal. The other three choices are exactly those in the table. In each listed packing, every unchosen triple conflicts with a chosen one.

### (c) Alice and Bob

Alice chooses $\{S_1,S_3,S_5\}$, with 3 triples. Bob chooses $\{S_2,S_4\}$, with profit 15.

Any non-maximal packing can be extended by adding a triple. This increases its size and, since all profits are positive, its profit. Thus both optima must be maximal. The table in (b) proves the claims.

### (d) Changing the profit of S3

For $x\gt0$, the best packing containing $S_3$ is $\{S_1,S_3,S_5\}$, with profit $x+8$. The best packing without $S_3$ is $\{S_2,S_4\}$, with profit 15.

Thus every maximum-profit packing contains $S_3$ exactly when

```math
x+8\gt15
\quad\Longleftrightarrow\quad
x\gt7.
```

Since $x$ is a positive integer, the answer is $x\ge8$.

At $x=7$, exactly two packings tie: $\{S_1,S_3,S_5\}$ and $\{S_2,S_4\}$. Both earn 15. Hence some, but not all, optimal packings contain $S_3$. For $1\le x\le6$, the unique optimum is $\{S_2,S_4\}$.

## Question 2 Round-robin fair division

### (a) Picks and final bundles

The picks are as follows. The last round has only two picks.

| Round | Alice | Bob | Carol |
| --- | --- | --- | --- |
| 1 | $g$ | $d$ | $b$ |
| 2 | $e$ | $c$ | $h$ |
| 3 | $a$ | $f$ | No goods left |

The final bundles are

```math
X_A=\{g,e,a\},\qquad
X_B=\{d,c,f\},\qquad
X_C=\{b,h\}.
```

### (b) Values and envy pairs

Each row uses that agent's values for all three bundles.

| Agent | $X_A$ | $X_B$ | $X_C$ |
| --- | --- | --- | --- |
| Alice | $8+7+6=21$ | $1+5+4=10$ | $2+3=5$ |
| Bob | $8+6+2=16$ | $7+5+3=15$ | $1+4=5$ |
| Carol | $6+3+2=11$ | $8+5+1=14$ | $7+4=11$ |

The only envy pairs are $(B,A)$ and $(C,B)$, since $16\gt15$ and $14\gt11$. Carol values her own bundle and Alice's bundle equally, so $(C,A)$ is not an envy pair.

### (c) EF1

The allocation is EF1. For Bob's envy of Alice, remove $g$ from Alice's bundle:

```math
v_B(X_A\setminus\{g\})=6+2=8
\le15=v_B(X_B).
```

For Carol's envy of Bob, remove $d$ from Bob's bundle:

```math
v_C(X_B\setminus\{d\})=5+1=6
\le11=v_C(X_C).
```

These are the only envy pairs. Each can be resolved by removing one good from the envied bundle.

## Question 3 Game theory

### Part I Choosing a workshop hall

### (a) Best responses and pure Nash equilibria

The best responses follow from these comparisons.

| Club | Other club's choice | Best response | Payoff comparison |
| --- | --- | --- | --- |
| Art | $N$ | $S$ | $3\gt1$ |
| Art | $S$ | $N$ | $5\gt2$ |
| Book | $N$ | $S$ | $3\gt2$ |
| Book | $S$ | $N$ | $5\gt1$ |

Writing the art club's choice first, the pure Nash equilibria are

```math
(N,S),\qquad(S,N).
```

At each, both clubs play a best response. At $(N,N)$, the art club gains by switching to $S$. At $(S,S)$, the art club gains by switching to $N$. Thus there are no other pure equilibria.

### (b) Pareto efficiency

Both equilibria are Pareto efficient among the four outcomes.

At $(N,S)$, the payoff is $(5,3)$. Every other outcome gives the art club less than 5, so none can Pareto improve it.

At $(S,N)$, the payoff is $(3,5)$. Every other outcome gives the book club less than 5, so none can Pareto improve it.

### Part II Sharing a volunteer grant

### (c) Coalition values

Every pair supplies at least five volunteers. No single club does.

```math
\begin{aligned}
v(\varnothing)&=v(\{A\})=v(\{B\})=v(\{C\})=0,\\
v(\{A,B\})&=v(\{A,C\})=v(\{B,C\})=v(\{A,B,C\})=90.
\end{aligned}
```

### (d) Shapley values

In every order, the second club first earns the grant. Its marginal contribution is 90; the others contribute 0.

| Arrival order | Club that first earns the grant | $\Delta_A$ | $\Delta_B$ | $\Delta_C$ |
| --- | --- | --- | --- | --- |
| $ABC$ | $B$ | 0 | 90 | 0 |
| $ACB$ | $C$ | 0 | 0 | 90 |
| $BAC$ | $A$ | 90 | 0 | 0 |
| $BCA$ | $C$ | 0 | 0 | 90 |
| $CAB$ | $A$ | 90 | 0 | 0 |
| $CBA$ | $B$ | 0 | 90 | 0 |

Each club contributes 90 in two of the six orders. Therefore

```math
\phi_A=\phi_B=\phi_C
=\frac{2\cdot90}{6}=30.
```

### (e) Core

The Shapley allocation $(30,30,30)$ is not in the core. Coalition $\{A,B\}$ can earn 90 and split it as $(45,45)$. Both members get strictly more than 30, so this coalition blocks the allocation.

In fact, the core is empty. Suppose a core allocation $(x_A,x_B,x_C)$ exists. It must satisfy

```math
x_A+x_B+x_C=90,\qquad x_A,x_B,x_C\ge0.
```

Every pair can earn 90. To prevent a pair from leaving, we need

```math
x_A+x_B\ge90,\qquad
x_A+x_C\ge90,\qquad
x_B+x_C\ge90.
```

If a pair received less than 90 in total, it could split the difference and make both members strictly better off. Adding the three inequalities gives

```math
180=2(x_A+x_B+x_C)\ge270,
```

which is impossible. Thus no division of the 90 dollars belongs to the core.

# Assignment 3 Answers

Student No.: ____________________　Student Name: ____________________

## Question 1 Packing disjoint triples

### (a) Conflict graph

Each edge is labelled with the shared element.

```text
     c       e       g       i
S1 ----- S2 ----- S3 ----- S4 ----- S5
```

A packing is feasible exactly when no two chosen vertices are joined by an edge. This is an independent set.

### (b) All maximal packings

There are four maximal packings.

| Packing | Profit |
| --- | --- |
| $\{S_1,S_3,S_5\}$ | $4+5+4=13$ |
| $\{S_1,S_4\}$ | $4+7=11$ |
| $\{S_2,S_4\}$ | $8+7=15$ |
| $\{S_2,S_5\}$ | $8+4=12$ |

If we choose $S_3$, we cannot choose $S_2,S_4$. We must add $S_1,S_5$ to make the packing maximal.

Without $S_3$, we must choose one of $S_1,S_2$ and one of $S_4,S_5$. But $\{S_1,S_5\}$ is not maximal: we can add $S_3$. This leaves the other three rows.

No triple can be added to any packing in the table. Thus the list is complete.

### (c) Alice and Bob

Alice chooses $\{S_1,S_3,S_5\}$, with 3 triples. Bob chooses $\{S_2,S_4\}$, with profit 15.

If a packing is not maximal, we can add a triple. This increases both its size and profit, since all profits are positive. So we only need to compare the maximal packings.

### (d) Changing the profit of S3

With $S_3$, the best choice is $\{S_1,S_3,S_5\}$, earning $x+8$.

Without $S_3$, the best choice is $\{S_2,S_4\}$, earning 15.

Every best packing contains $S_3$ exactly when

```math
x+8\gt15
\quad\Longleftrightarrow\quad
x\gt7.
```

For integer $x$, this means $x\ge8$.

At $x=7$, both choices earn 15. One contains $S_3$ and one does not. For $1\le x\le6$, only $\{S_2,S_4\}$ is best.

## Question 2 Round-robin fair division

### (a) Picks and final bundles

Pick from left to right in each row.

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

Use each agent's own values in their row.

| Agent | $X_A$ | $X_B$ | $X_C$ |
| --- | --- | --- | --- |
| Alice | $8+7+6=21$ | $1+5+4=10$ | $2+3=5$ |
| Bob | $8+6+2=16$ | $7+5+3=15$ | $1+4=5$ |
| Carol | $6+3+2=11$ | $8+5+1=14$ | $7+4=11$ |

Only Bob envies Alice ($16\gt15$), and Carol envies Bob ($14\gt11$). The pairs are $(B,A)$ and $(C,B)$.

### (c) EF1

Yes, the allocation is EF1.

For Bob, remove $g$ from Alice's bundle:

```math
v_B(X_A\setminus\{g\})=6+2=8
\le15=v_B(X_B).
```

For Carol, remove $d$ from Bob's bundle:

```math
v_C(X_B\setminus\{d\})=5+1=6
\le11=v_C(X_C).
```

Both envy pairs are resolved. There is no other envy.

## Question 3 Game theory

### Part I Choosing a workshop hall

### (a) Best responses and pure Nash equilibria

The best responses are:

| Club | Other club chooses | Best choice | Reason |
| --- | --- | --- | --- |
| Art | $N$ | $S$ | $3\gt1$ |
| Art | $S$ | $N$ | $5\gt2$ |
| Book | $N$ | $S$ | $3\gt2$ |
| Book | $S$ | $N$ | $5\gt1$ |

The pure Nash equilibria are (art club first):

```math
(N,S),\qquad(S,N).
```

Both clubs play a best response at these two outcomes. At either same-hall outcome, the art club can gain by changing halls. So there are no other pure equilibria.

### (b) Pareto efficiency

Both are Pareto efficient.

At $(N,S)$, payoffs are $(5,3)$. Every other outcome makes the art club worse off.

At $(S,N)$, payoffs are $(3,5)$. Every other outcome makes the book club worse off.

### Part II Sharing a volunteer grant

### (c) Coalition values

Each pair has at least five volunteers. Each single club has fewer than five.

```math
\begin{aligned}
v(\varnothing)&=v(\{A\})=v(\{B\})=v(\{C\})=0,\\
v(\{A,B\})&=v(\{A,C\})=v(\{B,C\})=v(\{A,B,C\})=90.
\end{aligned}
```

### (d) Shapley values

The second club makes the total reach five. Its marginal contribution is 90. The others contribute 0.

| Order | Grant earned when this club joins | $\Delta_A$ | $\Delta_B$ | $\Delta_C$ |
| --- | --- | --- | --- | --- |
| $ABC$ | $B$ | 0 | 90 | 0 |
| $ACB$ | $C$ | 0 | 0 | 90 |
| $BAC$ | $A$ | 90 | 0 | 0 |
| $BCA$ | $C$ | 0 | 0 | 90 |
| $CAB$ | $A$ | 90 | 0 | 0 |
| $CBA$ | $B$ | 0 | 90 | 0 |

Each club contributes 90 twice. So

```math
\phi_A=\phi_B=\phi_C
=\frac{2\cdot90}{6}=30.
```

### (e) Core

The Shapley allocation $(30,30,30)$ is not in the core. Clubs $A,B$ can leave and split 90 as $(45,45)$. Both get more than 30, so they block it.

The core is empty. Any core allocation must satisfy

```math
x_A+x_B+x_C=90,\qquad x_A,x_B,x_C\ge0.
```

Each pair can earn 90, so we also need

```math
x_A+x_B\ge90,\qquad
x_A+x_C\ge90,\qquad
x_B+x_C\ge90.
```

Otherwise, a pair can leave and share the extra money, making both better off. Adding these inequalities gives

```math
180=2(x_A+x_B+x_C)\ge270,
```

This is impossible. Thus no division of 90 is in the core.

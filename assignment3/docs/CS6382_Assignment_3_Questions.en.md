# CS6382: Algorithm Analysis and Game Theory

Due date: 4 Dec, 23:59

# Assignment 3

Student No.: ____________________　Student Name: ____________________

## Instructions

1. Write your solutions by hand, either on paper or on an electronic device.
2. To earn full marks, you must answer **all three questions**, including every subpart. Submit a scanned or digital copy of your handwritten solutions via Canvas by **4 Dec, 23:59**.
3. **Late submissions will not be accepted.**

## Question 1: Packing disjoint triples

You may select triples from the table below. A selection is a *feasible packing* if no two selected triples share an element. Its profit is the sum of the profits of the selected triples.

| Triple | Elements | Profit |
| --- | --- | --- |
| $S_1$ | $\{a, b, c\}$ | 4 |
| $S_2$ | $\{c, d, e\}$ | 8 |
| $S_3$ | $\{e, f, g\}$ | 5 |
| $S_4$ | $\{g, h, i\}$ | 7 |
| $S_5$ | $\{i, j, k\}$ | 4 |

**(a)** Draw a graph with one vertex for each triple. Join two vertices if their triples share an element, and label the edge with that element. How can you recognize a feasible packing from the graph?

**(b)** A feasible packing is *maximal* if no further triple can be added to it. List all maximal packings and compute their profits. Explain why your list is complete.

**(c)** Alice wants to select as many triples as possible. Bob wants to earn as much profit as possible. Which packing should each choose? Explain why it was enough to consider only maximal packings when answering this question.

**(d)** Suppose the profit of $S_3$ changes from 5 to a positive integer $x$. All other profits stay the same. For which values of $x$ does *every* maximum-profit packing contain $S_3$? What happens at the value where the two best choices tie?

## Question 2: Round-robin fair division

Alice, Bob, and Carol divide eight indivisible goods $a, \ldots, h$. The table gives each agent’s value for each good. To evaluate a bundle, add the entries for its goods in that agent’s row.

| Agent | $a$ | $b$ | $c$ | $d$ | $e$ | $f$ | $g$ | $h$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Alice | 6 | 2 | 5 | 1 | 7 | 4 | 8 | 3 |
| Bob | 2 | 1 | 5 | 7 | 6 | 3 | 8 | 4 |
| Carol | 2 | 7 | 5 | 8 | 3 | 1 | 6 | 4 |

The picking order is Alice, Bob, Carol, then Alice, Bob, Carol again, and so on until no goods remain. On each turn, the agent takes their most valuable remaining good.

**(a)** List the picks in order, including the final, incomplete round. Give each agent’s final bundle.

**(b)** Make a $3 \times 3$ table with one row per agent and one column per final bundle. Use each row agent’s values throughout that row. List every ordered pair $(i, j)$ for which $i$ strictly prefers $j$’s bundle to their own.

**(c)** Is the allocation envy-free up to one good (EF1)? For each envy pair in part (b), identify a good whose removal from the envied bundle eliminates the envy. Show the resulting comparison using the envious agent’s values.

## Question 3: Game theory

### Part I. Choosing a workshop hall

The art club and the book club are holding workshops at the same time. Each independently chooses North Hall ($N$) or South Hall ($S$). The table gives the clubs’ payoffs, with the art club’s payoff first.

| | Book club: $N$ | Book club: $S$ |
| --- | --- | --- |
| Art club: $N$ | $(1, 2)$ | $(5, 3)$ |
| Art club: $S$ | $(3, 5)$ | $(2, 1)$ |

**(a)** Find each club’s best response to each possible choice of the other club. Hence identify all pure Nash equilibria.

**(b)** For each equilibrium in part (a), decide whether it is Pareto efficient among the four outcomes. Justify your answer.

### Part II. Sharing a volunteer grant

For a separate event, the art club ($A$), book club ($B$), and chess club ($C$) can supply 4, 3, and 2 volunteers, respectively. A coalition earns a single grant of $90 if it supplies at least five volunteers, and nothing otherwise. Extra volunteers do not increase the grant. The coalition may divide the money however it chooses; each club cares only about its own share.

**(c)** Let $v(S)$ be the grant that coalition $S$ earns on its own. Determine $v(S)$ for all coalitions, including the empty one.

**(d)** For each of the six possible arrival orders, identify the club whose arrival first earns the grant. Average each club’s marginal contributions over the six equally likely orders to compute its Shapley value.

**(e)** Does the Shapley allocation belong to the core? If a coalition can block it, exhibit a split that makes every member of that coalition strictly better off. Then decide whether *any* division of the $90 belongs to the core. Justify your conclusion.

*Hint for the last step:* What total must each pair receive to prevent it from leaving?

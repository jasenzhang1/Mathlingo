import type { WikiArticle } from "../types";

export const pythonCollectionsWiki: WikiArticle = {
  conceptId: "python-collections",
  summary: "Four containers in the collections module replace patterns people otherwise rewrite by hand: Counter for tallying, defaultdict for grouping, namedtuple for a small fixed record, and deque for a queue. Each is a drop-in for the dict-or-list code it replaces, and each is faster and shorter than that code.",

  sections: [
    {
      heading: "Counter and defaultdict",
      blocks: [
        {
          kind: "code",
          source: "from collections import Counter, defaultdict\n\nCounter(\"banana\")                 # {'a': 3, 'n': 2, 'b': 1}\nCounter(words).most_common(3)     # the three most frequent, with counts\nCounter(a) + Counter(b)           # counts add\n\ngroups = defaultdict(list)\nfor row in rows:\n    groups[row.region].append(row)   # no 'if key not in groups' needed",
        },
        {
          kind: "table",
          headers: ["Instead of", "Use"],
          rows: [
            ["counts[k] = counts.get(k, 0) + 1", "Counter"],
            ["if k not in d: d[k] = []", "defaultdict(list)"],
            ["a tuple whose positions you keep looking up", "namedtuple, or a dataclass"],
            ["list.pop(0) in a loop", "deque.popleft()"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "defaultdict creates on read",
          text: "Merely looking at d[missing] inserts the default and returns it, so a defaultdict grows when you only meant to inspect it. Use d.get(k) when you want a read that does not mutate, and be careful printing one during debugging.",
        },
      ],
    },
    {
      heading: "namedtuple and deque",
      blocks: [
        {
          kind: "code",
          source: "from collections import namedtuple, deque\n\nPoint = namedtuple(\"Point\", \"x y\")\np = Point(1, 2)\np.x, p[0]                    # both work — named and positional\n\nq = deque([1, 2, 3])\nq.appendleft(0)              # O(1) at both ends\nq.popleft()\ndeque(maxlen=100)            # a ring buffer: oldest falls off",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why deque, and not a list",
          text: "list.pop(0) has to shift every remaining element left, so draining a list from the front is quadratic. A deque is a linked structure of blocks and pops from either end in constant time. For a queue of any size that difference is the whole ballgame.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§8.3 collections" },
    { source: "Python Standard Library", locator: "collections.Counter" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};

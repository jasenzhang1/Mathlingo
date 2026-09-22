import type { WikiArticle } from "../types";

export const pythonClassesWiki: WikiArticle = {
  conceptId: "python-classes",
  summary: "A class bundles data with the operations that belong to it. __init__ runs when an instance is created and attaches that instance's data to self. self is not a keyword — it is the ordinary first parameter of every instance method, and Python passes the instance into it automatically when you call the method on one.",

  sections: [
    {
      heading: "Defining and instantiating",
      blocks: [
        {
          kind: "code",
          source: "class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner          # attributes live on the instance\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n\na = Account(\"Ada\", 100)    # __init__ runs; a is the new instance\na.deposit(50)              # equivalent to Account.deposit(a, 50)",
        },
        {
          kind: "prose",
          text: "a.deposit(50) is shorthand: Python looks up deposit on the class, sees a function, and calls it with a as the first argument. That is the whole mechanism behind self. Naming it self is convention rather than syntax, but breaking the convention gains nothing and confuses every reader and tool.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "__init__ does not create the object",
          text: "It initialises one that already exists — __new__ created it. This matters mostly because __init__ must not return anything: returning a value from it raises TypeError. It is an initialiser, not a constructor in the C++ or Java sense.",
        },
      ],
    },
    {
      heading: "When a class earns its place",
      blocks: [
        {
          kind: "list",
          items: [
            "Several functions all take the same three arguments — those arguments are the state of an object.",
            "You are passing a dict around and every consumer has to know its keys; a class names them and can validate.",
            "There is behaviour attached to the data, not just storage — otherwise a dataclass or a NamedTuple is lighter.",
            "You need several variants sharing an interface, which is where inheritance or a protocol starts to pay.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A class is not always the answer",
          text: "A class with one method and no state is a function wearing a costume. A class that only holds fields is a dataclass, or a plain dict if it is short-lived. Reach for a class when data and behaviour genuinely belong together and there will be more than one instance.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§9 Classes" },
    { source: "Python Reference", locator: "§3.3.1 Basic customization" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};

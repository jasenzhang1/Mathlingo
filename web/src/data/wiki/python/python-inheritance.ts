import type { WikiArticle } from "../types";

export const pythonInheritanceWiki: WikiArticle = {
  conceptId: "python-inheritance",
  summary: "A subclass inherits the base class's methods and may override them. super() gives access to the base implementation, which is how an override extends rather than replaces. Inheritance is narrower than it looks: it says the subclass IS a kind of the base, and if that sentence is not true, composition — holding an instance rather than being one — is the better structure.",

  sections: [
    {
      heading: "Overriding and extending",
      blocks: [
        {
          kind: "code",
          source: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return \"...\"\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)      # run the base initialiser first\n        self.breed = breed\n\n    def speak(self):\n        return \"woof\"               # replaces the base version entirely",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Forgetting super().__init__",
          text: "A subclass __init__ that does not call the base one leaves whatever the base set up unassigned. The failure surfaces later as an AttributeError on a name you can see in the base class, which is a confusing place to start debugging.",
        },
        {
          kind: "prose",
          text: "Attribute lookup walks the method resolution order: the instance, then its class, then each base in turn. Cls.__mro__ shows that order explicitly, and is the answer to 'which speak is actually being called' in anything more tangled than a single base.",
        },
      ],
    },
    {
      heading: "Inheritance versus composition",
      blocks: [
        {
          kind: "table",
          headers: ["Question", "Inheritance", "Composition"],
          rows: [
            ["Relationship", "Dog is an Animal", "Car has an Engine"],
            ["Coupling", "tight — base internals leak into subclasses", "loose — only the held object's interface matters"],
            ["Changing the base", "can break every subclass", "affects only the callers of that interface"],
            ["Swapping behaviour at run time", "hard", "easy — assign a different object"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The test is the sentence",
          text: "Say it out loud: 'a Dog is an Animal' works; 'a Car is an Engine' does not, so a Car holds one. Inheriting to reuse a couple of convenient methods is the classic misuse — it commits you to the whole base interface, including the parts that now make no sense on the subclass.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§9.5 Inheritance" },
    { source: "Python Reference", locator: "§3.3.2 Method resolution order" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};

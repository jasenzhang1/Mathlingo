import type { WikiArticle } from "../types";

export const pythonFstringsWiki: WikiArticle = {
  conceptId: "python-fstrings",
  summary: "An f-string interpolates expressions into text at the point of writing: f\"{name} scored {n}\". The format spec after a colon controls width, alignment, precision and thousands separators, which is what turns raw numbers into a readable table. The =-suffix, f\"{x=}\", prints both the expression and its value and has quietly replaced a great deal of debug printing.",

  sections: [
    {
      heading: "Interpolation",
      blocks: [
        {
          kind: "code",
          source: "name, n = \"Ada\", 3\n\nf\"{name} scored {n}\"          # 'Ada scored 3'\nf\"{n * 2}\"                    # any expression, not just a name\nf\"{name.upper()}\"             # method calls too\nf\"{n=}\"                       # 'n=3' — name and value, for debugging\nf\"{{literal braces}}\"         # doubled braces escape",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The f prefix is not optional",
          text: "\"{name}\" without the f is the literal five characters {name}. This fails silently — you get a plausible-looking string with braces in it rather than an error — which is why it survives into log output and user-facing messages.",
        },
      ],
    },
    {
      heading: "Format specs",
      blocks: [
        {
          kind: "code",
          source: "f\"{3.14159:.2f}\"       # '3.14'      — two decimal places\nf\"{1234567:,}\"         # '1,234,567' — thousands separator\nf\"{0.256:.1%}\"         # '25.6%'\nf\"{42:>8}\"             # '      42'  — right-aligned in 8 columns\nf\"{'hi':<8}|\"          # 'hi      |' — left-aligned\nf\"{'hi':^8}|\"          # '   hi   |' — centred\nf\"{42:08.2f}\"          # '00042.00'  — zero-padded\n\nwidth = 10\nf\"{value:>{width}}\"    # the spec itself can be interpolated",
        },
        {
          kind: "table",
          headers: ["Spec", "Means"],
          rows: [
            [":.3f", "fixed point, three decimals"],
            [":,", "thousands separators"],
            [":%", "multiply by 100 and append a percent sign"],
            [":>10 / :<10 / :^10", "right, left, centre in a field of ten"],
            [":e", "scientific notation"],
            ["!r", "use repr rather than str — quotes on strings, useful for debugging"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Rounding is display-only",
          text: "f\"{x:.2f}\" formats a copy for display; x itself keeps every digit it had. A total computed from the underlying values will not match the sum of the printed ones, which is the source of the perennial 'the column does not add up' report.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Reference", locator: "§2.4.3 Formatted string literals" },
    { source: "Python Standard Library", locator: "§6.1.3 Format Specification Mini-Language" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};

/** A question's status in a list: an empty circle while unsolved, a checked circle once solved. */
export function SolvedMark({ solved }: { solved: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      role="img"
      aria-label={solved ? "Solved" : "Unsolved"}
    >
      <title>{solved ? "Solved" : "Unsolved"}</title>
      {solved ? (
        <>
          <circle cx="10" cy="10" r="9" fill="var(--teal)" />
          <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="var(--line)" strokeWidth="1.5" />
      )}
    </svg>
  );
}

import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { topics } from "../data/topics";

export function LessonPage() {
  const { topicId, lessonId } = useParams();
  const topic = topics.find((t) => t.id === topicId);
  const lesson = topic?.lessons?.find((l) => l.id === lessonId);

  if (!topic || !lesson) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="font-display text-2xl text-[var(--ink)]">
            Lesson not found
          </h1>
          <p className="font-body mt-3 text-[var(--ink-soft)]">
            We couldn't find that lesson.
          </p>
          <Link
            to="/"
            className="font-body mt-6 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Back to home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Link
            to="/"
            className="font-body text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Back to {topic.name}
          </Link>

          <h1 className="font-display mt-4 text-3xl text-[var(--ink)] md:text-4xl">
            {lesson.title}
          </h1>
          <p className="font-body mt-2 max-w-2xl text-[var(--ink-soft)]">
            {lesson.description}
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-md">
            <iframe
              src={lesson.embedUrl}
              title={lesson.title}
              loading="lazy"
              allow="fullscreen"
              allowFullScreen
              className="aspect-video w-full"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

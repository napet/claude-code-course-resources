export default function NoteEditor({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          Note Editor
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Note editor placeholder for note ID: {params.id}
        </p>
      </main>
    </div>
  );
}

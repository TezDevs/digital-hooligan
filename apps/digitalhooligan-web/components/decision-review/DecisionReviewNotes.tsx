interface Note {
  id: string;
  author: string;
  timestamp: string;
  text: string;
}

interface Props {
  notes: Note[];
}

export default function DecisionReviewNotes({ notes }: Props) {
  if (!notes || notes.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
          Notes (Read-Only)
        </div>
        <div className="text-sm text-slate-400">
          No notes recorded for this review.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">
        Notes (Read-Only)
      </div>

      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="rounded-md border border-slate-800 bg-slate-900 p-3"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-300">{note.author}</span>
              <span className="text-xs text-slate-500">
                {new Date(note.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-slate-200 whitespace-pre-wrap">
              {note.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

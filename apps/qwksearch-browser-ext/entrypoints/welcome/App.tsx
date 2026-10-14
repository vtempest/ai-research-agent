import { PanelRight } from "lucide-react"
import { FEATURE_GROUPS } from "@/lib/welcome"

function Keys({ keys }: { keys: string[] }) {
  return (
    <span className="flex flex-wrap gap-1">
      {keys.map((key) => (
        <kbd
          key={key}
          className="rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-gray-700"
        >
          {key}
        </kbd>
      ))}
    </span>
  )
}

/** Opened once on first install: what the extension does and how to reach each part. */
export default function Welcome() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 text-gray-900">
      <header className="flex flex-col items-center text-center">
        <img src="/images/qwksearch-logo.png" alt="QwkSearch" className="h-28 w-auto" />
        <h1 className="mt-4 text-3xl font-bold">Welcome to QwkSearch</h1>
        <p className="mt-2 max-w-xl text-gray-600">
          A tab organizer and research assistant in your browser's side panel. Here is everything it does and
          how to get to it.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700">
          <PanelRight size={16} />
          Click the QwkSearch icon in the toolbar, or press{" "}
          <Keys keys={["Ctrl+Q"]} /> (<Keys keys={["⌘B"]} /> on Mac)
        </p>
      </header>

      {FEATURE_GROUPS.map((group) => (
        <section key={group.heading} className="mt-10">
          <h2 className="text-xl font-semibold">{group.heading}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.features.map((feature) => (
              <li key={feature.title} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium">{feature.title}</h3>
                  {feature.keys && <Keys keys={feature.keys} />}
                </div>
                <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
                <p className="mt-2 text-sm text-gray-800">
                  <span className="font-medium">How: </span>
                  {feature.access}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <footer className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
        Shortcuts can be changed at <code>chrome://extensions/shortcuts</code>. You can reopen this page from the
        side panel's Settings. The tab organizer is based on{" "}
        <a className="underline" href="https://github.com/ringlochid/leotabs" target="_blank" rel="noreferrer">
          LeoTabs
        </a>{" "}
        (MPL-2.0).
      </footer>
    </main>
  )
}

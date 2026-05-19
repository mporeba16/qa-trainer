import { useRegisterSW } from 'virtual:pwa-register/react';

// Banner "Nowa wersja dostępna" — pojawia się gdy service worker pobierze
// nowy build w tle (vite-plugin-pwa z autoUpdate). Bez tego user nadal widzi
// stary kontent z cache do następnego cold-startu.
export default function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // Pingaj raz na godzinę żeby user dostał update bez czekania na cold start.
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
      }
      // Niewykorzystany w tej formie, ale przekazany dla zgodności z typem.
      void swUrl;
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="border-b border-accent/30 bg-accent/10 px-4 py-2">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-text">
          Dostępna nowa wersja QA Trainer.
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => updateServiceWorker(true)}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-hover"
          >
            Odśwież
          </button>
          <button
            onClick={() => setNeedRefresh(false)}
            className="rounded-md border border-border bg-bg px-3 py-1.5 text-xs text-text-muted hover:text-text"
          >
            Później
          </button>
        </div>
      </div>
    </div>
  );
}

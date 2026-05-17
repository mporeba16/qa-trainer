import { useEffect, useState } from 'react';

// beforeinstallprompt nie jest w standardowych typach lib.dom — definiujemy lokalnie.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const DISMISS_KEY = 'qa_trainer_install_dismissed_v1';

// Banner instalacji PWA — pokazuje się gdy Chrome/Edge zgłosi że appka jest
// installable. Safari (iOS) nie wspiera beforeinstallprompt — tam banner nigdy
// się nie pojawi (użytkownik musi sam: Share -> Add to Home Screen).
export default function InstallPrompt() {
  const [evt, setEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === '1') return true;
    } catch {
      // ignore: blokada storage
    }
    try {
      // już zainstalowana / odpalona jako standalone
      if (window.matchMedia('(display-mode: standalone)').matches) return true;
    } catch {
      // ignore
    }
    return false;
  });

  useEffect(() => {
    if (hidden) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setEvt(null);
      setHidden(true);
      try {
        window.localStorage.setItem(DISMISS_KEY, '1');
      } catch {
        // ignore
      }
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [hidden]);

  if (hidden || !evt) return null;

  const handleInstall = async () => {
    try {
      await evt.prompt();
      await evt.userChoice;
    } catch {
      // ignore: gdy event był stale / cofnięty
    }
    setEvt(null);
  };

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore
    }
    setEvt(null);
    setHidden(true);
  };

  return (
    <div className="border-b border-border bg-surface-2 px-4 py-2">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-text">
          Zainstaluj QA Trainer jako appkę — szybszy dostęp, działa offline.
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-hover"
          >
            Zainstaluj
          </button>
          <button
            onClick={handleDismiss}
            className="rounded-md border border-border bg-bg px-3 py-1.5 text-xs text-text-muted hover:text-text"
          >
            Nie teraz
          </button>
        </div>
      </div>
    </div>
  );
}

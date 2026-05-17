import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CERTS } from './data'
import { useLocalStorage } from './hooks/useLocalStorage'

// Root trzyma aktywny cert. Gdy się zmieni, App się REMOUNTUJE (key={cert.id}) —
// dzięki temu useLocalStorage z dynamicznym kluczem czyta świeżą wartość zamiast
// reużywać stale state z poprzedniego certa.
function Root() {
  const [certId, setCertId] = useLocalStorage<string>(
    'qa_trainer_active_cert_v1',
    CERTS[0].id,
  );
  const cert = CERTS.find((c) => c.id === certId) ?? CERTS[0];

  return (
    <App
      key={cert.id}
      cert={cert}
      certs={CERTS}
      onSwitchCert={setCertId}
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

import { GestorNotificaciones } from "../public/js/GestorNotificaciones.js";
import { NotificadorWeb } from "../public/js/NotificadorWeb.js";
import { NotificadorEmail } from "../public/js/NotificadorEmail.js";
test.each([
  [new NotificadorWeb(), "Notificación web: Tu publicación fue aprobada"],
  [new NotificadorEmail(), "Email enviado: Tu publicación fue aprobada"],
])("cada canal notifica según su propio formato", (notificador, esperado) => {
  const gestor = new GestorNotificaciones();
  expect(gestor.enviar(notificador, "Tu publicación fue aprobada")).toBe(
    esperado,
  );
});

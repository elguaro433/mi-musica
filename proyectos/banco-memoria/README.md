# Banco de memoria de casa (nombre por decidir)

Idea de Emmanuel del 11/10/2026: un **servidor propio en casa** (Andorra) donde
cae todo solo: cámaras, sensores, fotos de los dos iPhone, nubes (Google Drive,
iCloud, OneDrive) y música. Sin cuotas ni depender de empresas. Con gestión
desde el móvil y una IA local.

- **Maqueta 3D + lista completa:** `maqueta-3d.html` (abrir en el navegador).
  Publicada también como artifact privado:
  https://claude.ai/artifact/X5B91QbDBT719wrELNjV7f
- Tipo de sistema: *self-hosting* / *homelab* (NAS + NVR + domótica + nube privada).

## Lo decidido hasta ahora

- Servidor: mini PC tipo NAS (Intel N100, 16 GB, 2 puertos de red, 2–4 bahías),
  SSD de 500 GB para el sistema, 2 × 8 TB en espejo (ZFS), disco USB de copia, SAI.
- Cámaras PoE con RTSP/ONVIF en un switch conectado al **segundo puerto del
  servidor**, no al router: aisladas de internet sin tocar el router de Andorra Telecom.
- Sensores Zigbee (receptor USB + Zigbee2MQTT).
- Programas (gratis, en Docker sobre Debian 12): Home Assistant, Frigate, Immich,
  Nextcloud, Jellyfin, rclone + icloudpd, WireGuard (wg-easy), restic,
  Cockpit, Homepage, Uptime Kuma, Ollama + Open WebUI.
- Fases: 1 banco de memoria ≈ 940 €, 2 cámaras ≈ 355 €, 3 sensores ≈ 205 €
  (total ≈ 1.500 €), 4 IA rápida opcional ≈ 650 €. Luz ≈ 5 €/mes. Precios
  orientativos de octubre de 2026, sin comprobar en tienda.

## Pendiente

- Elegir nombre del sistema.
- Llamar a Andorra Telecom: ¿IP pública? ¿se puede abrir UDP 51820?
- Comprobar precios reales antes de comprar.
- Ley: Llei 29/2021 (protecció de dades), APDA. Cámaras solo hacia lo suyo + cartel.

## Lo que no se puede (ya explicado)

WhatsApp e iMessage no se sacan solos; Immich en iPhone sube al abrir la app o
cuando iOS le deja; «infinito» = cambiar discos por otros más grandes cuando se llenen.

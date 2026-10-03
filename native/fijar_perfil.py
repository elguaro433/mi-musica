"""Fija el perfil (emmanuel / elibel) dentro de la copia de index.html que va en la app nativa.
La web lee `mm_bloqueado` de localStorage al arrancar, así que basta con ponerlo antes de su primer <script>."""
import io
import sys

ruta, persona = sys.argv[1], sys.argv[2]
assert persona in ('emmanuel', 'elibel')
s = io.open(ruta, encoding='utf-8', newline='').read()
pre = "<script>try{localStorage.setItem('mm_bloqueado','%s')}catch(_){}</script>\n" % persona
i = s.index('<script>')
s = s[:i] + pre + s[i:]
io.open(ruta, 'w', encoding='utf-8', newline='').write(s)
print('perfil fijado:', persona)

"""Parchea el proyecto de iOS que genera `npx cap add ios`, sin depender de la plantilla exacta de Capacitor.

 1. Añade MiAudio.swift al final de AppDelegate.swift (así no hay que tocar el .xcodeproj) y lo arranca
    desde application(_:didFinishLaunchingWithOptions:).
 2. Solo iPhone (sin iPad: así Apple no pide capturas de iPad) y solo vertical.
Uso: python3 parchear_ios.py <carpeta native>"""
import io
import re
import sys

base = sys.argv[1]
ruta = base + '/ios/App/App/AppDelegate.swift'
s = io.open(ruta, encoding='utf-8').read()
extra = io.open(base + '/MiAudio.swift', encoding='utf-8').read()

if 'MiAudio.shared' not in s:
    i = s.index('didFinishLaunchingWithOptions')
    j = s.index('return true', i)
    s = s[:j] + 'MiAudio.shared.preparar()\n        ' + s[j:]
    s = 'import AVFoundation\nimport WebKit\n' + s + '\n' + extra
    io.open(ruta, 'w', encoding='utf-8').write(s)
    print('AppDelegate.swift parcheado')

pbx = base + '/ios/App/App.xcodeproj/project.pbxproj'
p = io.open(pbx, encoding='utf-8').read()
p2 = re.sub(r'TARGETED_DEVICE_FAMILY = "?1,2"?;', 'TARGETED_DEVICE_FAMILY = 1;', p)
io.open(pbx, 'w', encoding='utf-8').write(p2)
print('solo iPhone:', p != p2)


/* ═════ Mi Música (nativa): audio ═════
   Esto se AÑADE al AppDelegate.swift que genera Capacitor (lo hace parchear_ios.py), así no depende de la plantilla.
   1) Sesión de audio «playback» activa desde el arranque (suena con la pantalla apagada y con el interruptor de silencio).
   2) Escucha las interrupciones de iOS (audio de WhatsApp, llamadas, Siri). Cuando acaban y iOS dice
      «puedes seguir» (shouldResume), reactiva la sesión y avisa a la web (window.mmNativo) para que reanude.
      Es justo lo que una web instalada en Safari NO puede hacer. */
final class MiAudio: NSObject {

    static let shared = MiAudio()
    private var preparado = false

    func preparar() {
        if preparado { return }
        preparado = true
        activarSesion()
        let c = NotificationCenter.default
        let s = AVAudioSession.sharedInstance()
        c.addObserver(self, selector: #selector(interrupcion(_:)), name: AVAudioSession.interruptionNotification, object: s)
        c.addObserver(self, selector: #selector(cambioRuta(_:)), name: AVAudioSession.routeChangeNotification, object: s)
        c.addObserver(self, selector: #selector(serviciosReiniciados(_:)), name: AVAudioSession.mediaServicesWereResetNotification, object: s)
        c.addObserver(self, selector: #selector(volvioALaApp(_:)), name: UIApplication.didBecomeActiveNotification, object: nil)
    }

    private func activarSesion() {
        let s = AVAudioSession.sharedInstance()
        do {
            try s.setCategory(.playback, mode: .default, options: [])
            try s.setActive(true)
        } catch {
            avisarWeb("error", "sesion")
        }
    }

    @objc private func interrupcion(_ n: Notification) {
        guard let v = n.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt,
              let tipo = AVAudioSession.InterruptionType(rawValue: v) else { return }
        if tipo == .began {
            avisarWeb("inicio", "")
            return
        }
        var seguir = false
        if let o = n.userInfo?[AVAudioSessionInterruptionOptionKey] as? UInt {
            seguir = AVAudioSession.InterruptionOptions(rawValue: o).contains(.shouldResume)
        }
        try? AVAudioSession.sharedInstance().setActive(true)
        avisarWeb(seguir ? "fin" : "fin-sin-reanudar", "")
    }

    @objc private func cambioRuta(_ n: Notification) {
        guard let v = n.userInfo?[AVAudioSessionRouteChangeReasonKey] as? UInt,
              let razon = AVAudioSession.RouteChangeReason(rawValue: v) else { return }
        // Desconectar el coche o los auriculares: iOS pide pausar. Se lo contamos a la web para el informe.
        avisarWeb("ruta", razon == .oldDeviceUnavailable ? "dispositivo-desconectado" : "cambio-\(v)")
    }

    @objc private func serviciosReiniciados(_ n: Notification) {
        activarSesion()
        avisarWeb("servicios-reiniciados", "")
    }

    @objc private func volvioALaApp(_ n: Notification) {
        try? AVAudioSession.sharedInstance().setActive(true)
    }

    private func webView() -> WKWebView? {
        for escena in UIApplication.shared.connectedScenes {
            guard let ws = escena as? UIWindowScene else { continue }
            for ventana in ws.windows {
                if let vc = ventana.rootViewController as? CAPBridgeViewController, let w = vc.bridge?.webView { return w }
            }
        }
        return nil
    }

    private func avisarWeb(_ tipo: String, _ detalle: String) {
        DispatchQueue.main.async {
            guard let web = self.webView() else { return }
            let t = tipo.replacingOccurrences(of: "'", with: "")
            let d = detalle.replacingOccurrences(of: "'", with: "")
            web.evaluateJavaScript("window.mmNativo && window.mmNativo('\(t)','\(d)')", completionHandler: nil)
        }
    }
}

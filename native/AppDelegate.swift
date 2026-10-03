import UIKit
import Capacitor
import AVFoundation

/* Mi Música (nativa) — lo único que añade sobre la web:
   1) Sesión de audio «playback» activa desde el arranque (suena con la pantalla apagada y con el interruptor de silencio).
   2) Escucha las interrupciones de iOS (audio de WhatsApp, llamadas, Siri). Cuando acaban y iOS dice
      «puedes seguir» (shouldResume), reactiva la sesión y avisa a la web (window.mmNativo) para que reanude.
      Esto es justo lo que una web instalada en Safari NO puede hacer. */
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        prepararAudio()
        return true
    }

    private func prepararAudio() {
        let s = AVAudioSession.sharedInstance()
        do {
            try s.setCategory(.playback, mode: .default, options: [])
            try s.setActive(true)
        } catch {
            avisarWeb("error", "setCategory")
        }
        let c = NotificationCenter.default
        c.addObserver(self, selector: #selector(interrupcion(_:)), name: AVAudioSession.interruptionNotification, object: s)
        c.addObserver(self, selector: #selector(cambioRuta(_:)), name: AVAudioSession.routeChangeNotification, object: s)
        c.addObserver(self, selector: #selector(serviciosReiniciados(_:)), name: AVAudioSession.mediaServicesWereResetNotification, object: s)
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
        let s = AVAudioSession.sharedInstance()
        try? s.setCategory(.playback, mode: .default, options: [])
        try? s.setActive(true)
        avisarWeb("servicios-reiniciados", "")
    }

    private func avisarWeb(_ tipo: String, _ detalle: String) {
        DispatchQueue.main.async {
            guard let vc = self.window?.rootViewController as? CAPBridgeViewController,
                  let web = vc.bridge?.webView else { return }
            let t = tipo.replacingOccurrences(of: "'", with: "")
            let d = detalle.replacingOccurrences(of: "'", with: "")
            web.evaluateJavaScript("window.mmNativo && window.mmNativo('\(t)','\(d)')", completionHandler: nil)
        }
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        try? AVAudioSession.sharedInstance().setActive(true)
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
}

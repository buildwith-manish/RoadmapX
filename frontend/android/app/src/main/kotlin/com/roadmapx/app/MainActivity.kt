package com.roadmapx.app

import android.app.AlertDialog
import android.os.Bundle
import android.webkit.CookieManager
import androidx.activity.OnBackPressedCallback
import androidx.core.view.WindowCompat
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Register all Capacitor plugins
        registerPlugin(com.capacitorjs.plugins.splashscreen.SplashScreenPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.statusbar.StatusBarPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.app.AppPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.network.NetworkPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.toast.ToastPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.haptics.HapticsPlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.share.SharePlugin::class.java)
        registerPlugin(com.capacitorjs.plugins.browser.BrowserPlugin::class.java)
        registerPlugin(com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth::class.java)

        // Enable third-party cookies for session persistence
        bridge.webView?.let { webView ->
            CookieManager.getInstance().setAcceptCookie(true)
            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)
        }

        // Override back button: go back in WebView or confirm exit
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                val webView = bridge.webView
                if (webView != null && webView.canGoBack()) {
                    webView.goBack()
                } else {
                    showExitDialog()
                }
            }
        })
    }

    private fun showExitDialog() {
        AlertDialog.Builder(this)
            .setTitle("Exit RoadmapX")
            .setMessage("Are you sure you want to exit?")
            .setPositiveButton("Exit") { _, _ -> finish() }
            .setNegativeButton("Cancel") { dialog, _ -> dialog.dismiss() }
            .setCancelable(true)
            .show()
    }
}

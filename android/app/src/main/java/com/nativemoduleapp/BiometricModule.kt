package com.nativemoduleapp

import android.app.Activity
import android.os.Handler
import android.os.Looper
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import java.util.concurrent.Executor

class BiometricModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "BiometricModule"

    @ReactMethod
    fun authenticate(promptMessage: String, promise: Promise) {
        val executor: Executor = ContextCompat.getMainExecutor(reactContext)
        val activity: Activity? = currentActivity

        if (activity == null || activity.isFinishing) {
            promise.reject("NO_ACTIVITY", "Activity is null or finishing")
            return
        }

        val fragmentActivity = activity as? FragmentActivity
        if (fragmentActivity == null) {
            promise.reject("INVALID_CONTEXT", "Not a FragmentActivity")
            return
        }

        val biometricManager = BiometricManager.from(reactContext)
        if (biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK)
            != BiometricManager.BIOMETRIC_SUCCESS) {
            promise.reject("NO_HARDWARE", "Biometric not available or enrolled")
            return
        }

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle(promptMessage)
            .setNegativeButtonText("Cancel")
            .build()

        fun showBiometricPrompt() {
            val biometricPrompt = BiometricPrompt(
                fragmentActivity,
                executor,
                object : BiometricPrompt.AuthenticationCallback() {
                    override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                        super.onAuthenticationSucceeded(result)
                        promise.resolve("SUCCESS")
                    }

                    override fun onAuthenticationFailed() {
                        super.onAuthenticationFailed()
                        // don't reject on minor fail
                    }

                    override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                        super.onAuthenticationError(errorCode, errString)
                        promise.reject("AUTH_ERROR", errString.toString())
                    }
                }
            )

            biometricPrompt.authenticate(promptInfo)
        }

        fragmentActivity.runOnUiThread {
            if (fragmentActivity.supportFragmentManager.isStateSaved) {
                // Retry after 200ms until state is ready
                Handler(Looper.getMainLooper()).postDelayed({
                    authenticate(promptMessage, promise) // Retry the whole thing
                }, 200)
            } else {
                Handler(Looper.getMainLooper()).postDelayed({
                    try {
                        showBiometricPrompt()
                    } catch (e: Exception) {
                        promise.reject("LAUNCH_FAILED", e.message ?: "Unknown error")
                    }
                }, 200)
            }
        }
    }
}

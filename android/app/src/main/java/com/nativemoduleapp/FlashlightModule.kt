package com.nativemoduleapp

import android.content.Context
import android.hardware.camera2.CameraManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class FlashlightModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var isFlashOn = false

    override fun getName(): String = "FlashlightModule"

    @ReactMethod
    fun toggleFlashlight() {
        val cameraManager = reactContext.getSystemService(Context.CAMERA_SERVICE) as CameraManager
        try {
            val cameraId = cameraManager.cameraIdList.firstOrNull()
            if (cameraId != null) {
                isFlashOn = !isFlashOn
                cameraManager.setTorchMode(cameraId, isFlashOn)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}

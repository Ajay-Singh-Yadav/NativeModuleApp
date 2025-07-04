package com.nativemoduleapp

import android.content.ContentUris
import android.os.Build
import android.provider.MediaStore
import com.facebook.react.bridge.*
import java.util.*

class GalleryModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "GalleryModule"




  
  @ReactMethod
  fun getImages(promise: Promise) {
    val images = Arguments.createArray()
    val collection = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL)
    } else {
      MediaStore.Images.Media.EXTERNAL_CONTENT_URI
    }

    val projection = arrayOf(
      MediaStore.Images.Media._ID,
      MediaStore.Images.Media.DISPLAY_NAME,
      MediaStore.Images.Media.SIZE          
    )

    val sortOrder = "${MediaStore.Images.Media.DATE_ADDED} DESC"
    val cursor = reactContext.contentResolver.query(collection, projection, null, null, sortOrder)

    cursor?.use {
      val idColumn = it.getColumnIndexOrThrow(MediaStore.Images.Media._ID)
      val nameColumn = it.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME)
      val sizeColumn = it.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE)

      while (it.moveToNext()) {
        val id = it.getLong(idColumn)
        val name = it.getString(nameColumn)
        val size = it.getLong(sizeColumn)
        val uri = ContentUris.withAppendedId(collection, id)

        val imageObject = Arguments.createMap()
        imageObject.putString("uri", uri.toString())
        imageObject.putString("name", name)
        imageObject.putDouble("size", size.toDouble())

        images.pushMap(imageObject)
      }
    }

    promise.resolve(images)
  }

  @ReactMethod
  fun getVideos(promise: Promise) {
    val videos = Arguments.createArray()
    val collection = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      MediaStore.Video.Media.getContentUri(MediaStore.VOLUME_EXTERNAL)
    } else {
      MediaStore.Video.Media.EXTERNAL_CONTENT_URI
    }

    val projection = arrayOf(MediaStore.Video.Media._ID, MediaStore.Images.Media.DISPLAY_NAME, )
    val sortOrder = "${MediaStore.Video.Media.DATE_ADDED} DESC"
    val cursor = reactContext.contentResolver.query(collection, projection, null, null, sortOrder)

    cursor?.use {
      val idColumn = it.getColumnIndexOrThrow(MediaStore.Video.Media._ID)
      while (it.moveToNext()) {
        val id = it.getLong(idColumn)
        val uri = ContentUris.withAppendedId(collection, id)
        videos.pushString(uri.toString())
      }
    }

    promise.resolve(videos)
  }


 @ReactMethod
fun getAudioFiles(promise: Promise) {
  val audios = Arguments.createArray()
  val collection = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
    MediaStore.Audio.Media.getContentUri(MediaStore.VOLUME_EXTERNAL)
  } else {
    MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
  }

  val projection = arrayOf(
    MediaStore.Audio.Media._ID,
    MediaStore.Audio.Media.DISPLAY_NAME,
    MediaStore.Audio.Media.SIZE
  )

  val sortOrder = "${MediaStore.Audio.Media.DATE_ADDED} DESC"
  val cursor = reactContext.contentResolver.query(collection, projection, null, null, sortOrder)

  cursor?.use {
    val idColumn = it.getColumnIndexOrThrow(MediaStore.Audio.Media._ID)
    val nameColumn = it.getColumnIndexOrThrow(MediaStore.Audio.Media.DISPLAY_NAME)
    val sizeColumn = it.getColumnIndexOrThrow(MediaStore.Audio.Media.SIZE)

    while (it.moveToNext()) {
      val id = it.getLong(idColumn)
      val name = it.getString(nameColumn)
      val size = it.getLong(sizeColumn)
      val uri = ContentUris.withAppendedId(collection, id)

      val audioObject = Arguments.createMap()
      audioObject.putString("uri", uri.toString())
      audioObject.putString("name", name)
      audioObject.putDouble("size", size.toDouble())

      audios.pushMap(audioObject)
    }
  }

  promise.resolve(audios)
}

}





  
"use client"

import { CldUploadWidget } from "next-cloudinary"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"
import Image from 'next/image'
import { getImagePath } from "@/src/utils"


export default function ImageUpload({image} : {image: string | undefined }) {

  const [ imageUrl, setImageUrl ] = useState('')


  return (
    <CldUploadWidget
      onSuccess={(result, {widget}) => {
        if(result.event === 'success') {
          widget.close()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setImageUrl(result.info?.secure_url)
        }
      }}
      uploadPreset="d28gegh2"
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto</label>
            <div 
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
                <TbPhotoPlus
                  size={50}
                />
              <p className="text-lg font-semibold">Agregar Imagen</p>

              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{objectFit: 'contain'}}
                    src={imageUrl}
                    alt='Imagen de Producto'
                    />
                </div>
              )}
            </div>
          </div>

          {image && !imageUrl && (
            <div className="space-y-2">
              <label>Imagen Actual:</label>
              <div className="relative w-64 h-64">
                <Image
                  fill
                  src={getImagePath(image)}
                  alt='Imagen producto'
                  style={{objectFit: 'contain'}}
                />
              </div>
            </div>
          )}

          <input 
            type="hidden" 
            name="image" 
            defaultValue={imageUrl ? imageUrl : image} 
          />
        </>
      )}
    </CldUploadWidget>
  )
}

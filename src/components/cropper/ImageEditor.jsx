import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "./ImageEditor.module.css";

import Button from "../ui/buttons/button/Button";

function ImageEditor({src, setFile, setFileUrl, setCropper}) {
    const [scale, setScale] = useState(1);
    const [cropperData, setCropperData] = useState(null)

    const cropperRef = useRef(null);

    const onReset = () => {
        const cropper = cropperRef.current.cropper;
        cropper.reset();
        console.log(scale)
        setScale(1);
    };
    const save = () => {
        const canvas = cropperData.getCroppedCanvas();  // Getting the canvas

        if (!canvas) {
            console.error("Failed to get canvas from cropper.");
            return;
        }

        // Convert to JPEG blob
        canvas.toBlob((blob) => {
            if (blob) {
                // Check the blob type (should be 'image/jpeg')
                console.log("Blob type:", blob.type);

                // Creating a new File object
                const newFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });

                // Update the state with the new File object
                setFile(newFile);
                setFileUrl(canvas.toDataURL());
                setCropper(false);
            } else {
                console.error("Failed to create a blob from the canvas.");
            }
        }, 'image/jpeg', 1);  // Force 'image/jpeg' mime type
    }


    return (
        <div className={styles.imageEditor}>
            <div>
                <Cropper
                    src={src}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={16 / 9}
                    guides={false}
                    ref={cropperRef}

                    onInitialized={(instance) => {
                        setCropperData(instance);
                    }}
                />
                <div className={styles.controlsBlock}>
                    <Button click={onReset}>
                        Отменить изменения
                    </Button>
                    <Button  variant={'color'} click={() => save()}>
                        Сохранить изменения
                    </Button>
                </div>
                {/*<UploadImageButton onImageUpload={onImageUpload} />*/}
            </div>
        </div>
    );
}

export default ImageEditor;

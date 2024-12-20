import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "./ImageEditor.module.css";

import Button from "../ui/buttons/button/Button";

function ImageEditor() {
    const [scale, setScale] = useState(1);
    const cropperRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(
        "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
    );

    const onRotate = direction => () => {
        let angle = 0;
        let angleConfig = {
            left: -30,
            right: 30,
        };
        angle = angleConfig[direction] ?? 0;
        cropperRef.current.cropper.rotate(angle);
    };

    const onScale = e => {
        const scaleValue = parseFloat(e.target.value);
        setScale(scaleValue);
        cropperRef.current.cropper.scale(scaleValue);
    };

    const onReset = () => {
        const cropper = cropperRef.current.cropper;
        cropper.reset();
        setScale(1);
    };

    const onDownload = () => {
        const data = cropperRef.current.cropper.getCroppedCanvas();
        data.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "React Image Editor.jpg";
            a.click();
            URL.revokeObjectURL(url);
        });
    };

    const onImageUpload = e => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onload = e => {
            setImageSrc(e.target.result);
            cropperRef.current.cropper.reset();
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.imageEditor}>
            <div>
                <Cropper
                    src={imageSrc}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={16 / 9}
                    guides={false}
                    ref={cropperRef}
                />
                <div className={styles.controlsBlock}>
                    <Button click={onRotate("left")}>
                        Повернуть
                    </Button>
                    <Button click={onRotate("right")}>
                        Повернуть
                    </Button>
                    {/*<ControlButton tooltip="Rotate Left" onClick={onRotate("left")}>*/}
                    {/*    <BiRotateLeft size={30} />*/}
                    {/*</ControlButton>*/}
                    {/*<ControlButton tooltip="Rotate Right" onClick={onRotate("right")}>*/}
                    {/*    <BiRotateRight size={30} />*/}
                    {/*</ControlButton>*/}
                    <div className={styles.scaleFieldBlock}>
                        <input
                            type="range"
                            min="0.2"
                            max="2"
                            step="0.2"
                            value={scale}
                            aria-label="scale"
                            id="scale"
                            onChange={onScale}
                        />
                        <label htmlFor="scale">Scale</label>
                    </div>
                    <Button click={onReset}>
                        Reset
                    </Button>
                    <Button click={onDownload}>
                        Download
                    </Button>
                    {/*<ControlButton tooltip="Reset" onClick={onReset}>*/}
                    {/*    <BiReset size={30} />*/}
                    {/*</ControlButton>*/}
                    {/*<ControlButton tooltip="Download Image" onClick={onDownload}>*/}
                    {/*    <BiDownload size={30} />*/}
                    {/*</ControlButton>*/}
                </div>
                <Button click={onImageUpload}>
                    Upload
                </Button>
                {/*<UploadImageButton onImageUpload={onImageUpload} />*/}
            </div>
        </div>
    );
}

export default ImageEditor;

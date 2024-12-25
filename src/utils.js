// export const IMAGE_URL = 'http://192.168.1.121:5000'
// export const IMAGE_URL = 'http://localhost:5000'

// export const IMAGE_URL = 'http://192.168.0.101:5000'
export const IMAGE_URL = 'http://192.168.0.114:5000'
export const TITLE = 'Zabor'
export const ORG_EMAIL = 'aimany@mail.ru'


export const toggleOverlay = (id) => {
    const dialog = document.getElementById(id)
    const isOpen = dialog.open;
    return isOpen ? dialog.close() : dialog.showModal()
}

export const handleDialogClick = (event, id) => {
    // Проверяем, если клик произошел на backdrop
    if (event.target.tagName === 'DIALOG') {
        toggleOverlay(id);
    }
};


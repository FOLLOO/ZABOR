export const IMAGE_URL = 'http://test.aimani.beget.tech/'

export const TITLE = `Dont Stop Me`
export const FULL_TITLE = `Don't stop me`
export const ORG_EMAIL = 'aimany@mail.ru'


export const toggleOverlay = (id) => {
    const dialog = document.getElementById(id)
    const isOpen = dialog.open;
    return isOpen ? dialog.close() : dialog.showModal()
}

export const handleDialogClick = (event, id) => {
    if (event.target.tagName === 'DIALOG') {
        toggleOverlay(id);
    }
};

let eventSource;
export function start() {
    const isStarted = localStorage.getItem('notification')
    if (!isStarted) {
        localStorage.setItem('notification', 'true')
        if (!window.EventSource) {
            alert("Ваш браузер не поддерживает EventSource.");
            return;
        }
        let token = localStorage.getItem('token');
        eventSource = new EventSource(`${IMAGE_URL}/api/notification/connect?token=${token}`, {
            withCredentials: true
        });

        eventSource.onopen = function (e) {
            console.log("Событие: open");
        };

        eventSource.onerror = function (e) {
            if (this.readyState === EventSource.CONNECTING) {
                console.log(`Переподключение (readyState=${this.readyState})...`);
            } else {
                console.log("Произошла ошибка.");
            }
        };

        eventSource.addEventListener('bye', function (e) {
            console.log("Событие: bye, данные: " + e.data);
        });

        eventSource.onmessage = function (e) {
            console.log("Событие: message, данные: " + e.data);
        };
    }
}

export function stop() { // когда нажата кнопка "Стоп"
    eventSource.close();
    console.log("Соединение закрыто");
}




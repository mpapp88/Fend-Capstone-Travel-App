import { handleSubmit } from "../client/js/app";
import { getCountdown } from "../client/js/countdown";

import "../client/styles/main.scss"
import "../client/media/background.jpg"

document.getElementById('submit').addEventListener('click', handleSubmit);

export {
    handleSubmit,
    getCountdown
}
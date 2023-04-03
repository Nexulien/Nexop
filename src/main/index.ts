import { app, BrowserWindow } from 'electron';
import { createMainWindow } from "./mainWindow";
import { createSplashWindow } from "./splash";

import { join } from "path";

import { DATA_DIR, VENCORD_FILES_DIR } from "./constants";

import { once } from "../shared/utils/once";
import "./ipc";
import { ensureVencordFiles } from "./utils/vencordLoader";

// Make the Vencord files use our DATA_DIR
process.env.VENCORD_USER_DATA_DIR = DATA_DIR;

const runVencordMain = once(() => require(join(VENCORD_FILES_DIR, "main.js")));

async function createWindows() {
    const splash = createSplashWindow();

    await ensureVencordFiles();
    runVencordMain();

    const mainWindow = createMainWindow();

    mainWindow.once("ready-to-show", () => {
        splash.destroy();
        mainWindow.show();
    });
}

app.whenReady().then(async () => {
    createWindows();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindows();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});
/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { BrowserWindowConstructorOptions } from "electron";

export const SplashProps: BrowserWindowConstructorOptions = {
    transparent: true,
    frame: false,
    height: 344,
    width: 344,
    center: true,
    resizable: false,
    maximizable: false,
    alwaysOnTop: true
};

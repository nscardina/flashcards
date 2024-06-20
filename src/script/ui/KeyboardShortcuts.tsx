import { OperatingSystem, detectOS } from "detect-browser";

const COMMAND_SYMBOL = "\u{2318}"

enum ApplePlatform {
    macOS = "Mac OS",
    iOS = "iOS",
}

function isApplePlatform(os: OperatingSystem | null): os is ApplePlatform {
    return os === "Mac OS" || os === "iOS"
}

enum PCPlatform {
    Linux = "Linux",
    chromeOS = "Chrome OS",
    OpenBSD = "Open BSD",
    WindowsXP = "Windows XP",
    WindowsVista = "Windows Vista",
    Windows7 = "Windows 7",
    Windows8 = "Windows 8",
    Windows81 = "Windows 8.1",
    Windows10 = "Windows 10",
}
function isPCPlatform(os: OperatingSystem | null): os is PCPlatform {
    return os === "Linux"
        || os === "Chrome OS"
        || os === "Open BSD"
        || os === "Windows XP" 
        || os === "Windows Vista" 
        || os === "Windows 7"
        || os === "Windows 8"
        || os === "Windows 8.1"
        || os === "Windows 10"
}

export namespace KeyboardShortcuts {

    export function newDeck(): string {
        const os = detectOS(navigator.userAgent)
        if (isApplePlatform(os)) {
            return `${COMMAND_SYMBOL}N`
        } else if (isPCPlatform(os)) {
            return `Ctrl+N`
        } else {
            return ``
        }
    }

    export function openDeckLocally(): string {
        const os = detectOS(navigator.userAgent)
        if (isApplePlatform(os)) {
            return `${COMMAND_SYMBOL}O`
        } else if (isPCPlatform(os)) {
            return `Ctrl+O`
        } else {
            return ``
        }
    }

    export function uploadDeckFile(): string {
        const os = detectOS(navigator.userAgent)
        if (isApplePlatform(os)) {
            return `${COMMAND_SYMBOL}+Shift+O`
        } else if (isPCPlatform(os)) {
            return `Ctrl+Shift+O`
        } else {
            return ``
        }
    }


}


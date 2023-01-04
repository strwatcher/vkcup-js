export function genUrl(url: string) {
    const base = window.location.origin + "/";

    return base + url;
}

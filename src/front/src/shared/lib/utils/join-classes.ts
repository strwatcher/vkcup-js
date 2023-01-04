export function joinClasses(
    ...classes: Array<string | false | null | undefined>
): string {
    return classes.filter((className) => !!className).join(" ");
}

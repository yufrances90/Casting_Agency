export const checkPermisson = (perm) => {

    const permissions = localStorage.getItem("permissions");

    return permissions.includes(perm);
}

export interface SessionUserData {
    jwt: string,
    isAuthorize: boolean,
    userrole: string,
    hasPerm: boolean,
    perms: object
}
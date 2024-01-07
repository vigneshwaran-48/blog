import { Session } from "next-auth"

export const isAuthenticated = (session: Session, checkExpires: boolean) => {

    if(session) {
        if(checkExpires) {
            const currentTime = new Date();
            const expireTime = new Date(session.expires);

            if(expireTime > currentTime) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}
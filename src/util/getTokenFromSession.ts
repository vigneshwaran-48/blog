import { Session } from "next-auth";

export const getTokenFromSession = (session: Session) => {
    
    if(session.user) {
        return Object.create(session).access_token;
    }
    return "";
}
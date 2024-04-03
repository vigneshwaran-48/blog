import { Session, getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { isAuthenticated } from "./isAuthenticated";
import { redirect } from "next/navigation";
import { getTokenFromSession } from "./getTokenFromSession";

interface Props {

    method?: string,
    body?: any,
    includeBody?: boolean,
    url: string,
    contentType?: string,
    includeContentType?: boolean,
    checkAuthentication?: boolean
}

export const sendRequest = async (props: Props) => {

    const { url, method = "GET", body, includeBody, contentType = "text/html", includeContentType = true, checkAuthentication = true } = props;

    const session = await getServerSession(authOptions);

    if (checkAuthentication && !isAuthenticated(session as Session, false)) {
        redirect("/auth/signin");
    }

    const accessToken: string = getTokenFromSession(session as Session);

    const includeAccessToken = accessToken && accessToken.length > 0;

    const options: RequestInit = {};
    const headers: any = {
        "Accept-Language": "en-US"
    }

    if (includeAccessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (includeBody) {
        options.body = body;
        if (includeContentType) {
            headers["Content-Type"] = contentType;
        }
    }

    options.headers = headers;
    options.method = method;

    const response = await fetch(url, options);
    
    return response;
}

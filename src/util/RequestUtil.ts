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
    includeContentType?: boolean
}

export const sendRequest = async (props: Props) => {

    const { url, method = "GET", body, includeBody, contentType = "text/html", includeContentType = true } = props;

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const options: RequestInit = {};
    const headers: any = {
        "Authorization": `Bearer ${accessToken}`,
        "Accept-Language": "en-US"
    }

    if(includeBody) {
        options.body = body;
        if(includeContentType) {
            headers["Content-Type"] = contentType;
        }
    }

    options.headers = headers;
    options.method = method;

    const response = await fetch(url, options);
    if(response.status === 401) {
        redirect("/api/auth/signin");
    }

    return response;
}

import { Login, SignUp } from "@app/api/authentification";
import { GetTaskList } from "@app/api/task";

interface Body {
    function: string,
    param: any,
};

interface Data {
    message: string,
    content: object | null,
};

export async function POST(request: Request) {
    const body: Body = await request.json();

    let data: Data = { message: "", content: null, };

    if (body.function === 'GetTaskList') data = await GetTaskList(body.param);
    if (body.function === 'Login') data = await Login(body.param);
    if (body.function === 'SignUp') data = await SignUp(body.param);

    // console.log('Server received:', body);
    // console.log('Server responded:', data);

    return Response.json({
        message: data.message,
        content: data.content,
    })
}
// import { NextRequest, NextResponse } from 'next/server';
// import { checkPassword, getEnvVar } from './shared/lib/utils';

import { NextRequest } from "next/server";

// export const config = {
//     matcher: '/admin/:path',
// };

// const checkAuth = async (req: NextRequest) => {
//     const authHeader = req.headers.get('Authorization');
//     if (!authHeader) {
//         return false;
//     }

//     const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

//     return username === getEnvVar('ADMIN_USERNAME') && checkPassword(password, getEnvVar('ADMIN_PASSWORD'));
// };

export async function middleware(req: NextRequest) {
    // const isAuth = await checkAuth(req);
    // if (!isAuth) {
    //     return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic' } });
    // }
}


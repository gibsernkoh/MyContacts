export default defineEventHandler((event) => {
    const access_token = getCookie(event, 'sb-access-token');
    const refresh_token = getCookie(event, 'sb-refresh-token');
    const maxAge = 86400 * 365; // 1 Year;

    if (access_token)
        setCookie(event, 'sb-access-token', access_token, { maxAge })
    
    if (refresh_token)
        setCookie(event, 'sb-refresh-token', refresh_token, { maxAge })

    return {
        access_token,
        refresh_token
    }
})
export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    if (user.value && ['/', '/register'].includes(to.path)) {
        return navigateTo('/my-contacts')
    } else if (!user.value && !['/', '/register'].includes(to.path)) {
        return navigateTo('/')
    }
})
import { useGoogleLogin } from '@react-oauth/google'

type User = {
    name: string
    email: string
    picture: string
}

export function useGoogleAuth(onLoginSuccess?: (user: User) => void) {
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
                headers: { Authorization: `Bearer ${codeResponse.access_token}` }
            })
            .then(res => res.json())
            .then(data => {
                const userData = {
                    name: data.name,
                    email: data.email,
                    picture: data.picture
                }
                localStorage.setItem('user', JSON.stringify(userData))
                if (onLoginSuccess) {
                    onLoginSuccess(userData)
                }
            })
        }
    })

    return handleGoogleLogin
}

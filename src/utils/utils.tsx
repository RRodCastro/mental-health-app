export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const saveDataLocalStorage = ({ expiresIn, idToken, localId, refreshToken }: { expiresIn: string, idToken: string, localId: string, refreshToken: string }) => {
    const expirationDate = new Date().getTime() + parseInt(expiresIn) * 1000;

    localStorage.setItem('token', idToken)
    localStorage.setItem('expirationDate', expirationDate.toString())
    localStorage.setItem('userId', localId)
    localStorage.setItem('refreshToken', refreshToken);
}

export const deleteDataLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('refreshToken')
}
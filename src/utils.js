export async function login ({ username, password }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(username === 'Ahmed' && password) {
                resolve();
            } else {
                reject();
            }
        }, 2000)
    });
};
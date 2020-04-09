import instance from './shared';

const getHome = async () => {
    return await instance.get('/', {})
}

export default {
    getHome
}
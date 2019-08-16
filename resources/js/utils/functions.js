export const getAuthorityLevel = (authority) => {
    switch(authority){
        case 'admin':
            return 2;
        case 'super':
            return 3;
        case 'guest':
            return 1
        default:
            return 1
    }
}
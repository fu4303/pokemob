export const checkImage = (url) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = () => {
        let status = request.status;
        if (request.status === 200) //if(statusText == OK)
        {
            return true;
        } else {
            return false;
        }
    }
}
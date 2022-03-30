

const dev =
{

    REACT_APP_API_URL: ""

};


const prod =
{

    REACT_APP_API_URL: ""

};

const local =
{

    REACT_APP_API_URL: "http://localhost:44328/"
};

export function getApiUrl() {
    var url = window.location.href.toLowerCase();
    if (url.includes("localhost") == true) {
        return local.REACT_APP_API_URL;
    }
    else if (url.includes("") == true) {
        return dev.REACT_APP_API_URL;
    }
    if (url.includes("") == true) {
        return prod.REACT_APP_API_URL;
    }

    return local.REACT_APP_API_URL;

}


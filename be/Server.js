const MOCKAPI_URI = 'https://5edc676811cb1d001665ce13.mockapi.io/dotq/list_all_foods';
async function getFoodsFromServer() {
    try {
        let response = await fetch(MOCKAPI_URI);
        let responseJson = await response.json();
        return responseJson; //list of foods
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}
async function insertNewFoodToServer(arg_params) {
    try {
        let response = await fetch(MOCKAPI_URI, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arg_params)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}
async function updateAFood(arg_id, arg_params) {
    try {
        let response = await fetch(`${MOCKAPI_URI}/${arg_id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arg_params)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}
async function delAFood(arg_id) {
    try {
        let response = await fetch(`${MOCKAPI_URI}/${arg_id}`, {
            method: 'DELETE',
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

export { getFoodsFromServer, insertNewFoodToServer, updateAFood, delAFood };

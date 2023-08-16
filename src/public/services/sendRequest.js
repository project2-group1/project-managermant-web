export function sendRequest(URL, method, request) {
    fetch(URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: request
    })
        .then(response => {
            // Kiểm tra phản hồi thành công (status 200-299)
            if (response.ok) {
                console.log('thành công.');
            } else {
                console.log('không thành công.');
            }
        })
        .catch(error => {
            console.error('PUT error:', error);
    
        })
}
export function putRequest(URL, request) {
    fetch(URL, {
        method: 'PUT',
        headers: {
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
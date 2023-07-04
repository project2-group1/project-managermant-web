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
                console.log('Cuộc họp đã được xóa thành công.');
            } else {
                console.log('Xóa cuộc họp không thành công.');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gửi yêu cầu DELETE:', error);
    
        })
}
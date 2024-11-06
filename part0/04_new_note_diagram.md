sequenceDiagram
participant browser
participant server

    Note right of browser: Người dùng nhập ghi chú và nhấn nút "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (data: ghi chú mới)
    activate server
    server-->>browser: HTTP 200 OK (hoặc là JSON với ghi chú mới)
    deactivate server

    Note right of browser: Trình duyệt thêm ghi chú mới vào giao diện mà không tải lại trang

/// Bản máy tính (S22): chỉ bọc bản build web trong dist/. F11 bật/tắt toàn màn hình xử lý ở src/ui/pwa.ts.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("không khởi động được Tinh Tú");
}

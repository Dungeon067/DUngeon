// Không mở cửa sổ dòng lệnh trên Windows ở bản phát hành.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tinh_tu_lib::run();
}

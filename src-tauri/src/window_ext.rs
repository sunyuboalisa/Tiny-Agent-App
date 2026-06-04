use tauri::{Runtime, WebviewWindow, WebviewWindowBuilder, WebviewUrl};

pub fn create_main_window<R: Runtime>(app: &tauri::AppHandle<R>) -> WebviewWindow<R> {
  let win_builder =
    WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
      .title("Transparent Titlebar Window")
      .inner_size(800.0, 600.0);

  // 仅在 macOS 时设置透明标题栏
  #[cfg(target_os = "macos")]
  let win_builder = win_builder.title_bar_style(tauri::TitleBarStyle::Transparent);

  let window = win_builder.build().unwrap();

  // 仅在构建 macOS 时设置背景颜色
  #[cfg(target_os = "macos")]
  {
    use cocoa::appkit::{NSColor, NSWindow};
    use cocoa::base::{id, nil};

    let ns_window = window.ns_window().unwrap() as id;
    unsafe {
      let bg_color = NSColor::colorWithRed_green_blue_alpha_(
          nil,
          50.0 / 255.0,
          158.0 / 255.0,
          163.5 / 255.0,
          1.0,
      );
      ns_window.setBackgroundColor_(bg_color);
    }
  }

  window
}
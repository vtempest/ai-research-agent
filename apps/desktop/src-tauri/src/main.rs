#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
extern crate enigo;
extern crate tauri;
extern crate tauri_plugin_autostart;
extern crate tauri_plugin_clipboard_manager;
extern crate tauri_plugin_global_shortcut;
extern crate urlencoding;
// extern crate open;
use enigo::{    
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Settings,
};
// use open::open;
use tauri::Emitter;
use tauri::Manager;
use tauri::window::WindowBuilder;
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_global_shortcut::{Code, Modifiers, ShortcutState};
use urlencoding::encode;
mod simulate_key; 
use simulate_key::simulate_key;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            Some(vec![]),
        ))
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let app_handle = app.handle();

            #[cfg(desktop)]
            {
                WindowBuilder::new(app, "QwkSearch")
                // .url("index.html")  // Replace with your actual HTML file
                .title("QwkSearch")
                .inner_size(100.0, 100.0)
                .visible(false)
                .build()?;
            
                app_handle.plugin(
                    tauri_plugin_global_shortcut::Builder::new()
                        //register all shortcuts here
                        .with_shortcuts(["`", "Alt+`"])?
                        .with_handler(move |app, shortcut, event| {
                            if event.state == ShortcutState::Released {
                                //press alt+space to show the window
                                if shortcut.matches(Modifiers::ALT, Code::Space) {
                                    let _ = app.emit("shortcut-event", "Alt+Space triggered");
                                    let window = app.get_webview_window("main").unwrap();
                                    window.show().unwrap();
                                }

                               

                                if shortcut.matches(Modifiers::empty(), Code::Backquote) {
                                    let mut enigo = Enigo::new(&Settings::default()).unwrap();
                                    enigo.raw(0xC0, Release); // 0xC0 is the virtual key code for `

                                    let selection = get_selection(app);

                                    // println!("{}", selection);
                                    //open browser
                                    let url = format!("https://qwksearch.com/?q={}", selection);
                                   
                                   println!("{}", url.clone());
                                   
                                   if let Err(e) = open::that(&url) {
                                    eprintln!("Error opening URL: {}", e);
                                }
                                }

                                if shortcut.matches(Modifiers::ALT, Code::Backquote) {
                                    let selection2 = get_selection(app);

                                    println!("{}", selection2.clone());
                                    //need to release alt key before simulating ctrl+c to get selection
                                    let mut enigo = Enigo::new(&Settings::default()).unwrap();
                                    enigo.raw(0x12, Release); // 0x12 is the virtual key code for Alt
                                    enigo.raw(0xC0, Release); // 0xC0 is the virtual key code for `

                                    //open browser
                                    let url2 = format!("https://qwksearch.com/?first=true&q={}", &selection2);

                                    println!("{}", url2.clone());
                                    if let Err(e) = open::that(url2.clone()) {
                                        eprintln!("Error opening URL: {}", e);
                                    }


                                }
                            }
                        })
                        .build(),
                )?;
                let window = app.get_webview_window("main").unwrap();

                // Hide the window when the app starts
                window.hide().unwrap();
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


pub fn get_selection(app: &tauri::AppHandle) -> String {
    // if option_ctrl_shift_copy_in_terminal {
        // simulate_key("ctrl+shift+c").unwrap();
        // }

    //simulate Ctrl+C copy of selection because there is not way
    //to directly access selected text
    // simulate_key("ctrl+c");

    simulate_ctrl_c();
    //wait for clipboard to register selection
    std::thread::sleep(std::time::Duration::from_millis(600));

    let clipboard = app.clipboard();
    let content = match clipboard.read_text() {
        Ok(text) => text.replace('\r', " ").replace('\n', " "),
        Err(e) => {
            eprintln!("Failed to read clipboard: {}", e);
            String::new()
        }
    };
    

    return encode(&content).to_string();
}


fn simulate_ctrl_c() {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    enigo.key(Key::Control, Press);
    enigo.key(Key::Unicode('c'), Click);
    enigo.key(Key::Control, Release);
}
fn simulate_ctrl_shift_c() {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    enigo.key(Key::Control, Press);
    enigo.key(Key::Shift, Press);
    enigo.key(Key::Unicode('c'), Click);
    enigo.key(Key::Shift, Release);
    enigo.key(Key::Control, Release);
}

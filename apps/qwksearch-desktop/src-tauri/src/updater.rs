use tauri::AppHandle;
use tauri_plugin_dialog::{DialogExt, MessageDialogButtons, MessageDialogKind};
use tauri_plugin_updater::UpdaterExt;

/// Checks the release feed for a newer signed build in a background thread.
///
/// The feed is the `latest.json` named by `plugins.updater.endpoints` in
/// `tauri.conf.json`; signatures are verified against the `pubkey` there.
/// When a newer version exists, the user is asked before anything is
/// downloaded, because on Windows the installer closes the running app.
///
/// Skipped in debug builds so `tauri dev` never tries to replace itself.
///
/// # Parameters
/// - `app` — Handle to the running application.
pub fn spawn_check(app: AppHandle) {
    if cfg!(debug_assertions) {
        return;
    }
    // Rust 2015 edition has no `async` blocks, so drive the plugin's futures
    // with `block_on` on a dedicated thread. The dialog's `blocking_show`
    // also must not run on the main thread.
    std::thread::spawn(move || {
        if let Err(e) = check_and_prompt(&app) {
            eprintln!("[updater] update check failed: {}", e);
        }
    });
}

fn check_and_prompt(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let updater = app.updater()?;
    let update = match tauri::async_runtime::block_on(updater.check())? {
        Some(update) => update,
        None => return Ok(()),
    };

    println!(
        "[updater] {} available (installed {})",
        update.version, update.current_version
    );

    let mut text = format!(
        "QwkSearch {} is available. You have {}.",
        update.version, update.current_version
    );
    if let Some(notes) = update.body.as_ref().filter(|n| !n.trim().is_empty()) {
        text.push_str("\n\n");
        text.push_str(notes.trim());
    }

    let accepted = app
        .dialog()
        .message(text)
        .title("QwkSearch update")
        .kind(MessageDialogKind::Info)
        .buttons(MessageDialogButtons::OkCancelCustom(
            "Update and restart".into(),
            "Later".into(),
        ))
        .blocking_show();
    if !accepted {
        return Ok(());
    }

    let mut downloaded: usize = 0;
    tauri::async_runtime::block_on(update.download_and_install(
        |chunk, total| {
            downloaded += chunk;
            if let Some(total) = total {
                println!("[updater] downloaded {}%", downloaded as u64 * 100 / total.max(1));
            }
        },
        || println!("[updater] download complete, installing"),
    ))?;

    app.restart();
}

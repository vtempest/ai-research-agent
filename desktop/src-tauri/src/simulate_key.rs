extern crate enigo;
use enigo::{
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Settings,
};

#[derive(Debug)]
pub struct ParseKeyError(String);

/**
 * Perform any key combination passed in as string
 * @param {string} key_combination A string in the format of a key combination.
 * @example simulate_key('ctrl+shift+c')
 * @see https://docs.rs/enigo/latest/enigo/enum.Key.html
 * @returns {Promise<void>} A promise that resolves when the key combination has been performed.
 * @throws {ParseKeyError} Thrown if the key combination cannot be parsed.
 */
pub fn simulate_key(key_combination: &str) -> Result<(), ParseKeyError> {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    let parts: Vec<String> = key_combination
        .split('+')
        .map(|s| s.trim().to_lowercase())
        .collect();

    if parts.is_empty() {
        return Err(ParseKeyError("Empty key combination".to_string()));
    }

    // The last part is always the key
    let key = parts.last().unwrap();

    // All parts except the last one are modifiers (use .iter() to borrow)
    let modifiers: Vec<&str> = parts[..parts.len() - 1]
        .iter()
        .map(|s| s.as_str())
        .collect();

    // Press all modifier keys
    for modifier in &modifiers {
        let key = match *modifier {
            "ctrl" | "control" => Key::Control,
            "shift" => Key::Shift,
            "alt" => Key::Alt,
            "meta" | "win" | "cmd" | "command" => Key::Meta,
            _ => return Err(ParseKeyError(format!("Unknown modifier: {}", modifier))),
        };
        let _ = enigo.key(key, Press);
    }

    // Handle the main key
    match key.len() {
        1 => {
            let c = key.chars().next().unwrap();
            let _ = enigo.key(Key::Unicode(c), Click);
        }
        _ => {
            let special_key = match key.as_str() {
                "enter" | "return" => Key::Return,
                "tab" => Key::Tab,
                "space" => Key::Space,
                "backspace" => Key::Backspace,
                "delete" | "del" => Key::Delete,
                "escape" | "esc" => Key::Escape,
                "home" => Key::Home,
                "end" => Key::End,
                "pageup" => Key::PageUp,
                "pagedown" => Key::PageDown,
                "left" => Key::LeftArrow,
                "right" => Key::RightArrow,
                "up" => Key::UpArrow,
                "down" => Key::DownArrow,
                "f1" => Key::F1,
                "f2" => Key::F2,
                "f3" => Key::F3,
                "f4" => Key::F4,
                "f5" => Key::F5,
                "f6" => Key::F6,
                "f7" => Key::F7,
                "f8" => Key::F8,
                "f9" => Key::F9,
                "f10" => Key::F10,
                "f11" => Key::F11,
                "f12" => Key::F12,
                _ => return Err(ParseKeyError(format!("Unknown key: {}", key))),
            };
            let _ = enigo.key(special_key, Click);
        }
    }

    // Release all modifier keys in reverse order
    for modifier in modifiers.iter().rev() {
        let key = match *modifier {
            "ctrl" | "control" => Key::Control,
            "shift" => Key::Shift,
            "alt" => Key::Alt,
            "meta" | "win" | "cmd" | "command" => Key::Meta,
            _ => unreachable!(), // We already checked modifiers above
        };
        let _ = enigo.key(key, Release);
    }

    Ok(())
}

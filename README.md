# Radio ID Converter

A lightweight, client-side web utility for converting Motorola MOTOTRBO™ Radio IDs and Talkgroup IDs to and from their network IP address representation.

**Live site:** https://radioidconverter.net/

## Features

- Radio ID and Talkgroup ID conversion
- ID → IP and IP → ID conversion
- Default CAI 12 for Radio IDs
- Default Group CAI 225 for Talkgroup IDs
- Editable CAI / Group CAI when converting ID → IP
- Derived CAI / Group CAI when converting IP → ID
- Validation for supported Radio ID, Talkgroup ID, and reserved All Call ranges
- Copy-to-clipboard results
- Responsive mobile layout
- Automatic light/dark mode
- Static HTML, CSS, and vanilla JavaScript
- No framework, backend, database, account, or build process

## ID ranges

### Radio IDs

- Standard Range: 1–16,776,415
- Capacity Plus Systems: 1–65,535

### Talkgroup IDs

- Standard Range: 1–16,776,415
- Capacity Plus Systems: 1–254; 255 is All Call
- IDs reserved for All Calls: 16,777,056–16,777,183 and 16,777,213–16,777,215

For authoritative configuration details, reserved-value definitions, and system-specific limitations, consult official Motorola MOTOTRBO documentation.

## How it works

The ID is represented by the lower three octets of the MOTOTRBO network IP address. The first octet is the configured CAI or Group CAI value.

The conversion runs entirely in the browser. No entered IDs or IP addresses are sent to a server by this application.

## Project files

- `index.html` — page structure and interface
- `style.css` — responsive layout, styling, and dark mode
- `script.js` — conversion logic, validation, and UI behavior
- `LICENSE` — BSD Zero Clause (0BSD) license

## Hosting

The site is hosted with GitHub Pages and published at https://radioidconverter.net/.

## Transparency

This website and repository were generated and maintained through OpenAI ChatGPT, including the HTML, CSS, JavaScript, documentation, and repository edits. The project owner defined the requirements, reviewed the behavior, and approved the implementation and changes.

## Trademark and affiliation

MOTOTRBO™ is a trademark of Motorola Trademark Holdings, LLC. This is an independent, unofficial utility and is not affiliated with, sponsored by, or endorsed by Motorola Solutions.

## License

This project is licensed under the BSD Zero Clause (0BSD) License. It may be used, copied, modified, and distributed for any purpose without an attribution requirement. See `LICENSE` for the full terms.

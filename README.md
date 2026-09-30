# Radio-ID-Converter

A lightweight, client-side web utility for converting Motorola MOTOTRBO Radio IDs and Talkgroup IDs to and from their network IP address representation.

## Design

- Static HTML, CSS, and vanilla JavaScript
- No framework, backend, database, or build process
- Radio ID and Talkgroup ID modes
- ID → IP and IP → ID conversion
- Editable CAI / Group CAI for ID → IP conversion
- Derived CAI / Group CAI for IP → ID conversion
- Capacity Plus and Capacity Max range guidance
- Mobile-oriented numeric input hints
- GitHub Pages compatible

## ID ranges

- General MOTOTRBO Radio ID: 1–16,776,415
- Capacity Plus Radio ID: 1–65,535
- General MOTOTRBO Talkgroup ID: 1–16,776,415
- Capacity Plus Talkgroup ID: 1–254
- Capacity Plus Group ID 255 is reserved for All Call
- Capacity Max MSI Multi-Site All Call: 16,777,056–16,777,183
- Capacity Max Site All Call: 16,777,213
- Capacity Max Multi-Site All Call: 16,777,214
- Capacity Max System-Wide All Call: 16,777,215

For authoritative configuration details and system-specific limitations, consult official Motorola MOTOTRBO documentation.


## Transparency

This website and repository were written entirely through OpenAI's ChatGPT, including the HTML, CSS, JavaScript, documentation, and repository edits. The project owner defined the requirements, reviewed the behavior, and approved changes; ChatGPT generated and applied the implementation.

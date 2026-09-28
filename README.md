# Radio-ID-Converter

A lightweight, client-side web utility for converting Motorola MOTOTRBO Radio IDs and Talkgroup IDs to and from their network IP address representation.

## Design

- Static HTML, CSS, and vanilla JavaScript
- No framework, backend, database, or build process
- Radio ID and Talkgroup ID modes
- ID → IP and IP → ID conversion
- Editable CAI / Group CAI for ID → IP conversion
- Derived CAI / Group CAI for IP → ID conversion
- Capacity Plus range warnings
- Mobile-oriented numeric input hints
- GitHub Pages compatible

## ID ranges

- General MOTOTRBO Radio ID: 1–16,776,415
- Capacity Plus Radio ID: 1–65,535
- General MOTOTRBO Talkgroup ID: 1–16,776,415
- Capacity Plus Talkgroup ID: 1–254
- Capacity Plus Group ID 255 is reserved for All Call

For authoritative configuration details and system-specific limitations, consult official Motorola MOTOTRBO documentation.

#!/usr/bin/env python3
"""Write an original hard-rock homage MIDI. Not a transcription of any song."""

from pathlib import Path

PPQ = 480
TEMPO_BPM = 126
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "paradise-city-homage.mid"


def vlq(value: int) -> bytes:
    parts = [value & 0x7F]
    value >>= 7
    while value:
        parts.append((value & 0x7F) | 0x80)
        value >>= 7
    return bytes(reversed(parts))


def encode_track(events: list[tuple[int, bytes]]) -> bytes:
    events.sort(key=lambda item: item[0])
    payload = bytearray()
    last_tick = 0
    for tick, message in events:
        payload.extend(vlq(tick - last_tick))
        payload.extend(message)
        last_tick = tick
    payload.extend(vlq(0))
    payload.extend(b"\xff\x2f\x00")
    return b"MTrk" + len(payload).to_bytes(4, "big") + bytes(payload)


def tempo_message(bpm: int) -> bytes:
    micros = round(60_000_000 / bpm)
    return b"\xff\x51\x03" + micros.to_bytes(3, "big")


def name_message(name: str) -> bytes:
    raw = name.encode("ascii")
    return b"\xff\x03" + bytes([len(raw)]) + raw


def program(channel: int, patch: int) -> bytes:
    return bytes([0xC0 | channel, patch])


def control(channel: int, controller: int, value: int) -> bytes:
    return bytes([0xB0 | channel, controller, value])


def note_on(channel: int, note: int, velocity: int) -> bytes:
    return bytes([0x90 | channel, note, velocity])


def note_off(channel: int, note: int) -> bytes:
    return bytes([0x80 | channel, note, 0])


def add_note(
    events: list[tuple[int, bytes]],
    start: int,
    duration: int,
    channel: int,
    note: int,
    velocity: int,
) -> None:
    events.append((start, note_on(channel, note, velocity)))
    events.append((start + duration, note_off(channel, note)))


def beats(count: float) -> int:
    return round(count * PPQ)


# E minor. Power-chord riffs and a leaping lead. Not the GnR melody or riff.
C2, D2, E2, FS2, G2, A2, B2, C3, D3, E3, FS3, G3, A3, B3 = 36, 38, 40, 42, 43, 45, 47, 48, 50, 52, 54, 55, 57, 59
C4, D4, E4, FS4, G4, A4, B4, C5, D5, E5 = 60, 62, 64, 66, 67, 69, 71, 72, 74, 76

KICK, SNARE, CHHAT, OHHAT, CRASH, RIDE, TOM_LOW, TOM_MID = 36, 38, 42, 46, 49, 51, 45, 47


def rhythm_riff() -> list[tuple[float, list[int], float]]:
    """One 4-bar riff: (beat_offset, notes, duration_beats)."""
    e5 = [E2, B2]
    g5 = [G2, D3]
    a5 = [A2, E3]
    c5 = [C3, G3]
    d5 = [D3, A3]
    return [
        (0.0, e5, 0.5),
        (0.5, e5, 0.25),
        (0.75, e5, 0.25),
        (1.0, e5, 0.5),
        (1.5, g5, 0.5),
        (2.0, d5, 0.75),
        (2.75, c5, 0.25),
        (3.0, a5, 0.5),
        (3.5, g5, 0.5),
        (4.0, e5, 1.0),
        (5.0, g5, 0.5),
        (5.5, a5, 0.5),
        (6.0, c5, 0.75),
        (6.75, d5, 0.25),
        (7.0, e5, 1.0),
    ]


def chorus_chords() -> list[tuple[float, list[int], float]]:
    c5 = [C3, G3]
    g5 = [G2, D3]
    d5 = [D3, A3]
    a5 = [A2, E3]
    e5 = [E2, B2]
    return [
        (0.0, c5, 2.0),
        (2.0, g5, 2.0),
        (4.0, d5, 2.0),
        (6.0, a5, 1.0),
        (7.0, e5, 1.0),
    ]


def lead_chorus() -> list[tuple[float, int, float]]:
    return [
        (0.0, E4, 0.5),
        (0.5, G4, 0.5),
        (1.0, B4, 0.75),
        (1.75, A4, 0.25),
        (2.0, G4, 0.5),
        (2.5, D4, 0.5),
        (3.0, E4, 1.0),
        (4.0, FS4, 0.5),
        (4.5, G4, 0.5),
        (5.0, A4, 0.75),
        (5.75, B4, 0.25),
        (6.0, D5, 0.5),
        (6.5, B4, 0.5),
        (7.0, E4, 1.0),
    ]


def lead_verse() -> list[tuple[float, int, float]]:
    return [
        (0.0, E4, 0.25),
        (0.5, E4, 0.25),
        (1.0, G4, 0.5),
        (2.0, D4, 0.75),
        (2.75, E4, 0.25),
        (3.0, B3, 0.5),
        (4.5, G4, 0.25),
        (5.0, A4, 0.5),
        (5.5, G4, 0.25),
        (6.0, FS4, 0.5),
        (6.5, D4, 0.5),
        (7.0, E4, 0.75),
    ]


def add_power_chords(
    events: list[tuple[int, bytes]],
    origin: int,
    pattern: list[tuple[float, list[int], float]],
    channel: int,
    velocity: int,
    octave_shift: int = 0,
) -> None:
    for offset, notes, length in pattern:
        start = origin + beats(offset)
        duration = beats(length) - 8
        for note in notes:
            add_note(events, start, duration, channel, note + octave_shift, velocity)


def add_melody(
    events: list[tuple[int, bytes]],
    origin: int,
    pattern: list[tuple[float, int, float]],
    channel: int,
    velocity: int,
) -> None:
    for offset, note, length in pattern:
        add_note(events, origin + beats(offset), beats(length) - 6, channel, note, velocity)


def add_drums(events: list[tuple[int, bytes]], origin: int, bars: int, crash_first: bool) -> None:
    for bar in range(bars):
        bar_start = origin + beats(bar * 4)
        if crash_first and bar == 0:
            add_note(events, bar_start, beats(2), 9, CRASH, 112)
        for beat in range(4):
            hit = bar_start + beats(beat)
            if beat % 2 == 0:
                add_note(events, hit, beats(0.25), 9, KICK, 118 if beat == 0 else 108)
            else:
                add_note(events, hit, beats(0.25), 9, SNARE, 116)
            if beat == 2:
                add_note(events, hit + beats(0.5), beats(0.2), 9, KICK, 96)
            for eighth in (0.0, 0.5):
                hat = CHHAT if not (bar == bars - 1 and beat == 3 and eighth == 0.5) else OHHAT
                add_note(events, hit + beats(eighth), beats(0.35), 9, hat, 74 if eighth == 0 else 88)
        if bar % 4 == 3:
            add_note(events, bar_start + beats(3.5), beats(0.2), 9, TOM_MID, 100)
            add_note(events, bar_start + beats(3.75), beats(0.2), 9, TOM_LOW, 108)


def add_bass(events: list[tuple[int, bytes]], origin: int, roots: list[int]) -> None:
    for index, root in enumerate(roots):
        start = origin + beats(index * 2)
        add_note(events, start, beats(0.7), 2, root, 110)
        add_note(events, start + beats(1.0), beats(0.4), 2, root, 96)
        add_note(events, start + beats(1.5), beats(0.4), 2, root + 12, 90)


def build() -> bytes:
    conductor: list[tuple[int, bytes]] = [
        (0, name_message("Paradise City homage")),
        (0, tempo_message(TEMPO_BPM)),
        (0, b"\xff\x58\x04\x04\x02\x18\x08"),
    ]

    drums: list[tuple[int, bytes]] = [(0, name_message("Drums"))]
    rhythm: list[tuple[int, bytes]] = [
        (0, name_message("Rhythm guitar")),
        (0, program(0, 30)),
        (0, control(0, 7, 104)),
        (0, control(0, 10, 40)),
    ]
    double: list[tuple[int, bytes]] = [
        (0, name_message("Guitar double")),
        (0, program(1, 29)),
        (0, control(1, 7, 86)),
        (0, control(1, 10, 88)),
    ]
    bass: list[tuple[int, bytes]] = [
        (0, name_message("Bass")),
        (0, program(2, 34)),
        (0, control(2, 7, 110)),
    ]
    lead: list[tuple[int, bytes]] = [
        (0, name_message("Lead guitar")),
        (0, program(3, 27)),
        (0, control(3, 7, 100)),
        (0, control(3, 10, 70)),
    ]
    pad: list[tuple[int, bytes]] = [
        (0, name_message("Stadium pad")),
        (0, program(4, 89)),
        (0, control(4, 7, 62)),
    ]

    riff = rhythm_riff()
    chorus = chorus_chords()

    # Form: intro 4, verse 8, chorus 8, verse 8, chorus 8, lift 4, final 8, sting 2
    t = 0
    add_note(drums, t, beats(2), 9, CRASH, 120)
    add_note(drums, t + beats(2), beats(0.25), 9, TOM_MID, 100)
    add_note(drums, t + beats(2.5), beats(0.25), 9, TOM_MID, 104)
    add_note(drums, t + beats(3), beats(0.25), 9, TOM_LOW, 110)
    add_note(drums, t + beats(3.5), beats(0.25), 9, SNARE, 120)
    add_power_chords(rhythm, t + beats(2), [(0.0, [E2, B2], 2.0)], 0, 118)
    add_power_chords(double, t + beats(2), [(0.0, [E3, B3], 2.0)], 1, 90)
    add_note(bass, t + beats(2), beats(2), 2, E2, 114)
    t += beats(4)

    def section(
        bars: int,
        pattern: list[tuple[float, list[int], float]],
        roots: list[int],
        melody: list[tuple[float, int, float]] | None,
        crash: bool,
        pad_notes: list[int] | None,
    ) -> None:
        nonlocal t
        add_drums(drums, t, bars, crash)
        for cycle in range(bars // 2):
            origin = t + beats(cycle * 8)
            add_power_chords(rhythm, origin, pattern, 0, 108)
            add_power_chords(double, origin, pattern, 1, 84, octave_shift=12)
            if melody is not None:
                add_melody(lead, origin, melody, 3, 102)
        add_bass(bass, t, roots)
        if pad_notes:
            for index, note in enumerate(pad_notes):
                add_note(pad, t + beats(index * 4), beats(4) - 12, 4, note, 70)
        t += beats(bars * 4)

    verse_roots = [E2, E2, G2, D2, E2, E2, C2, D2] * 2
    chorus_roots = [C2, C2, G2, G2, D2, D2, A2, E2] * 2

    section(8, riff, verse_roots, None, True, [E3, G3])
    section(8, riff, verse_roots, lead_verse(), False, None)
    section(8, chorus, chorus_roots, lead_chorus(), True, [C4, G3])
    section(8, riff, verse_roots, lead_verse(), False, None)
    section(8, chorus, chorus_roots, lead_chorus(), True, [C4, D4])

    add_drums(drums, t, 4, True)
    climb = [
        (0.0, [C3, G3], 2.0),
        (2.0, [D3, A3], 2.0),
        (4.0, [E3, B3], 2.0),
        (6.0, [G3, D4], 2.0),
    ]
    add_power_chords(rhythm, t, climb, 0, 116)
    add_power_chords(double, t, climb, 1, 92, octave_shift=12)
    add_bass(bass, t, [C2, C2, D2, D2, E2, E2, G2, G2])
    add_melody(
        lead,
        t,
        [
            (0.0, G4, 2.0),
            (2.0, A4, 2.0),
            (4.0, B4, 2.0),
            (6.0, D5, 1.5),
            (7.5, E5, 0.5),
        ],
        3,
        114,
    )
    add_note(pad, t, beats(8) - 12, 4, E4, 78)
    t += beats(16)

    section(8, chorus, chorus_roots[:8], lead_chorus(), True, [C4, G3])

    add_note(drums, t, beats(2), 9, CRASH, 120)
    add_note(drums, t, beats(2), 9, KICK, 120)
    add_power_chords(rhythm, t, [(0.0, [E2, B2, E3], 2.0)], 0, 122)
    add_power_chords(double, t, [(0.0, [E3, B3, E4], 2.0)], 1, 100)
    add_note(bass, t, beats(2), 2, E2, 120)
    add_note(lead, t, beats(2), 3, E5, 118)
    add_note(pad, t, beats(2), 4, E4, 80)

    header = b"MThd" + (6).to_bytes(4, "big") + (1).to_bytes(2, "big") + (7).to_bytes(2, "big") + PPQ.to_bytes(2, "big")
    tracks = [
        encode_track(conductor),
        encode_track(drums),
        encode_track(rhythm),
        encode_track(double),
        encode_track(bass),
        encode_track(lead),
        encode_track(pad),
    ]
    return header + b"".join(tracks)


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_bytes(build())
    print(OUTPUT)


if __name__ == "__main__":
    main()

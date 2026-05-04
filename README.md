# Polysemy

An interactive linguistics presentation about polysemy, built with plain HTML, CSS, and JavaScript.

The deck explains what polysemy is, how it differs from homonymy, and how one word can develop multiple related meanings over time. It uses animated slides, revealable semantic bubbles, flip cards, and a timeline centered on the word "table".

## Preview

Run a local static server from the project folder:

```bash
python3 -m http.server 3456
```

Then open:

```text
http://localhost:3456/
```

## Controls

- Press `ArrowRight` or `Space` to move forward.
- Press `ArrowLeft` to move backward.
- Use the side navigation buttons or bottom dots to jump between slides.
- On the table meaning slide, press forward or click the stage to reveal each meaning.
- On the card slide, hover or click a card to flip it.

## Files

- `index.html` - slide content and structure
- `style.css` - visual design, layout, and animations
- `script.js` - slide navigation and interactive effects
- `.claude/launch.json` - local launch configuration for port `3456`

## Topic

Polysemy describes the phenomenon where a single word has more than one related meaning. For example, "table" can refer to furniture, a data arrangement, a plateau, or people seated together, depending on context.

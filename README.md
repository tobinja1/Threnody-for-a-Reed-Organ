# Threnody for a Reed Organ
### An endless generative music composition by [Jay Tobin,](https://jaytobin.com/) currently live [here.](https://threnody.place/)

## What is this?
Threnody for a Reed Organ is a generative music piece I made in 2018, to memorialize a rapidly-deteriorating 1924 Estey Field Reed Organ. Chords never repeat themselves, and an array of vocal samples provide endless textures for the organ to sing as long as the page is live. The organ itself bears a number of carefully etched markings, DIY fixes, and telltale marks of long-dried wood laminate drippings that indicate the organ was loved long before I recovered it from an imminent scrapping in Stamford, Connecticut.

## How does it work?
Max patches, some 3-dozen samples of my voice, the organ, and a guitar, and [rnbo~.](https://rnbo.cycling74.com/) The logic of the piece is built on [weighted probabilities,](https://en.wikipedia.org/wiki/Weight_function) with 6 potential chordal/choral possibilities for the piece to move between. Some chords are more likely to progress to similar chords than others, while some (two, to be exact) are only accessible after specific progressions. The result is something that doesn't repeat itself and offers a truly endless listening experience, with a bit of nuance in every passing second.

Additionally, the webpage for the piece features a photogrammetric scan of the organ itself, taken with an iPhone.

## Use
If you're interested in the inner-workings of the Max and rnbo~ patches that make this piece run, you're more than encouraged to fork this repo and explore, repurpose, and redevelop to your heart's content! I kindly ask, however, that if you reuse code from this project, that you make mention of this piece somewhere clearly visible.

// Owned project media shared by the canvas marquee, preloader and draggable contact grid.
// A project may appear more than once to highlight a different part of its case study.
const PROJECTS = [
  {
    "name": "Divine Tattoo",
    "href": "/work/divine-tattoo/"
  },
  {
    "name": "Zyberlane",
    "href": "/work/zyberlane/"
  },
  {
    "name": "Portfolio CMS",
    "href": "/work/divine-tattoo/"
  },
  {
    "name": "Barter-SL \u00b7 Prototype",
    "href": "/work/barter-sl/"
  },
  {
    "name": "Zyberlane AI \u00b7 Prototype",
    "href": "/work/zyberlane-ai/"
  },
  {
    "name": "Client Website",
    "href": "/work/divine-tattoo/"
  },
  {
    "name": "Zyberlane \u00b7 Web",
    "href": "/work/zyberlane/"
  },
  {
    "name": "Auth & Storage",
    "href": "/work/divine-tattoo/"
  },
  {
    "name": "Barter \u00b7 Local Data",
    "href": "/work/barter-sl/"
  },
  {
    "name": "AI API \u00b7 Prototype",
    "href": "/work/zyberlane-ai/"
  }
];
const WIDTHS = [95, 190, 300];
const srcsetFor = (n) => WIDTHS.map((w) => `/img/gallery/${n}-${w}.webp ${w}w`).join(', ');
export const GALLERY_ITEMS = PROJECTS.map((project, i) => ({
  ...project,
  src: `/img/gallery/${i + 1}-300.webp`,
  srcset: srcsetFor(i + 1),
  label: `${project.name} / ${String(i + 1).padStart(2, '0')}`,
}));
export const GALLERY_IMAGES = GALLERY_ITEMS.map((item) => item.src);
export const GALLERY_SRCSET = new Map(GALLERY_ITEMS.map((item) => [item.src, item.srcset]));
export const GALLERY_IMAGE_COUNT = GALLERY_ITEMS.length;

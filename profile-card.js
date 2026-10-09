const style = document.createElement("style");
style.textContent = `
  * { box-sizing: border-box; }
  body { min-width: 320px; min-height: 100vh; margin: 0; color: #202b25; background: #fbfaf6; font-family: "DM Sans", sans-serif; }
  .page { width: min(100%, 1200px); min-height: 100vh; margin: 0 auto; padding: 0 54px; }
  .site-header { height: 82px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e8e6df; }
  .brand { display: flex; align-items: center; gap: 11px; color: #202b25; font: 700 12px "Manrope", sans-serif; letter-spacing: 1px; }
  .brand-mark { width: 31px; height: 31px; display: grid; place-items: center; color: white; background: #202b25; font-size: 10px; letter-spacing: 0; }
  .header-note { color: #777b73; font-size: 9px; font-weight: 700; letter-spacing: 1.1px; }
  .hero { min-height: calc(100vh - 82px); display: grid; grid-template-columns: 1.08fr .92fr; align-items: center; gap: 72px; padding: 42px 0 68px; }
  .hero-copy { max-width: 500px; }
  .eyebrow { display: flex; align-items: center; gap: 9px; margin: 0 0 23px; color: #555c54; font-size: 10px; font-weight: 700; letter-spacing: 1px; }
  .eyebrow span { color: #d66750; font-size: 12px; }
  .hero h1 { margin: 0; color: #202b25; font: 700 68px/.99 "Manrope", sans-serif; letter-spacing: 0; }
  .hero h1 em { color: #285743; font: italic 400 72px/1 Georgia, serif; }
  .intro { max-width: 360px; margin: 24px 0 11px; color: #72786f; font-size: 13px; line-height: 1.8; }
  .contact { display: flex; flex-wrap: wrap; gap: 7px 15px; margin: 0 0 27px; color: #777b73; font-size: 11px; }
  .contact a { color: #285743; text-decoration-thickness: 1px; text-underline-offset: 3px; }
  add-profile-button { display: inline-block; }
  .cta-button { min-height: 45px; display: inline-flex; align-items: center; gap: 14px; padding: 0 10px 0 16px; border: 0; border-radius: 2px; color: white; background: #174b3b; font: 700 11px "DM Sans", sans-serif; cursor: pointer; transition: transform .18s ease, background .18s ease; }
  .cta-button:hover { transform: translateY(-2px); background: #103d30; }
  .cta-button:focus-visible { outline: 3px solid #d5e839; outline-offset: 3px; }
  .cta-arrow { width: 23px; height: 23px; display: grid; place-items: center; border-radius: 50%; color: #202b25; background: #d5e839; font-size: 15px; }
  .card-stage { display: grid; place-items: center; min-width: 0; }
  .profiles { width: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); align-items: start; gap: 22px; }
  .profiles[hidden] { display: none; }
  profile-card { display: block; width: min(100%, 310px); animation: lift-in .45s ease both; }
  profile-card article { position: relative; aspect-ratio: .77; overflow: hidden; padding: 27px; color: #fff9e9; background: #d9634b; box-shadow: 8px 9px 0 #d5e839; }
  .card-top { display: flex; justify-content: space-between; font-size: 9px; font-weight: 700; letter-spacing: .7px; }
  .portrait-frame { position: absolute; top: 47px; right: 27px; width: 64px; height: 80px; overflow: hidden; border: 1px solid rgba(255, 249, 233, .7); }
  .portrait-frame img { width: 100%; height: 100%; object-fit: cover; }
  .monogram { position: absolute; top: 50%; left: 50%; color: #e6ed38; font: 700 58px/1 "Manrope", sans-serif; letter-spacing: 0; transform: translate(-50%, -52%); }
  .card-bottom { position: absolute; right: 27px; bottom: 25px; left: 27px; }
  .card-bottom span { font-size: 8px; font-weight: 700; letter-spacing: .8px; }
  profile-card h2 { margin: 8px 0 0; color: #fff9e9; font: 700 16px "Manrope", sans-serif; }
  profile-card p { max-width: 215px; margin: 5px 0 0; color: rgba(255, 249, 233, .82); font-size: 10px; line-height: 1.5; overflow-wrap: anywhere; }
  profile-card .about { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  dialog { width: min(calc(100% - 32px), 420px); max-height: calc(100vh - 32px); overflow: auto; padding: 26px; border: 1px solid #e4e5dc; border-radius: 8px; color: #202b25; background: #fffefa; box-shadow: 0 18px 60px rgba(32, 43, 37, .18); }
  dialog::backdrop { background: rgba(32, 43, 37, .38); }
  .profile-form { display: grid; gap: 16px; }
  .profile-form h1 { margin: 0 0 4px; font: 700 22px "Manrope", sans-serif; }
  .profile-form label { display: grid; gap: 6px; color: #536058; font-size: 13px; font-weight: 600; }
  .profile-form input, .profile-form textarea { width: 100%; padding: 10px 11px; border: 1px solid #cbd2c9; border-radius: 5px; color: #202b25; background: white; font: 400 14px "DM Sans", sans-serif; }
  .profile-form textarea { min-height: 82px; resize: vertical; }
  .profile-form input:focus, .profile-form textarea:focus { outline: 2px solid #245a45; outline-offset: 1px; }
  .form-actions { display: flex; justify-content: flex-end; gap: 9px; margin-top: 4px; }
  .form-actions button { min-height: 40px; padding: 0 14px; border: 1px solid #cbd2c9; border-radius: 5px; color: #202b25; background: transparent; font: 600 13px "DM Sans", sans-serif; cursor: pointer; }
  .form-actions button[type="submit"] { border-color: #245a45; color: white; background: #245a45; }
  @keyframes lift-in { from { opacity: 0; transform: translateY(9px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 760px) {
    .page { padding: 0 28px; }
    .hero { min-height: 0; grid-template-columns: 1fr; gap: 54px; padding: 60px 0 72px; }
    .hero-copy { max-width: 540px; }
    .card-stage { justify-items: start; padding: 0 8px 8px; }
    profile-card { width: min(100%, 310px); }
  }
  @media (max-width: 480px) {
    .page { padding: 0 22px; }
    .site-header { height: 70px; }
    .header-note { font-size: 8px; }
    .hero { gap: 43px; padding: 55px 0 64px; }
    .hero h1 { font-size: 54px; }
    .hero h1 em { font-size: 57px; }
  }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
`;
document.head.append(style);

const app = document.querySelector("#app");
const page = document.createElement("div");
page.className = "page";
const header = document.createElement("header");
header.className = "site-header";
const brand = document.createElement("div");
brand.className = "brand";
const brandMark = document.createElement("span");
brandMark.className = "brand-mark";
brandMark.textContent = "PC";
brand.append(brandMark, document.createTextNode(" PROFILE CARDS"));
const headerNote = document.createElement("span");
headerNote.className = "header-note";
headerNote.textContent = "PERSONAL PROFILE";
header.append(brand, headerNote);
const main = document.createElement("main");
main.className = "hero";
const heroCopy = document.createElement("section");
heroCopy.className = "hero-copy";
const eyebrow = document.createElement("p");
eyebrow.className = "eyebrow";
const eyebrowMark = document.createElement("span");
eyebrowMark.textContent = "◆";
eyebrow.append(eyebrowMark, document.createTextNode(" A LITTLE INTRODUCTION"));
const headline = document.createElement("h1");
headline.append(document.createTextNode("Hello,"), document.createElement("br"), document.createTextNode("let's "));
const headlineAccent = document.createElement("em");
headlineAccent.textContent = "meet.";
headline.append(headlineAccent);
const intro = document.createElement("p");
intro.className = "intro";
const addButton = document.createElement("add-profile-button");
heroCopy.append(eyebrow, headline, intro, addButton);
const cardStage = document.createElement("div");
cardStage.className = "card-stage";
const profiles = document.createElement("section");
profiles.className = "profiles";
profiles.setAttribute("aria-label", "Personal profile card");
profiles.hidden = true;
cardStage.append(profiles);
main.append(heroCopy, cardStage);
page.append(header, main);
app.append(page);

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap";
document.head.append(fontLink);

class AddProfileButton extends HTMLElement {
  connectedCallback() {
    const button = document.createElement("button");
    button.className = "cta-button";
    button.type = "button";
    const arrow = document.createElement("span");
    arrow.className = "cta-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    const label = document.createElement("span");
    label.textContent = "Meet someone new";
    button.append(label, arrow);
    button.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("add-profile", { bubbles: true, composed: true }));
    });
    this.button = button;
    this.replaceChildren(button);
  }
}

class ProfileCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name") || "New person";
    const role = this.getAttribute("role") || "";
    const location = this.getAttribute("location") || "";
    const email = this.getAttribute("email") || "";
    const about = this.getAttribute("about") || "";
    const photo = this.getAttribute("photo") || "";
    const article = document.createElement("article");
    const top = document.createElement("div");
    top.className = "card-top";
    const label = document.createElement("span");
    label.textContent = "PERSONAL";
    const number = document.createElement("span");
    number.textContent = "01 / 01";
    top.append(label, number);
    const monogram = document.createElement("div");
    monogram.className = "monogram";
    monogram.setAttribute("aria-hidden", "true");
    monogram.textContent = name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
    const portraitFrame = document.createElement("div");
    portraitFrame.className = "portrait-frame";
    if (photo) {
      const portrait = document.createElement("img");
      portrait.src = photo;
      portrait.alt = `Portrait of ${name}`;
      portrait.addEventListener("error", () => portrait.remove(), { once: true });
      portraitFrame.append(portrait);
    }
    const bottom = document.createElement("div");
    bottom.className = "card-bottom";
    const caption = document.createElement("span");
    caption.textContent = "A LITTLE ABOUT ME";
    const heading = document.createElement("h2");
    heading.textContent = name;
    bottom.append(caption, heading);
    if (role) {
      const roleText = document.createElement("p");
      roleText.className = "role";
      roleText.textContent = role;
      bottom.append(roleText);
    }
    if (location) {
      const locationText = document.createElement("p");
      locationText.textContent = location;
      bottom.append(locationText);
    }
    if (about) {
      const aboutText = document.createElement("p");
      aboutText.className = "about";
      aboutText.textContent = about;
      bottom.append(aboutText);
    }
    article.append(top, portraitFrame, monogram, bottom);
    this.replaceChildren(article);
  }
}

customElements.define("add-profile-button", AddProfileButton);
customElements.define("profile-card", ProfileCard);

intro.textContent = "Discover a new profile with every click.";

const randomProfiles = [
  { name: "Mika Reyes", role: "Multimedia Arts Student", location: "Cebu City", about: "Finding new ways to tell stories through design.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=300&q=85" },
  { name: "Luis Navarro", role: "Junior Web Developer", location: "Davao City", about: "Learning something new with every project.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=300&q=85" },
  { name: "Amara Dizon", role: "Community Volunteer", location: "Baguio City", about: "Making time for good people and good ideas.", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&h=300&q=85" },
  { name: "Enzo Garcia", role: "Architecture Student", location: "Iloilo City", about: "Sketching places for a better everyday life.", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&h=300&q=85" },
  { name: "Taylor Kim", role: "Photographer", location: "Bacolod City", about: "Usually looking for the best light.", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&h=300&q=85" },
  { name: "Noah Rivera", role: "Music Producer", location: "Cagayan de Oro", about: "Collecting sounds and late-night ideas.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=300&q=85" }
];
let profileDeck = [];
let previousProfileName = "";

function createProfileCard(profile) {
  const card = document.createElement("profile-card");
  for (const [key, value] of Object.entries(profile)) card.setAttribute(key, value);
  return card;
}

function nextRandomProfile() {
  if (profileDeck.length === 0) {
    profileDeck = [...randomProfiles];
    for (let index = profileDeck.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [profileDeck[index], profileDeck[swapIndex]] = [profileDeck[swapIndex], profileDeck[index]];
    }
    if (profileDeck.length > 1 && profileDeck[profileDeck.length - 1].name === previousProfileName) {
      [profileDeck[0], profileDeck[profileDeck.length - 1]] = [profileDeck[profileDeck.length - 1], profileDeck[0]];
    }
  }
  const profile = profileDeck.pop();
  previousProfileName = profile.name;
  return profile;
}

addButton.addEventListener("add-profile", () => {
  profiles.append(createProfileCard(nextRandomProfile()));
  profiles.hidden = false;
  profiles.scrollIntoView({ behavior: "smooth", block: "center" });
});
/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => InlineCodeHighlight
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var InlineCodeHighlight = class extends import_obsidian.Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((element, context) => {
      const codeBlocks = element.querySelectorAll("code");
      for (const cb of codeBlocks) {
        if (cb.parentNode.tagName === "pre")
          continue;
        const text = cb.innerText;
        if (!text.startsWith("'"))
          continue;
        const match = text.match(/^'(\w+) (.*)$/);
        if (!match)
          continue;
        const [, lang, code] = match;
        cb.classList.add(`lang-${lang}`, "plugin-inline-code-highlight");
        cb.innerText = code;
        (0, import_obsidian.loadPrism)().then((Prism) => Prism.highlightElement(cb));
      }
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFBsdWdpbiwgbG9hZFByaXNtIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmVDb2RlSGlnaGxpZ2h0IGV4dGVuZHMgUGx1Z2luIHtcclxuICBhc3luYyBvbmxvYWQoKSB7XHJcbiAgICB0aGlzLnJlZ2lzdGVyTWFya2Rvd25Qb3N0UHJvY2Vzc29yKChlbGVtZW50LCBjb250ZXh0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvZGVCbG9ja3MgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJjb2RlXCIpO1xyXG4gICAgICBmb3IgKGNvbnN0IGNiIG9mIGNvZGVCbG9ja3MpIHtcclxuICAgICAgICBpZiAoKGNiLnBhcmVudE5vZGUgYXMgRWxlbWVudCkudGFnTmFtZSA9PT0gXCJwcmVcIikgY29udGludWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHQgPSBjYi5pbm5lclRleHQ7XHJcbiAgICAgICAgaWYgKCF0ZXh0LnN0YXJ0c1dpdGgoXCInXCIpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eJyhcXHcrKSAoLiopJC8pO1xyXG4gICAgICAgIGlmICghbWF0Y2gpIGNvbnRpbnVlO1xyXG4gICAgICAgIGNvbnN0IFssIGxhbmcsIGNvZGVdID0gbWF0Y2g7XHJcblxyXG4gICAgICAgIGNiLmNsYXNzTGlzdC5hZGQoYGxhbmctJHtsYW5nfWAsICdwbHVnaW4taW5saW5lLWNvZGUtaGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgY2IuaW5uZXJUZXh0ID0gY29kZTtcclxuICAgICAgICBsb2FkUHJpc20oKS50aGVuKChQcmlzbTogdHlwZW9mIHdpbmRvdy5QcmlzbSkgPT4gUHJpc20uaGlnaGxpZ2h0RWxlbWVudChjYikpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQWtDO0FBRWxDLElBQXFCLHNCQUFyQixjQUFpRCx1QkFBTztBQUFBLEVBQ3RELE1BQU0sU0FBUztBQUNiLFNBQUssOEJBQThCLENBQUMsU0FBUyxZQUFZO0FBQ3ZELFlBQU0sYUFBYSxRQUFRLGlCQUFpQixNQUFNO0FBQ2xELGlCQUFXLE1BQU0sWUFBWTtBQUMzQixZQUFLLEdBQUcsV0FBdUIsWUFBWTtBQUFPO0FBRWxELGNBQU0sT0FBTyxHQUFHO0FBQ2hCLFlBQUksQ0FBQyxLQUFLLFdBQVcsR0FBRztBQUFHO0FBRTNCLGNBQU0sUUFBUSxLQUFLLE1BQU0sZUFBZTtBQUN4QyxZQUFJLENBQUM7QUFBTztBQUNaLGNBQU0sQ0FBQyxFQUFFLE1BQU0sSUFBSSxJQUFJO0FBRXZCLFdBQUcsVUFBVSxJQUFJLFFBQVEsUUFBUSw4QkFBOEI7QUFDL0QsV0FBRyxZQUFZO0FBQ2YsdUNBQVUsRUFBRSxLQUFLLENBQUMsVUFBK0IsTUFBTSxpQkFBaUIsRUFBRSxDQUFDO0FBQUEsTUFDN0U7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==

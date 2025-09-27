Here’s a clean **README.md** you can use for your project GitHub repository. I’ve tailored it for your HLS streaming app with authentication, signed URLs, watermarks, and analytics:

```markdown
# Next.js HLS Streaming App

A simple streaming application built with **Next.js 14 + App Router** and **TypeScript**, supporting HLS playback, signed URLs, watermark overlays, and analytics.

---

## Installation

1. Clone the repo: https://github.com/mhdjunaid01/video-stream-.git

```bash
git clone [https://github.com/your-username/nextjs-hls-streaming.git](https://github.com/mhdjunaid01/video-stream-.git)
````

2. Install dependencies:

```bash
pnpm install
```

3. Add environment variables (`.env.local`):

```
JWT_SECRET=your_jwt_secret
STREAM_SECRET=your_stream_secret
```


Open [http://localhost:3000](http://localhost:3000) in your browser.

---


## HLS & Watermark Notes

* Videos are converted to HLS with `ffmpeg`.
* AES-128 encryption is supported; keys are served only to authenticated users.
* Animated watermark moves slightly over time and shows user info.

---



---

I can also make a **more “beginner-friendly” version** including **screenshots, sample commands for generating HLS, and workflow diagram** so anyone can follow the repo easily.  

Do you want me to add that?
```

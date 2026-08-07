import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Grahito Labs", short_name: "Grahito", description: "Tools digital sederhana untuk pekerjaan yang lebih mudah.", start_url: "/", display: "standalone", background_color: "#fbfbf7", theme_color: "#191914", lang: "id", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}

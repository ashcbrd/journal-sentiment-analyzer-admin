export async function rewrites() {
  return [
    {
      source: "/journals",
      destination: "/journals",
    },
    {
      source: "/messages",
      destination: "/messages",
    },
    {
      source: "/students",
      destination: "/students",
    },
  ];
}
export const middleware = [
  {
    source: "/:path*",
    matcher: "/middleware",
  },
];

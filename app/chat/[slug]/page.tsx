export default function ChatPage({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}

import { EditPostContainer } from '@/features/blog/containers/EditPostContainer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  return <EditPostContainer postId={id} />;
}

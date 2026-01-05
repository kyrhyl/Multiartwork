import { EditPostContainer } from '@/features/blog/containers/EditPostContainer';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: PageProps) {
  return <EditPostContainer postId={params.id} />;
}

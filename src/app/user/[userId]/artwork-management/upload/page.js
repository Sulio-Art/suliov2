import { ArtworkUploadForm } from "../../../../Components/artwork/ArtworkUploadForm";

const UploadArtworkPage = ({ params }) => {
 
  const userId = params.userId;

  if (!userId) {
    return <div>Error: User ID is missing from the URL.</div>;
  }

 
  return <ArtworkUploadForm userId={userId} />;
};

export default UploadArtworkPage;
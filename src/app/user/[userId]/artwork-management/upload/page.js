import { ArtworkUploadForm } from "../../../../Components/artwork/ArtworkUploadForm";


const UploadArtworkPage = ({ params }) => {
  return <ArtworkUploadForm userId={params.userid} />;
};

export default UploadArtworkPage;

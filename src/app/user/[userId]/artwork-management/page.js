import { ArtworkClientWrapper } from "./client-wrapper";

const ArtworkManagementPage = ({ params }) => {
  
  return <ArtworkClientWrapper userId={params.userId} />;
};

export default ArtworkManagementPage;
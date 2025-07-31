import { ArtworkClientWrapper } from "./client-wrapper";

const ArtworkManagementPage = ({ params }) => {
  return <ArtworkClientWrapper userId={params.userid} />;
};

export default ArtworkManagementPage;

// // pages/_app.js (or any page/component where you want to use the sidebar)

// import ProfileMenu from '../components/ProfileMenu';
// import SupportCard from '../components/SupportCard';
// function MyApp({ Component, pageProps }) {
//   return (
//     <div className="flex">
//       <ProfileMenu />
//       <div className="flex-1">
//         <SupportCard/>
//       </div>
//     </div>
//   );
// }

// export default MyApp;


// pages/index.js (or any other relevant page where you want to render the components)
import ProfileMenu from '../components/ProfileMenu';
import TicketOverview from '../components/TicketOverview';
import SupportCard from '../components/SupportCard';
import SupportAchievementOverview from '../components/SupportAchievementOverview';
import SupportTeamSuggestion from '../components/SupportTeamSuggestion';
const IndexPage = () => {
  return (
    <div className="flex">
      <ProfileMenu />

      {/* Right Side Content */}
      <div className="flex-1 flex w-full  ">
        <div>  <SupportCard />
        <TicketOverview />
        <SupportAchievementOverview/>
        </div>

        <div>
        <h2 className="text-lg font-semibold mb-4 ml-3">Support Team Suggestion</h2>

        <SupportTeamSuggestion/>
        <SupportTeamSuggestion/>
        </div>
      
      </div>
    </div>
  );
};

export default IndexPage;

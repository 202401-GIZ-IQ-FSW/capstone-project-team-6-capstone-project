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

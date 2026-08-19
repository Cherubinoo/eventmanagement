import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import EventJourney from '../components/EventJourney'
import PlatformOverview from '../components/PlatformOverview'
import ForOrganizers from '../components/ForOrganizers'
import ForParticipants from '../components/ForParticipants'
import TeamCompetitions from '../components/TeamCompetitions'
import CommunicationCertificates from '../components/CommunicationCertificates'
import EventTeamsSponsors from '../components/EventTeamsSponsors'
import AdminLifecycle from '../components/AdminLifecycle'
import EventTypes from '../components/EventTypes'
import WhyRoadies from '../components/WhyRoadies'
import CTAFooter from '../components/CTAFooter'

export default function Home({ theme, toggleTheme }) {
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <EventJourney />
        <PlatformOverview />
        <ForOrganizers />
        <ForParticipants />
        <TeamCompetitions />
        <CommunicationCertificates />
        <EventTeamsSponsors />
        <AdminLifecycle />
        <EventTypes />
        <WhyRoadies />
      </main>
      <CTAFooter />
    </>
  )
}

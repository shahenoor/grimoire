import './LandingPage.scss';
import logo from '../../assets/logo/grimoireLogo.png';
import runeCircle1 from '@assets/images/runeCircle4.png';
import monthlyView from '@assets/images/monthlyViewSS.png';
import { useNavigate } from 'react-router-dom';
import kanbanBoard from '@assets/images/kanbanBoardSS.png';
import addNewJob from '@assets/images/addNewJobSS.png';
import { NavLink } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
        <div className='background'>
        <main className='section'>
          <section className='section__hero'>
            <div className='section__hero__wrapper'>
                <h1 className='section__hero__title'>
                Cast a <span className='section__hero__highlight-locate'>Locator Spell</span> to <span className='section__hero__highlight-track'>Track Your Jobs</span> with <span className='section__hero__highlight-grimoire'>Grimoire Spellbook</span>!
                </h1>
                <p className='section__hero__text'>
                    The perfect job tracker for day-to-day applications, 
                    interviews, and offers. Grimoire provides a simple and streamlined way to keep everything in one place. Simplify your job search and navigate your career path with confidence and clarity.
                </p>
                <button className='section__hero__button' onClick={() => navigate('/signup')}>Sign up</button>
            </div>
            {/* This Image will be a GIF showing a short glimpse of app in running */}
            {/* <div className='section__hero__image-wrapper'>
              <img className='section__hero__image'/>
            </div> */}
          </section>

          {/* Adding some animations of spell run circle */}
          {/* <div class="spell-circle">
            <img src={runeCircle1} alt="Spell Circle" />
          </div> */}

          <section className='section__feature'>
          <div className='section__feature__box section__feature__box--green'></div>
            <div className='section__feature__image-wrapper '>
              <img src={kanbanBoard} className='section__feature__image'/>
            </div>

            <div className='section__feature__wrapper'>
              <p className='section__feature__tag'>Organize Your Daily Job Quest</p>
              <h2 className='section__feature__title section__feature__title--green'>Daily Kanban Board</h2>
              <p className='section__feature__text'>Effortlessly track and manage job applications with a daily kanban board. Move jobs through stages like Wishlist, Applied, Interview, Offer, and Rejected, as if casting spells. Edit, update, or delete job details directly on the board to stay in control.</p>
            </div>
          </section>

          <section className='section__feature'>
            <div className='section__feature__wrapper'>
              <p className='section__feature__tag'>Enchant Your Monthly Search with Clarity</p>
              <h2 className='section__feature__title section__feature__title--orange'>Monthly Job Calendar</h2>
              <p className='section__feature__text'>Get a bird's-eye view of your job applications with the magical monthly calendar. Click on any day to reveal its secrets and access the detailed kanban board for that date, where you can cast changes, edit, or delete applications as needed. </p>
            </div>

            <div className='section__feature__box section__feature__box--orange section__feature__box--right'></div>

            <div className='section__feature__image-wrapper section__feature__image-wrapper--right'>
              <img src={monthlyView} className='section__feature__image'/>
            </div>

            
          </section>

          <section className='section__feature'>
            <div className='section__feature__image-wrapper'>
              <img src={addNewJob} className='section__feature__image'/>
            </div>

            <div className='section__feature__box section__feature__box--blue'></div>

            <div className='section__feature__wrapper'>
              <p className='section__feature__tag'>Craft, Style, and Organize Job Descriptions & Cards</p>
              <h2 className='section__feature__title section__feature__title--blue'>Job Editor & Color Accents</h2>
              <p className='section__feature__text'>Use the text editor to format job descriptions as needed. Assign unique colors to the job card borders for quick identification, matching company branding or personal preference.</p>
            </div>
          </section>
        </main>
        </div>
        <footer></footer>
    </>
  )
}

export default LandingPage
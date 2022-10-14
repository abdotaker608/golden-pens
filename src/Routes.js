import React, {lazy, Suspense} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Switch, withRouter, Route} from 'react-router-dom';
import Preloader from './components/Preloader/Preloader';
import Footer from './components/Footer/Footer';
import Crashed from './components/404/Crashed';

const Home = lazy(() => import('./components/Home/Home'));
const Signup = lazy(() => import('./components/Signup/Signup'));
const Logout = lazy(() => import('./components/Logout/Logout'));
const Login = lazy(() => import('./components/Login/Login'));
const Verify = lazy(() => import('./components/Verify/Verify'));
const RecoverPasswordRequest = lazy(() => import('./components/RecoverPassword/RecoverPasswordRequest'));
const RecoverPassword = lazy(() => import('./components/RecoverPassword/RecoverPassword'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const NewStory = lazy(() => import('./components/Write/NewStory'));
const Story = lazy(() => import('./components/Story/Story'));
const Report = lazy(() => import('./components/Story/Report'));
const EditStory = lazy(() => import('./components/Write/EditStory'));
const Delete = lazy(() => import('./components/Story/Delete'));
const WriteChapter = lazy(() => import('./components/Chapter/Write'));
const Chapter = lazy(() => import('./components/Chapter/Chapter'));
const EditChapter = lazy(() => import('./components/Chapter/EditChapter'));
const DeleteChapter = lazy(() => import('./components/Chapter/Delete'));
const Exhibition = lazy(() => import('./components/Exhibition/Exhibition'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Authors = lazy(() => import('./components/Authors/Authors'));
const AuthorExhibition = lazy(() => import('./components/Exhibition/AuthorExhibition'));
const About = lazy(() => import('./components/About/About'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Privacy = lazy(() => import('./components/Policy/Privacy'));
const Terms = lazy(() => import('./components/Policy/Terms'));
const NotFound = lazy(() => import('./components/404/NotFound'));
const HowTo = lazy(() => import('./components/HowTo/HowTo'));
const Save = lazy(() => import('./components/Save/Save'));
const Saved = lazy(() => import('./components/Save/Saved'));

function Routes({location}) {

    const routes = [
        {path: '/', Component: Home},
        {path: '/signup', Component: Signup},
        {path: '/logout', Component: Logout},
        {path: '/login', Component: Login},
        {path: '/verify/:token', Component: Verify},
        {path: '/request-reset', Component: RecoverPasswordRequest},
        {path: '/reset/:token', Component: RecoverPassword},
        {path: '/settings', Component: Settings},
        {path: '/write/new', Component: NewStory},
        {path: '/story/:id', Component: Story},
        {path: '/report/:id', Component: Report},
        {path: '/edit/story/:id', Component: EditStory},
        {path: '/delete/story/:id', Component: Delete},
        {path: '/write/nc/:story', Component: WriteChapter},
        {path: '/story/c/:id', Component: Chapter},
        {path: '/edit/c/:id', Component: EditChapter},
        {path: '/delete/c/:id', Component: DeleteChapter},
        {path: '/exhibition', Component: Exhibition},
        {path: '/dashboard', Component: Dashboard},
        {path: '/authors', Component: Authors},
        {path: '/stories/author/:authorId', Component: AuthorExhibition},
        {path: '/about', Component: About},
        {path: '/profile/:id', Component: Profile},
        {path: '/policy', Component: Privacy},
        {path: '/terms', Component: Terms},
        {path: '/usage', Component: HowTo},
        {path: '/save/:id', Component: Save},
        {path: '/saved', Component: Saved},
        {path: '*', Component: NotFound}
    ]

    return (
        <TransitionGroup className='scale-container'>
            <CSSTransition classNames='scale' timeout={300} key={location.key}>
                <Switch location={location}>
                    {
                        routes.map(({path, Component}) => (
                            <Route path={path} exact key={path}>
                                {
                                    ({match}) => (
                                        <div className='scale'>
                                            <Suspense fallback={<Preloader />}>
                                                <Crashed>
                                                    <Component match={match} />
                                                    <Footer />
                                                </Crashed>
                                            </Suspense>
                                        </div>
                                    )
                                }
                            </Route>
                        ))
                    }
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default withRouter(Routes)

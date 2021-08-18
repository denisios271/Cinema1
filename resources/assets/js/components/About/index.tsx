import * as React from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading';
import iGlobalState from '../../interfaces/iGlobalState';
import { key, iState } from './reducers';
import SeoWrapper from '../Wrappers/Seo';
import * as CircleType from 'circletype';

const cutLongText: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '2rem'
}

interface iProps {
    teamInfo: iState,
}

class About extends React.Component<iProps> {
    componentDidMount() {
        this.rotateNicknames();
    }
    
    componentDidUpdate() {
        // idk why but if u load about page - nicknames will be broken, works correctly only componentDidMount
        this.rotateNicknames();
    }
    
    rotateNicknames = () => {
        let textElementsToRotate = document.querySelectorAll('.teamate__nickname');
        if (!textElementsToRotate.length) {
            return;
        }
        for (let el of textElementsToRotate) {
            let circleType = new CircleType(el);
            circleType.radius(120);
            el.setAttribute('style', 'transform: rotate(-27deg)'); // if those will set in css this lib will doesn't do what's need
        }
    }
    
    render() {
        const team = this.props.teamInfo.team;
        const about = this.props.teamInfo.about;
        const error = this.props.teamInfo.error;
        const isLoading = !this.props.teamInfo.isLoaded;

        if (isLoading) {
            return <Loading />;
        }

        if (error) {
            return <div className="alert alert-danger">{error}</div>;
        }

        return (
            <SeoWrapper title="О проекте - FireDub.Net" description='О команде FireDub. О Проекте FireDub, о нас, мы, FireDub.net'>
                <div className="aboute-us__cont">
                    <div className="aboute-us__header">
                        <h1 className="h1">
                            Кто мы?
                        </h1>
                        <div dangerouslySetInnerHTML={{__html: about}}></div>
                    </div>
                </div>

                <div className="aboute-us__team-cont">
                    <div className="aboute-us__team">
                        {team.map((v, i) =>
                            <div key={i} className="aboute-us__teamate-cont teamate__cont">
                                <a>
                                    <div className="teamate">
                                        <div className="teamate__overflow">
                                            <div className="teamate__info">
                                                {/* <div className="teamate__info-job">
                                                    Глава Проекта
                                                </div> */}
                                                <div className="teamate__info-job">
                                                    {v.roles}
                                                </div>
                                                {/* <div className="teamate__info-quote">
                                                    <span>Голос Firedub</span>
                                                </div> */}
                                            </div>
                                            <div className="teamate__avatar">
                                                <div className="avatar">
                                                    <div className="avatar__overflow">
                                                        <img className="avatar__image" src={v.image_uri} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="teamate__nickname">
                                                {v.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="teamate__shadow-overflow">
                                        <div className="teamate__shadow-overflow-border">
                                            {/* {!!v.links.length && v.links.map((link, i) => <a key={i} href={link.uri} className="card-link" target="_blank">{link.title}</a>)} */}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </SeoWrapper>
        );
        // return (
        //     <SeoWrapper title="О проекте - FireDub.Net" description='О команде FireDub. О Проекте FireDub, о нас, мы, FireDub.net'>
        //         <section className="row">
        //             <div className="col-xs-12 col-sm-12 mb-2">
        //                 <h1>О проекте</h1>
        //             </div>
        //             <div className="col-xs-12 col-sm-12" dangerouslySetInnerHTML={{__html: about}}></div>
        //         </section>
        //         <hr />
        //         <section className="row">
        //             <div className="col-xs-12 col-sm-12 mb-2">
        //                 <h1>Об участниках</h1>
        //             </div>
        //             {team.map((v, i) => (
        //                 <div key={i} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        //                     <div className="card mb-3">
        //                         <img className="card-img-top" src={v.image_uri} alt={`Фотка ${v.name}`} />
        //                         <div className="card-body">
        //                             <h4 className="card-title" style={cutLongText}>{v.name}</h4>
        //                             <h6 className="card-subtitle mb-2 text-muted">{v.roles}</h6>
        //                             {!!v.links.length && v.links.map((link, i) => <a key={i} href={link.uri} className="card-link" target="_blank">{link.title}</a>)}
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </section>
        //     </SeoWrapper>
        // );
    }
}

export default connect(
    (state: iGlobalState) => ({
        teamInfo: state[key],
    })
)(About);
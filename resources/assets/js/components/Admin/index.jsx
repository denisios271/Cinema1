import React from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../Loading';
import ReactLoading from 'react-loading';

class Admin extends React.Component{
    render() {
        const t = this.props.state.admin.tutorials;
        const arr = [{
            title: 'Туториалы',
            data: t.tutorials,
        },{
            title: 'Новости',
            data: t.news,
        }];
        return(
            <section className="row">
                {arr.map((tut, tutNum) =>
                    <div key={tutNum} className="col-xs-12 col-sm-12 col-md-6">
                        <div id="accordion" role="tablist">
                            {tut.title}
                            <br />
                            {tut.data.map(v =>
                                <div key={v.id} className="card mt-2">
                                    <div className="card-header" role="tab" id={`heading-tutorial-${v.id}`}>
                                        <h5 className="mb-0">
                                            <a data-toggle="collapse" href={`#collapse-tutorial-${v.id}`} aria-expanded="false" aria-controls={`collapse-tutorial-${v.id}`}>
                                                {v.title}
                                            </a>
                                        </h5>
                                    </div>
                                
                                    <div id={`collapse-tutorial-${v.id}`} className="collapse" role="tabpanel" aria-labelledby={`heading-tutorial-${v.id}`} data-parent="#accordion">
                                        <div className="card-body" dangerouslySetInnerHTML={{ __html: v.message, }}>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

export default connect((state) => ({ state, }))(Admin);
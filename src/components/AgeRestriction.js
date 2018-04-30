import React, {Component} from 'react';

class AgeRestrictionPage extends Component {

    render() {
        return (
        <div>
            <div className="valign-wrapper jc-center" style={{topPadding:200}}>
                <div className="container center-align">
                        <h3> You are not old enough to view the contents of this page. </h3>
                 </div>
            </div>
            <section id="footer" className="grey darken-3" style={{position:"fixed",bottom:0,left:0,width:"100%"}}>
                <div className="row">
                    <div className="col s3"></div>
                        <div className="col s6 center-align white-text">
                            © 2018 All Rights Reserved Terms of Use and Privacy Policy
                        </div>
                </div>
            </section>
        </div>
        );
      }
    };

export default AgeRestrictionPage;

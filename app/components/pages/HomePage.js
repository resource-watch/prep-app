import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Header from '../commons/Header';
import Title from '../commons/Title';
import ChartCard from '../cards/ChartCard';
import Map from '../maps/Map';
import Button from '../commons/Button';
import Modal from '../commons/Modal';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contactModalOpen: false
    };
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.setState({ contactModalOpen: true });
  }

  render() {
    const data = {
      map: {
        tile: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      },
      'graph-1': {"json_spec":{"padding":{"top":30,"left":28,"bottom":30,"right":5},"data":[{"name":"line","values":[{"x":1990,"y":210},{"x":1991,"y":215},{"x":1992,"y":230},{"x":1993,"y":250},{"x":1994,"y":310},{"x":1995,"y":290},{"x":1996,"y":314},{"x":1997,"y":316},{"x":1998,"y":315},{"x":1999,"y":310},{"x":2000,"y":305},{"x":2001,"y":290},{"x":2002,"y":250},{"x":2003,"y":254},{"x":2004,"y":290},{"x":2005,"y":285},{"x":2006,"y":280},{"x":2007,"y":278},{"x":2008,"y":276},{"x":2009,"y":278},{"x":2010,"y":271},{"x":2011,"y":260}],"format":{"parse":{"x":"date"}}},{"name":"area","values":[{"x":1990,"y":250},{"x":1991,"y":285},{"x":1992,"y":280},{"x":1993,"y":280},{"x":1994,"y":300},{"x":1995,"y":250},{"x":1996,"y":304},{"x":1997,"y":316},{"x":1998,"y":314},{"x":1999,"y":300},{"x":2000,"y":295},{"x":2001,"y":270},{"x":2002,"y":240},{"x":2003,"y":234},{"x":2004,"y":280},{"x":2005,"y":285},{"x":2006,"y":270},{"x":2007,"y":290},{"x":2008,"y":281},{"x":2009,"y":275},{"x":2010,"y":267},{"x":2011,"y":258}],"format":{"parse":{"x":"date"}}},{"name":"axis","values":[{"x":"Year","y":"Number of days exceeding"}]}],"scales":[{"name":"x","type":"time","range":"width","domain":{"fields":[{"data":"line","field":"x"},{"data":"area","field":"x"}]}},{"name":"y","type":"linear","range":"height","domain":{"fields":[{"data":"line","field":"y"},{"data":"area","field":"y"}]},"nice":true,"zero":false}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"%Y","properties":{"ticks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#3B4F63"},"opacity":{"value":0.5},"strokeWidth":{"value":0}},"labels":{"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"dy":{"value":5}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"grid":{"stroke":{"value":"#000"},"strokeOpacity":{"value":0.1},"strokeWidth":{"value":1}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5}}}}],"marks":[{"type":"line","from":{"data":"line"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"value":"#1a3e62"},"strokeWidth":{"value":3}}}},{"type":"area","from":{"data":"area"},"properties":{"enter":{"interpolate":{"value":"linear"},"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"y2":{"field":{"group":"height"}},"fill":{"value":"#000000"},"opacity":{"value":0.07}}}},{"type":"text","from":{"data":"axis"},"properties":{"enter":{"x":0,"y":0,"text":{"template":"{{datum.y | upper}}"},"dx":{"value":-25},"dy":{"value":-20},"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":700},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"align":{"value":"left"}}}},{"type":"text","from":{"data":"axis"},"properties":{"enter":{"x":0,"y":{"field":{"group":"height"},"mult":1},"text":{"template":"{{datum.x | upper}}"},"dx":{"value":-25},"dy":{"value":22},"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":700},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"align":{"value":"left"}}}}]}},
      'graph-2': {"json_spec":{"padding":{"top":30,"left":28,"bottom":30,"right":5},"data":[{"name":"line","values":[{"x":1990,"y":65},{"x":1991,"y":47},{"x":1992,"y":5},{"x":1993,"y":98},{"x":1994,"y":37},{"x":1995,"y":54},{"x":1996,"y":93},{"x":1997,"y":5},{"x":1998,"y":15},{"x":1999,"y":67},{"x":2000,"y":86},{"x":2001,"y":90},{"x":2002,"y":3},{"x":2003,"y":54},{"x":2004,"y":90},{"x":2005,"y":73},{"x":2006,"y":80},{"x":2007,"y":78},{"x":2008,"y":76},{"x":2009,"y":77},{"x":2010,"y":71},{"x":2011,"y":53}],"format":{"parse":{"x":"date"}}},{"name":"area","values":[{"x":1990,"y":46},{"x":1991,"y":38},{"x":1992,"y":33},{"x":1993,"y":33},{"x":1994,"y":23},{"x":1995,"y":22},{"x":1996,"y":24},{"x":1997,"y":47},{"x":1998,"y":48},{"x":1999,"y":37},{"x":2000,"y":59},{"x":2001,"y":57},{"x":2002,"y":34},{"x":2003,"y":44},{"x":2004,"y":37},{"x":2005,"y":39},{"x":2006,"y":27},{"x":2007,"y":38},{"x":2008,"y":28},{"x":2009,"y":37},{"x":2010,"y":39},{"x":2011,"y":48}],"format":{"parse":{"x":"date"}}},{"name":"axis","values":[{"x":"Year","y":"Number of alerts"}]}],"scales":[{"name":"x","type":"time","range":"width","domain":{"fields":[{"data":"line","field":"x"},{"data":"area","field":"x"}]}},{"name":"y","type":"linear","range":"height","domain":{"fields":[{"data":"line","field":"y"},{"data":"area","field":"y"}]},"nice":true,"zero":false}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"%Y","properties":{"ticks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#3B4F63"},"opacity":{"value":0.5},"strokeWidth":{"value":0}},"labels":{"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"dy":{"value":5}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"grid":{"stroke":{"value":"#000"},"strokeOpacity":{"value":0.1},"strokeWidth":{"value":1}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5}}}}],"marks":[{"type":"line","from":{"data":"line"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"value":"#1a3e62"},"strokeWidth":{"value":3}}}},{"type":"area","from":{"data":"area"},"properties":{"enter":{"interpolate":{"value":"linear"},"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"y2":{"field":{"group":"height"}},"fill":{"value":"#000000"},"opacity":{"value":0.07}}}},{"type":"text","from":{"data":"axis"},"properties":{"enter":{"x":0,"y":0,"text":{"template":"{{datum.y | upper}}"},"dx":{"value":-25},"dy":{"value":-20},"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":700},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"align":{"value":"left"}}}},{"type":"text","from":{"data":"axis"},"properties":{"enter":{"x":0,"y":{"field":{"group":"height"},"mult":1},"text":{"template":"{{datum.x | upper}}"},"dx":{"value":-25},"dy":{"value":22},"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":700},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"align":{"value":"left"}}}}]}},
      'graph-3': {"json_spec":{"padding":{"top":30,"left":28,"bottom":30,"right":5},"data":[{"name":"line","values":[{"x":"2010-01-01T00:00:00Z","y":2},{"x":"2010-02-01T00:00:00Z","y":3},{"x":"2010-03-01T00:00:00Z","y":1},{"x":"2010-04-01T00:00:00Z","y":3},{"x":"2010-05-01T00:00:00Z","y":3},{"x":"2010-06-01T00:00:00Z","y":8},{"x":"2010-07-01T00:00:00Z","y":16},{"x":"2010-08-01T00:00:00Z","y":24},{"x":"2010-09-01T00:00:00Z","y":12},{"x":"2010-10-01T00:00:00Z","y":10},{"x":"2010-11-01T00:00:00Z","y":8},{"x":"2010-12-01T00:00:00Z","y":6}],"format":{"parse":{"x":"date"}}},{"name":"area","values":[{"x":"2010-01-01T00:00:00Z","y":1},{"x":"2010-02-01T00:00:00Z","y":2},{"x":"2010-03-01T00:00:00Z","y":1},{"x":"2010-04-01T00:00:00Z","y":4},{"x":"2010-05-01T00:00:00Z","y":2},{"x":"2010-06-01T00:00:00Z","y":4},{"x":"2010-07-01T00:00:00Z","y":7},{"x":"2010-08-01T00:00:00Z","y":9},{"x":"2010-09-01T00:00:00Z","y":13},{"x":"2010-10-01T00:00:00Z","y":17},{"x":"2010-11-01T00:00:00Z","y":10},{"x":"2010-12-01T00:00:00Z","y":3}],"format":{"parse":{"x":"date"}}},{"name":"axis","values":[{"x":"Month","y":"Number of alerts"}]}],"scales":[{"name":"x","type":"time","range":"width","domain":{"fields":[{"data":"line","field":"x"},{"data":"area","field":"x"}]}},{"name":"y","type":"linear","range":"height","domain":{"fields":[{"data":"line","field":"y"},{"data":"area","field":"y"}]},"nice":true,"zero":false}],"axes":[{"name":"lbl","type":"x","scale":"x","ticks":5,"format":"%b","properties":{"ticks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#3B4F63"},"opacity":{"value":0.5},"strokeWidth":{"value":0}},"labels":{"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"dy":{"value":5}}}},{"type":"y","ticks":7,"scale":"y","grid":true,"layer":"back","format":"f","properties":{"ticks":{"stroke":{"value":"steelblue"}},"majorTicks":{"strokeWidth":{"value":0}},"axis":{"stroke":{"value":"#333"},"strokeWidth":{"value":0}},"grid":{"stroke":{"value":"#000"},"strokeOpacity":{"value":0.1},"strokeWidth":{"value":1}},"labels":{"fontSize":{"value":10},"fontWeight":{"value":300},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5}}}}],"marks":[{"type":"line","from":{"data":"line"},"properties":{"enter":{"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"stroke":{"value":"#1a3e62"},"strokeWidth":{"value":3}}}},{"type":"area","from":{"data":"area"},"properties":{"enter":{"interpolate":{"value":"linear"},"x":{"scale":"x","field":"x"},"y":{"scale":"y","field":"y"},"y2":{"field":{"group":"height"}},"fill":{"value":"#000000"},"opacity":{"value":0.07}}}},{"type":"text","from":{"data":"axis"},"properties":{"enter":{"x":0,"y":0,"text":{"template":"{{datum.y | upper}}"},"dx":{"value":-25},"dy":{"value":-20},"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":700},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"align":{"value":"left"}}}},{"type":"text","from":{"data":"axis"},"properties":{"enter":{"x":0,"y":{"field":{"group":"height"},"mult":1},"text":{"template":"{{datum.x | upper}}"},"dx":{"value":-25},"dy":{"value":22},"font":{"value":"\"Montserrat\", sans-serif"},"fontSize":{"value":10},"fontWeight":{"value":700},"fill":{"value":"#3B4F63"},"opacity":{"value":0.5},"align":{"value":"left"}}}}]}}
    };

    return (
      <div className="l-homepage">
        <Header type="large" pageType={4}>
          <Title inverse border type={'mega'}>
            Enabling collective action to manage climate risks
          </Title>
        </Header>

        <div className="wrapper">
          <section className="homepage-mission">
            <div className="content">
              <Title border type="section">
                Our mission
              </Title>
              <p>
                The C-PREP platform seeks to help planners, investors, and
                resource managers around the globe rapidly assess and
                incorporate climate risks into their decisions by enhancing
                access to the best available data, and insights on climate
                change. It leverages innovations in information and
                communication technologies to strengthen climate risks
                assessments and resilience planning.
              </p>
            </div>
            <div className="floating-card">
              <img
                src={gon.assets.homeAccessible}
                alt="Accessible, authoritative assessments"
              />
              <Title border type="section">
                Accessible, authoritative assessments
              </Title>
              <p>
                This platform supports a next generation of living climate
                assessment and resilience plans. It provides access to relevant
                data, tools and case studies from authoritative sources, and
                allows you to seamlessly incorporate your own local content,
                regardless of scale. Create unique data visualizations or
                explore those created by others to easily disseminate and
                discover climate risk data.
              </p>
            </div>
          </section>
        </div>

        <section className="background-image"></section>

        <div className="wrapper">
          <section className="homepage-problem">
            <div className="content">
              <Title
                border
                borderType={3}
                type="section"
                subtitle={{
                  title: 'Go to insights',
                  href: '/insights'
                }}
              >
                Understanding the problem
              </Title>
              <p className="text">
                Around the world, there is a growing recognition that, no matter
                what steps may be taken to control greenhouse gas emissions, we
                must prepare for the impacts of greater climate variability and
                change. Municipalities are making commitments to take action
                under the Paris Agreement and the UN Sustainable Development
                Goals. To facilitate a clear path forward, we must increase
                access to robust and actionable information, give guidance on
                using data to manage risks, and make the results easy to
                understand and share.
              </p>
              <div className="indicators">
                <div className="indicator">
                  <h3 className="name">Global temperature</h3>
                  <div className="value">1.4<sup>ºF</sup></div>
                  <div className="context">Since 1880</div>
                </div>
                <div className="separator"></div>
                <div className="indicator">
                  <h3 className="name">Carbon Dioxide</h3>
                  <div className="value">402.56</div>
                  <div className="context">Parts per million</div>
                </div>
                <div className="separator"></div>
                <div className="indicator">
                  <h3 className="name">Sea Level</h3>
                  <div className="value">3.39</div>
                  <div className="context">mm per year</div>
                </div>
              </div>
              <div className="insight">
                <img src={gon.assets.homeUnderstanding} alt="New York" />
                <Link to="/insights/framer-assesses-crops-impact">
                  Go to Framer assesses possible impacts of climate change on
                  his crops (grapes) insight
                </Link>
              </div>
            </div>
          </section>
        </div>

        <section className="homepage-analysis">
          <div className="wrapper">
            <div className="content">
              <Title
                border
                type="section"
                subtitle={{
                  title: 'Go to dashboards',
                  href: '/dashboards'
                }}
              >
                Urgent and accurate analysis
              </Title>
              <p className="text">
                Dashboards give rapid insights on climate risk indicators,
                showing the most pressing issues and the impacts of actions
                taken against them. View some of the dashboards that users have
                already submitted, suggest edits or create your own to highlight
                key issues in your area.
              </p>
            </div>
            <div className="cards">
              <div className="card -big">
                <ChartCard
                  title="Lorem ipsum dolor set"
                  subtitle="water"
                  data={data['graph-1']}
                />
              </div>
              <div className="card">
                <ChartCard
                  title="Lorem ipsum dolor set"
                  subtitle="water"
                  data={data['graph-2']}
                />
              </div>
              <div className="card">
                <ChartCard
                  title="Ipsum alerts"
                  subtitle="Forest"
                  data={data['graph-3']}
                />
              </div>
            </div>
            <div className="link">
              <Link to="/dashboards/framer-assesses-crops-impact">
                Go to Framer assesses possible impacts of climate change on his
                crops (grapes) dashboard
              </Link>
            </div>
          </div>
        </section>

        <div className="wrapper">
          <section className="homepage-map">
            <Title
              border
              borderType={2}
              type="section"
              subtitle={{
                title: 'Go to data',
                href: '/data'
              }}
            >
              Explore the latest data
            </Title>
            <p className="text">
              Interact with national, regional, and local data on this web map.
              Filter by topic, projection models, and an area of impact to
              create a custom map within seconds.  When you’re ready, publish or
              share your findings to raise awareness in your community.
            </p>
            <div className="map">
              <Map data={data.map} />
            </div>
          </section>
        </div>

        <section className="homepage-contact">
          <div className="wrapper">
            <div className="container">
              <div className="content">
                <Title
                  inverse
                  border
                  type="section"
                >
                  We want to hear from you
                </Title>
                <p className="text">
                  C-PREP aims to enhance access to climate risk data, and can
                  only achieve that with thorough feedback from users like you.
                  <br />Interested in formally joining the collaboration? Please
                  contact us here.
                </p>
              </div>
              <form className="contact-box">
                <input type="email" placeholder="your@email.org" className="email" />
                <textarea placeholder="Your message here" className="message"></textarea>
                <Button
                  fill
                  border
                  click={e => this.onSubmitForm(e)}
                >
                  Send message
                </Button>
              </form>

            </div>
            <Modal
              opened={this.state.contactModalOpen}
              close={() => this.setState({ contactModalOpen: false })}
            >
              <div className="content">
                This page is currently under development.
                Please reach us <Link to="/contact">here</Link>.
              </div>
            </Modal>
          </div>
        </section>

      </div>
    );
  }
}

HomePage.propTypes = {
  /**
   * Define the route path (from the router)
   */
  currentPage: React.PropTypes.string,
};

export default HomePage;

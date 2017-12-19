import React from 'react';
import ChartCard from '../../../Cards/ChartCard';
import IFrame from '../../../IFrame';
import EmbedMap from '../../../EmbedMap';
import ShareModal from '../../../Modal/ShareModal';

import seasonal from './jsons/seasonal.json';
import tigray from './jsons/tigray.json';
import chirps from './jsons/chirps.json';
import somaliSeasonal from './jsons/somali-seasonal.json';
import tigraySeasonal from './jsons/tigray-seasonal.json';

const tigrayMap = 'https://prep.carto.com/u/prep-admin/viz/c7fc6dc6-4b08-4d23-ac0b-ff07144ad89a/embed_map';
const somaliaMap = 'https://prep.carto.com/u/prep-admin/viz/5824b7fa-705a-11e6-bb05-0e3ebc282e83/embed_map';
const forecastMap = 'https://prep.carto.com/u/prep-admin/viz/8e9860a4-7058-11e6-aa42-0e233c30368f/embed_map';

const ethiopia01 = '/images/insights/ethiopia/Insight_Ethiopia01.png';
const ethiopiaMap = '/images/insights/ethiopia/Insight_Ethiopia02.png';


class EthiopiaInsight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShare: false,
      shareUrl: '',
      shareTitle: '',
      widgetSlug: ''
    };
    this.setShareModal = this.setShareModal.bind(this);
  }

  setShareModal(url, section, widgetSlug) {
    this.setState({
      modalShare: true,
      shareUrl: url,
      shareTitle: `Share this ${section}`,
      widgetSlug
    });
  }

  render() {
    return (
      <div className="">
        <article className="c-article">
          <div className="c-article-module -no-top">
            <div className="row align-center">
              <div className="column small-12 medium-6 flex align-stretch">
                <img src={ethiopia01} alt="Ethiopia" />
              </div>

              <div className="column align-middle small-12 medium-6 flex align-stretch">
                <ChartCard
                  link=""
                  title="Ethiopia crop calendar"
                  subtitle=""
                  data={{ widget_config: seasonal, slug: 'ethiopia-crop-calendar', data_url: '' }}
                  setShareModal={this.setShareModal}
                  noMargin
                />
              </div>
            </div>
          </div>

          <div className="c-article-module -large-margin -no-bottom">
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <p>Agricultural growth depends on the ability of Ethiopia’s farmers to maintain productive crops using subsistence farming, leaving them exceptionally dependent on rainfall. Farming processes and smallholder farmers are highly sensitive to climate changes.</p>
                <p>Ethiopia’s two grain growing seasons are belg and meher. Belg is the shorter season from February to April, and meher is the main season from May to September.  Grain production (including mainly corn, wheat, sorghum, barley, and teff) greatly depends on rainfall patterns during the belg season. Some years see changes in onset and completion of growing seasons, which impact crop production and quality.</p>
                <p>The landlocked country of Ethiopia also faces problematic issues related to its geographical location, which are further exacerbated by climate change. It contains two agricultural regions, the lowlands and the highlands, which are prone to higher temperatures, prolonged droughts, precipitation variations, soil erosion, and desertification. Most of Ethiopia’s livestock grazing land is found in the lowlands, and most of the subsistence farms are found in the highlands.</p>
              </div>
            </div>
          </div>
        </article>

        <article className="c-article">
          <div className="c-article-module -no-top">
            <div className="row">
              <div className="column small-12 medium-12 flex align-right align-middle">
                <button className="c-button -action highlighted -theme-3" onClick={() => this.setShareModal('http://climateserv.nsstc.nasa.gov', 'map')}>
                  <span>Share</span>
                </button>
                <div className="c-button -icon flex" onClick={() => this.setShareModal('http://climateserv.nsstc.nasa.gov', 'map')}>
                  <svg className="-icon" width="10" height="12" viewBox="0 0 10 12">
                    <title>icon-share</title>
                    <g fill="#25b5cd">
                      <path d="M6.45 1l1.414 1.414-4.95 4.95L1.5 5.95zM0 10h10v2H0z" />
                      <path d="M9 1V0H2v2h5v5h2V1z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="c-article-module -large-margin -no-top">
            <div className="row align-center">
              <div className="column small-12 medium-12">
                <IFrame src="http://climateserv.nsstc.nasa.gov" />
              </div>
            </div>
          </div>
          <div className="c-article-module">
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <p>This study includes three case studies, which focus on Tigray, Somali, and Gambela, Ethiopia’s agriculture-based regional states that are particularly vulnerable to climate change.</p>
                <ul>
                  <li>The first case study highlights the overall drought issue in the Tigray region.</li>
                  <li>The second compares seasonal drought forecasts in Tigray and Somali.</li>
                  <li>The third case study explores how the rainfall variability in past rainfall manifests in the forecasted rainfall over Gambela region.</li>
                </ul>
                <p>The goal of these case studies is to show how climate data provided by NASA SERVIR’s ClimateServ system (<a href="http://climateserv.nsstc.nasa.gov/">http://climateserv.nsstc.nasa.gov/</a>) can be used by end-users to understand historical and near-term seasonal forecasts as related to agricultural productivity. </p>
                <p>Potential end-users include the following</p>
                <ul>
                  <li><strong className="highlighted -theme-3">The Ethiopia Ministry of Agriculture and Natural Resources</strong>, which seeks to create an agricultural system that uses advanced technology to prevent poverty in its society</li>
                  <li><strong className="highlighted -theme-3">The Ethiopia National Meteorology Agency</strong>, which analyzes and reports weather and climate conditions in Ethiopia for the benefit of Ethiopian economic and social development.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Case study I: Tigray</h2>
              <div className="c-article-module -large-margin -no-top">
                <p>The first region of focus is Tigray in northern Ethiopia, where about 80% of the population are farmers residing in rural areas with high poverty and food scarcity (FAO). Farming systems in this area consist mainly of mixed farming of teff, wheat, and barley crops and livestock.</p>
              </div>
              <EmbedMap title="Tigray, Ethiopia" legend="SOURCE: WIKIPEDIA" url={tigrayMap} />
            </div>
          </div>

          <div className="c-article-module -large-margin">
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <p>The map bellow shows an overview of CHIRPS rainfall data and eMODIS Normalized Difference Vegetation Index (NDVI) for 2015 averaged over the Tigray region. NDVI is a common measurement of greenness in live vegetation, and is often used as a proxy for vegetation amounts, health and productivity.  Figure 4 is a typical example of how NDVI can be used to learn about the vegetation differences in an area from year to year.  Positive changes from 2014 to 2015 are shown in green areas, whereas the decreases in vegetation amounts are shown in brown areas.  Given that the rainfall over a region is the most important input to the vegetation amount and health, it is natural that the two will show a strong correlation. Furthermore, scientific literature shows that the vegetation amount has a strong correlation with the crop yields.</p>
              </div>
            </div>
          </div>

          <div className="c-full-width">
            <img src={ethiopiaMap} alt="Ethiopia Map" />
          </div>

          <div className="c-article-module -large-margin -no-bottom">
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <p>This study highlights the relationship between NDVI and rainfall, and enables researchers to link patterns of rainfall with their effects in terms of vegetation health. Decreases in both precipitation and vegetation health indicate possible ongoing drought conditions and negative effects for grain setting and production during the growing season.  By knowing this relationship and comparing NDVI between the current year and previous years, researchers can begin to forecast threats to overall grain productivity for a region, even before yields are actually recorded on the ground. A correlation between rainfall and NDVI is apparent in the charts below. As the rainfall amount increases, NDVI also increases, which indicates opportunities for agricultural growth.</p>
              </div>
            </div>
          </div>

          <div className="c-article-module -large-margin -no-top">
            <div className="row align-center">
              <div className="column align-middle small-12 medium-6">
                <ChartCard
                  link=""
                  title="East Africa eMODIS NDVI"
                  subtitle="NDVI FOR TIGRAY REGION IN ETHIOPIA"
                  data={{ widget_config: tigray, slug: 'east-africa-emodis-ndvi', data_url: '' }}
                  setShareModal={this.setShareModal}
                />
              </div>

              <div className="column align-middle small-12 medium-6">
                <ChartCard
                  link=""
                  title="CHIRPS Rainfall"
                  subtitle="RAINFALL FOR TIGRAY REGION IN ETHIOPIA"
                  data={{ widget_config: chirps, slug: 'chirps-rainfall', data_url: '' }}
                  setShareModal={this.setShareModal}
                />
              </div>
            </div>
          </div>
        </article>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Case study II: Somali</h2>
              <div className="c-article-module -large-margin -no-top">
                <p>The second region of focus is Somali in eastern Ethiopia, where four major river basins contribute to the region’s irrigable land potential, and droughts contribute to the region’s poverty. Pastoralism is the most common type of livelihood in the lowland areas of Somali, followed by mixed farming of livestock and maize and sorghum crops.</p>
              </div>
              <EmbedMap title="Somali, Ethiopia" legend="SOURCE: WIKIPEDIA" url={somaliaMap} />
            </div>
          </div>

          <div className="c-article-module -large-margin -no-bottom">
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <p>Compares seasonal forecasts for average precipitation in the Somali region (left chart bellow) and Tigray region of Ethiopia (right chart bellow) for the grain-filling stage of the growing season from mid-September to mid-October.</p>
                <p>This period during the growing season is when grain crops are particularly susceptible to water deficits, and thus anticipating drought conditions can help farmers anticipate and plan for yield shortfalls.  The figures indicate seasonal forecasts (using North American Multi-model Ensembles, NMME) for both regions, which include periods of low and high precipitation forecasts.  Knowing this information, the Ministries of Agriculture and Natural Resources and Meteorology can help farmers prepare for short periods of dry weather with occasional and sometimes damaging stronger rainfall events.</p>
              </div>
            </div>
          </div>

          <div className="c-article-module -no-top">
            <div className="row align-center">
              <div className="column align-middle small-12 medium-6">
                <ChartCard
                  link=""
                  title="Somali seasonal forecast"
                  subtitle="NORTH AMERICAN MULTIMODEL ENSEMBLE (N MME)"
                  data={{ widget_config: somaliSeasonal, slug: 'somali-seasonal-forecast', data_url: '' }}
                  setShareModal={this.setShareModal}
                />
              </div>

              <div className="column align-middle small-12 medium-6">
                <ChartCard
                  link=""
                  title="Tigray seasonal forecast"
                  subtitle="NORTH AMERICAN MULTIMODEL ENSEMBLE (N MME)"
                  data={{ widget_config: tigraySeasonal, slug: 'tigray-seasonal-forecast', data_url: '' }}
                  setShareModal={this.setShareModal}
                />
              </div>
            </div>
          </div>
        </article>

        <article className="c-article">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Case study III: Gambela</h2>
              <div className="c-article-module -large-margin -no-top">
                <p>This case study focuses on Gambela in western Ethiopia and compares forecasted rainfall to historical rainfall on a regional basis. By comparing the forecasted belg grain-setting season rainfall with average historical rainfall during the same monthly period, it is possible to identify regions that are at risk of rainfall deficits and possible agricultural stress  (picture bellow)</p>
              </div>
              <EmbedMap title="High, Medium and Low terciles for forecasted 2016 grainsetting seasonal precipitation compared to 17-year historical data" legend="SOURCE: UAH, ESRI" url={forecastMap} />
            </div>
          </div>
          <div className="c-article-module -large-margin -no-bottom">
            <div className="row align-center">
              <div className="column small-12 medium-8">
                <p>In this case, cumulative NMME-forecasted precipitation for mid-September to mid-October 2016 was compared to CHIRPS-recorded precipitation for the same monthly period for each of the years during 2000-2015.  The results were color coded to easily identify areas that fell into the highest (green), mid (yellow), and low (red) terciles for cumulative rainfall for this period.  One region, Gambela, located in western Ethiopia and shown in red in the map, was found to be at risk and in the bottom 6% of average seasonal rainfall over the past 17 years.  The lack of rainfall overall during this period is important from a general planning perspective, but of additional interest is whether there are any notable trends occurring on a daily level.</p>
                <p>The “High, Medium and Low terciles for forecasted 2016 grainsetting seasonal precipitation compared to 17-year historical data” picture takes a closer look at the daily data, during past mid-September to mid-October in the Gambela region, and several general trends become apparent.</p>
                <ul>
                  <li>First, forecasted precipitation peaks for 2016 are not as great as in past years.</li>
                  <li>Second, the general trend is for less cumulative rainfall on a daily basis over most of the entire period.</li>
                  <li>Third, and perhaps most importantly, the forecast model calls for a dry period in the first week or more of October, a grain-setting period in which sufficient precipitation is vitally important for overall crop yields.</li>
                </ul>
                <p>Similar analysis can be performed for a monthly total, and with all the ensemble members of the NMME dataset, and a potentially similar structure will appear. The critical point of this analysis is that such information can be used to reach out to farmers in this region and commence planning for the effects of a potential drought on belg grain production in Gambela.</p>
              </div>
            </div>
          </div>
        </article>

        <article className="c-article -no-border">
          <div className="row align-center">
            <div className="column small-12 medium-8">
              <h2>Conclusion</h2>
              <p>As changing climate affects Ethiopia’s available resources and agricultural development, analysis of rainfall and vegetation changes, like that outlined in these three case studies, enables actionable information in readily useable format for the growing Ethiopian population to better understand the effects to increase resilience to future impacts of climate change.</p>
            </div>
          </div>
        </article>

        <ShareModal
          title={this.state.shareTitle}
          url={this.state.shareUrl}
          opened={this.state.modalShare}
          close={() => this.setState({ modalShare: false })}
          widgetSlug={this.state.widgetSlug}
        />
      </div>
    );
  }
}

EthiopiaInsight.propTypes = {};

export default EthiopiaInsight;

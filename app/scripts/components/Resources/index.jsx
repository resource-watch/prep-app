import React from 'react';
import Article from '../Content/Article';
import Thumbnail from '../Thumbnails/Thumbnail';
import ipccLogo from '../../../images/resources/ipcc_logo.png';
import ncaLogo from '../../../images/resources/nationalClimateAsset_logo.png';
import usToolkitLogo from '../../../images/resources/ustoolkit_logo.png';
import ukcipLogo from '../../../images/resources/ukcip_logo.png';
import calAdaptLogo from '../../../images/resources/caladapt_logo.png';
import c40Logo from '../../../images/resources/c40cities_logo.png';
import almLogo from '../../../images/resources/alm_logo.png';
import copernicusLogo from '../../../images/resources/copernicus_logo.png';
import climateDataGovLogo from '../../../images/resources/datagovclimate_logo.png';
import iriLogo from '../../../images/resources/iri_logo.png';
import servirLogo from '../../../images/resources/servilglobal_logo.png';
import worldBankLogo from '../../../images/resources/WorldBankGorup_logo.png';
import weAdaptLogo from '../../../images/resources/logo-weAdapt-resource.png';
import ccafsLogo from '../../../images/resources/logo-CCAFS-resource.png'

function Resources() {
  return (
    <div className="c-partners">
      <div className="sliced"></div>

      <Article no-border>
        <p>Find selected resources for understanding the impacts of climate change,
          tools for building resilience to climate change, and additional
          climate relevant data.
        </p>
      </Article>

      <Article grid="small-12">
        <h2>Understanding impacts of climate change</h2>

        <div className="row align-stretch">
          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'http://www.ipcc.ch/report/ar5/'}
                src={ipccLogo}
                alt={'Intergovernmental Panel on Climate Change'}
                border={'neutral'}
              />

              <h3>IPCC 5th Assessment Report</h3>
              <p>
                The Intergovernmental Panel on Climate Change (IPCC) is the international
                body for assessing the science related to climate change. The IPCC’s periodic
                assessments of the causes, impacts, and possible response strategies to climate
                change are the most comprehensive and up-to-date reports available on the subject,
                and form the standard reference for all concerned with climate change in academia,
                government, and industry worldwide.
              </p>
              <a href={'http://www.ipcc.ch/report/ar5/'} target="_blank">HTTP://WWW.IPCC.CH/REPORT/AR5/</a>
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'http://nca2014.globalchange.gov/'}
                src={ncaLogo}
                alt={'National Climate Assessment'}
                border={'neutral'}
              />

              <h3>U.S. National Climate Assessment</h3>
              <p>
                The National Climate Assessment summarizes the impacts of climate change on the
                United States, now and in the future. A team of more than 300 experts guided by a
                60-member Federal Advisory Committee produced the report, which was extensively
                reviewed by the public and experts, including federal agencies and a panel of the
                National Academy of Sciences.
              </p>
              <a href={'http://nca2014.globalchange.gov/'} target="_blank">HTTP://NCA2014.GLOBALCHANGE.GOV/</a>
            </div>
          </div>
        </div>
      </Article>

      <Article grid="small-12">
        <h2>Climate resilience tools and services</h2>

        <div className="row align-stretch">
          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'HTTPS://TOOLKIT.CLIMATE.GOV/'}
                src={usToolkitLogo}
                alt={'U.S. Climate Resilience Toolkit'}
                border={'neutral'}
              />
              <h3>U.S. Climate Resilience Toolkit</h3>
              <p>
                The U.S. Climate Resilience Toolkit includes a framework and tools to understand and address climate
                issues that impact people and their communities. The goal is to improve people’s ability to understand
                and manage their climate-related risks and opportunities, and to help them make their communities and
                businesses more resilient to extreme events.
              </p>
              <a href={'HTTPS://TOOLKIT.CLIMATE.GOV/'} target="_blank">HTTPS://TOOLKIT.CLIMATE.GOV/</a>
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'HTTP://WWW.UKCIP.ORG.UK/WIZARD/'}
                src={ukcipLogo}
                alt={'UK Climate Impacts Wizard'}
                border={'neutral'}
              />
              <h3>UK Climate Impacts Wizard</h3>
              <p>
                The UK Climate Wizard is a 5-step process to help you assess your organisation’s vulnerability to
                current climate and future climate change, identify options to address your organisation’s key climate
                risks, and help you develop and implement a climate change adaptation strategy.
              </p>
              <a href={'HTTP://WWW.UKCIP.ORG.UK/WIZARD/'} target="_blank">HTTP://WWW.UKCIP.ORG.UK/WIZARD/</a>
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'HTTP://CAL-ADAPT.ORG/'}
                src={calAdaptLogo}
                alt={'Cal-Adapt'}
                border={'neutral'}
              />

              <h3>Cal-Adapt</h3>
              <p>
                Cal-Adapt is a web-based climate adaptation planning tool designed to provide access to up-to-date
                information and data produced by the State of California's scientific and research community. The
                website provides interactive visualization tools, access to data, a community forum, local climate
                stories, climate education, and links to additional climate resources.
              </p>
              <a href={'HTTP://CAL-ADAPT.ORG/'} target="_blank">HTTP://CAL-ADAPT.ORG/</a>
            </div>
          </div>
        </div>

        <div className="row align-stretch">
          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'HTTP://WWW.ADAPTATIONLEARNING.NET/'}
                src={almLogo}
                alt={'Adaptation Learning Mechanism'}
                border={'neutral'}
              />

              <h3>Adaptation Learning Mechanism</h3>
              <p>
                The Adaptation Learning Mechanism (ALM) represents a collaborative, global learning process with leadership, facilitation, and strong
                participation by Southern institutions. Seeking to provide stakeholders with a common platform for
                sharing
                and learning, the ALM bridges knowledge gaps by bringing relevant knowledge and stakeholders together to
                exchange information, experiences, and expertise.
              </p>
              <a href={'HTTP://WWW.ADAPTATIONLEARNING.NET/'} target="_blank">HTTP://WWW.ADAPTATIONLEARNING.NET/</a>
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url="https://www.weadapt.org/"
                src={weAdaptLogo}
                alt="weADAPT"
                border={'neutral'}
              />

              <h3>weADAPT</h3>
              <p>
                weADAPT is a collaborative platform on climate adaptation issues. It allows practitioners, researchers
                and policy-makers to access credible, high-quality information, and connect with one another.
              </p>
              <a href={'https://www.weadapt.org/'} target="_blank">HTTPS://WWW.WEADAPT.ORG/</a>
            </div>
          </div>
        </div>

      </Article>

      <Article grid="small-12">
        <h2>Climate data portals</h2>

        <div className="row align-stretch">
          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'HTTPS://CLIMATE.COPERNICUS.EU/'}
                src={copernicusLogo}
                alt={'Copernicus – Climate Service'}
                border={'neutral'}
              />

              <h3>Copernicus – Climate Service</h3>
              <p>
                Copernicus consists of a complex set of systems which collect data from multiple sources: earth
                observation satellites and in situ sensors, such as ground stations, airborne and sea-borne sensors. It
                processes these data and provides users with reliable and up-to-date information through a set of
                services
                related to environmental and security issues.
              </p>
              <a href={'HTTPS://CLIMATE.COPERNICUS.EU/'} target="_blank">HTTPS://CLIMATE.COPERNICUS.EU/</a>
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'HTTP://CLIMATE.DATA.GOV'}
                src={climateDataGovLogo}
                alt={'Climate.Data.Gov'}
                border={'neutral'}
              />

              <h3>Climate.Data.Gov</h3>
              <p>
                Climate.Data.Gov provides access to Federal data related to climate change that can help inform and
                prepare America’s communities, businesses, and citizens for the changing climate. You can currently find
                data and resources related to coastal flooding, food resilience, water, ecosystem vulnerability, human
                health, energy infrastructure, transportation and the Arctic region.
              </p>
              <a href={'HTTP://CLIMATE.DATA.GOV'} target="_blank">CLIMATE.DATA.GOV</a>
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'http://iridl.ldeo.columbia.edu/index.html'}
                src={iriLogo}
                alt={'IRI/LDEO Climate Data Library'}
                border={'neutral'}
              />
              <h3>IRI/LDEO Climate Data Library</h3>
              <p>
                The IRI Data Library is an online data repository and analysis tool that allows a user to view, analyze,
                and download hundreds of terabytes of climate-related data through a standard web browser
              </p>
              <a href={'http://iridl.ldeo.columbia.edu'} target="_blank">http://iridl.ldeo.columbia.edu</a>
            </div>
          </div>
        </div>

        <div className="row align-stretch">
          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'HTTP://WWW.SERVIRGLOBAL.NET/'}
                src={servirLogo}
                alt={'SERVIR'}
                border={'neutral'}
              />

              <h3>SERVIR</h3>
              <p>
                A joint development initiative of National Aeronautics and Space Administration (NASA) and United States
                Agency for International Development (USAID), SERVIR works in partnership with leading regional
                organizations world-wide to help developing countries use information provided by Earth observing
                satellites and geospatial technologies for managing climate risks and land use.
              </p>
              <a
                href={'HTTP://WWW.SERVIRGLOBAL.NET/'}
                target="_blank">HTTP://WWW.SERVIRGLOBAL.NET/</a>
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url={'HTTP://SDWEBX.WORLDBANK.ORG/CLIMATEPORTAL/?PAGE=CLIMATE_DATA'}
                src={worldBankLogo}
                alt={'World Bank Climate Knowledge Portal'}
                border={'neutral'}
              />
              <h3>World Bank Climate Knowledge Portal</h3>
              <p>
                The Climate Change Knowledge Portal (CCKP) Beta is a central hub of information, data and reports about
                climate change around the world. In the CCKP you can query, map, compare, chart and summarize key
                climate
                and climate-related information.
              </p>
              <a href={'HTTP://SDWEBX.WORLDBANK.ORG/CLIMATEPORTAL/?PAGE=CLIMATE_DATA'} target="_blank">HTTP://SDWEBX.WORLDBANK.ORG/CLIMATEPORTAL/?PAGE=CLIMATE_DATA</a>
            </div>
          </div>

          <div className="columns small-12 medium-4">
            <div className="c-article-module">
              <Thumbnail
                url="http://ccafs-climate.org/"
                src={ccafsLogo}
                alt="CCFAS Climate-Data Portal"
                border={'neutral'}
              />
              <h3>CCFAS Climate-Data Portal</h3>
              <p>
                The CCAFS-Climate data portal provides global and regional future high-resolution climate datasets that
                serve as a basis for assessing the climate change impacts and adaptation in a variety of fields
                including biodiversity, agricultural and livestock production, and ecosystem services and hydrology.
              </p>
              <a href="http://ccafs-climate.org" target="_blank">HTTP://CCAFS-CLIMATE.ORG</a>
            </div>
          </div>
        </div>

      </Article>
    </div>
  );
}

export default Resources;

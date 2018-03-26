<template>
  <div class="animated fadeIn">
  <b-row>
      <b-col sm="12">
        <b-card no-body class="bg-none">
          <b-card-body class="p-0">
          </b-card-body>
          <card class="chart-wrapper px-0" style="height:400px;" height="400" id="map"></card>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Add</b-dropdown-item>
              <b-dropdown-item>Remove</b-dropdown-item>
              <b-dropdown-item>Edit</b-dropdown-item>
              <b-dropdown-item disabled>Re-assign</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">14</h4>
            <p>In-Field Technicians</p>
          </b-card-body>
          <card-line1-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
              <template slot="button-content">
                <i class="icon-location-pin"></i>
              </template>
              <b-dropdown-item>Add Job</b-dropdown-item>
              <b-dropdown-item>Delete Job</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">455</h4>
            <p>Jobs in last 30 days</p>
          </b-card-body>
          <card-line2-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Open Report</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">75%</h4>
            <p>On-time ratio.</p>
          </b-card-body>
          <card-line3-chart-example class="chart-wrapper" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Add Route</b-dropdown-item>
              <b-dropdown-item>Assign Technician</b-dropdown-item>
              <b-dropdown-item>Edit Route</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">14</h4>
            <p>Active Route</p>
          </b-card-body>
          <card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 id="traffic" class="card-title mb-0">Job History</h4>
          <div class="small text-muted">2018</div>
        </b-col>
        <b-col sm="7" class="d-none d-md-block">
          <b-button type="button" variant="primary" class="float-right"><i class="icon-cloud-download"></i></b-button>
          <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
            <b-form-radio-group class="mr-3" id="radiosBtn" buttons button-variant="outline-secondary" v-model="selected" name="radiosBtn">
              <b-form-radio class="mx-0" value="Day">Day</b-form-radio>
              <b-form-radio class="mx-0" value="Month">Month</b-form-radio>
              <b-form-radio class="mx-0" value="Year">Year</b-form-radio>
            </b-form-radio-group>
          </b-button-toolbar>
        </b-col>
      </b-row>
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
      <div slot="footer">
        <ul>
          <li>
            <div class="text-muted">On-Time Ratio</div>
            <strong>40%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="success" :value="40"></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">Jobs Completed</div>
            <strong>91%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="info" :value="91"></b-progress>
          </li>
          <li>
            <div class="text-muted">Avg. Off-Route time</div>
            <strong>27%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="warning" :value="27"></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">Reschedule Rate</div>
            <strong>18%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="danger" :value="18"></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">Return Service Call %</div>
            <strong>40.15%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" :value="40"></b-progress>
          </li>
        </ul>
      </div>
    </b-card>
    <b-row>
      <b-col md="12">
        <b-card header="Supplies &amp; Expenses">
          <b-row>
            <b-col sm="12" lg="4">
              <b-row>
                <b-col sm="6">
                  <Callout variant="info">
                    <small class="text-muted">Gas Costs</small><br>
                    <strong class="h4">9,123</strong>
                    <div class="chart-wrapper">
                      <callout-chart-example :data="[35, 23, 56, 22, 97, 23, 64]" variant="#20a8d8" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="danger">
                    <small class="text-muted">Equipment</small><br>
                    <strong class="h4">22,643</strong>
                    <div class="chart-wrapper">
                      <callout-chart-example :data="[65, 59, 84, 84, 51, 55, 40]" variant="#f86c6b" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0">
              <ul class="horizontal-bars">
                <li>
                  <div class="title">
                    Monday
                  </div>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="34" variant="info"></b-progress>
                    <b-progress height={} class="progress-xs" :value="78" variant="danger"></b-progress>
                  </div>
                </li>
                <li>
                  <div class="title">
                    Tuesday
                  </div>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="56" variant="info"></b-progress>
                    <b-progress height={} class="progress-xs" :value="94" variant="danger"></b-progress>
                  </div>
                </li>
                <li>
                  <div class="title">
                    Wednesday
                  </div>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="12" variant="info"></b-progress>
                    <b-progress height={} class="progress-xs" :value="67" variant="danger"></b-progress>
                  </div>
                </li>
                <li>
                  <div class="title">
                    Thursday
                  </div>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="43" variant="info"></b-progress>
                    <b-progress height={} class="progress-xs" :value="91" variant="danger"></b-progress>
                  </div>
                </li>
                <li>
                  <div class="title">
                    Friday
                  </div>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="22" variant="info"></b-progress>
                    <b-progress height={} class="progress-xs" :value="73" variant="danger"></b-progress>
                  </div>
                </li>
                <li>
                  <div class="title">
                    Saturday
                  </div>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="53" variant="info"></b-progress>
                    <b-progress height={} class="progress-xs" :value="82" variant="danger"></b-progress>
                  </div>
                </li>
                <li>
                  <div class="title">
                    Sunday
                  </div>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="9" variant="info"></b-progress>
                    <b-progress height={} class="progress-xs" :value="69" variant="danger"></b-progress>
                  </div>
                </li>
                <li class="legend">
                  <b-badge pill variant="info"></b-badge> <small>On-Time Rate</small> &nbsp; <b-badge pill variant="danger"></b-badge> <small>Completed Jobs</small>
                </li>
              </ul>
            </b-col>
            <b-col sm="6" lg="4">
              <b-row>
                <b-col sm="6">
                  <Callout variant="warning">
                    <small class="text-muted">Labor Cost</small><br>
                    <strong class="h4">78,623</strong>
                    <div class="chart-wrapper">
                      <callout-chart-example :data="[35, 23, 56, 22, 97, 23, 64]" variant="#f8cb00" width="80" height="30" />
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="success">
                    <small class="text-muted">Tools</small><br>
                    <strong class="h4">49,123</strong>
                    <div class="chart-wrapper">
                      <callout-chart-example :data="[65, 59, 84, 84, 51, 55, 40]" variant="#4dbd74" width="80px" height="30" />
                    </div>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0">
              <ul class="horizontal-bars type-2">
                <li>
                  <i class="icon-user"></i>
                  <span class="title">Callbacks</span>
                  <span class="value">23%</span>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="23" variant="warning"></b-progress>
                  </div>
                </li>
                <li>
                  <i class="icon-user-female"></i>
                  <span class="title">New Service</span>
                  <span class="value">37%</span>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="37" variant="warning"></b-progress>
                  </div>
                </li>
                <li class="divider"></li>
                <li>
                  <i class="icon-people"></i>
                  <span class="title">Yearly Labor</span>
                  <span class="value">191,235 <span class="text-muted small">(56%)</span></span>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="56" variant="success"></b-progress>
                  </div>
                </li>
                <li>
                  <i class="icon-pie-chart"></i>
                  <span class="title">Yearly Equipment</span>
                  <span class="value">51,223 <span class="text-muted small">(15%)</span></span>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="15" variant="success"></b-progress>
                  </div>
                </li>
                <li>
                  <i class="icon-wrench"></i>
                  <span class="title">Yearly Tools</span>
                  <span class="value">37,564 <span class="text-muted small">(11%)</span></span>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="11" variant="success"></b-progress>
                  </div>
                </li>
                <li>
                  <i class="icon-film"></i>
                  <span class="title">Yearly Advertising</span>
                  <span class="value">27,319 <span class="text-muted small">(8%)</span></span>
                  <div class="bars">
                    <b-progress height={} class="progress-xs" :value="8" variant="success"></b-progress>
                  </div>
                </li>
                <li class="divider text-center">
                  <b-button variant="link" size="sm" class="text-muted"><i class="icon-options"></i></b-button>
                </li>
              </ul>
            </b-col>
            <b-col sm="6" lg="4">
              <b-row>
                <b-col sm="6">
                  <Callout>
                    <small class="text-muted">Fleet Maint</small><br>
                    <strong class="h4">23%</strong>
                    <div class="chart-wrapper">
                      <callout-chart-example :data="[78, 81, 80, 45, 34, 12, 40]" width="80px" height="30" />
                    </div>
                  </Callout>
                </b-col>
                <b-col sm="6">
                  <Callout variant="primary">
                    <small class="text-muted">Cancel Rate</small><br>
                    <strong class="h4">5%</strong>
                    <div class="chart-wrapper">
                      <callout-chart-example :data="[35, 23, 56, 22, 97, 23, 64]" variant="#20a8d8" width="80px" height="30" />
                    </div>
                  </Callout>
                </b-col>
              </b-row>
              <hr class="mt-0">
              <ul class="icons-list">
                <li>
                  <i class="icon-screen-desktop bg-primary"></i>
                  <div class="desc">
                    <div class="title">Sam Smith</div>
                    <small>Route 1: Stop 3: 2 Stops remain</small>
                  </div>
                  <div class="value">
                    <div class="small text-muted">Jobs This Week</div>
                    <strong>19</strong>
                  </div>
                  <div class="actions">
                    <b-button variant="link" class="text-muted"><i class="icon-settings"></i></b-button>
                  </div>
                </li>
                <li>
                  <i class="icon-screen-smartphone bg-info"></i>
                  <div class="desc">
                  <div class="title">Jack Stanford</div>
                  <small>Route 7: Stop 2: 4 Stops remain</small>
                  </div>
                  <div class="value">
                    <div class="small text-muted">Jobs This Week</div>
                    <strong>22</strong>
                  </div>
                  <div class="actions">
                    <b-button variant="link" class="text-muted"><i class="icon-settings"></i></b-button>
                  </div>
                </li>
                <li>
                  <i class="icon-screen-smartphone bg-warning"></i>
                  <div class="desc">
                  <div class="title">Billy Bob</div>
                  <small>Route 3: Stop 2: 4 Stops remain</small>
                  </div>
                  <div class="value">
                    <div class="small text-muted">Jobs This Week</div>
                    <strong>19</strong>
                  </div>
                  <div class="actions">
                    <b-button variant="link" class="text-muted"><i class="icon-settings"></i></b-button>
                  </div>
                </li>
                <li>
                  <i class="icon-user bg-danger"></i>
                  <div class="desc">
                  <div class="title">Mary Sue</div>
                  <small>Route 4: Stop 4: 1 Stops remain</small>
                  </div>
                  <div class="value">
                    <div class="small text-muted">Jobs This Week</div>
                    <strong>14</strong>
                  </div>
                  <div class="actions">
                    <b-button variant="link" class="text-muted"><i class="icon-settings"></i></b-button>
                  </div>
                </li>
                <li>
                  <i class="icon-social-spotify bg-success"></i>
                  <div class="desc">
                  <div class="title">Sally Mae</div>
                  <small>Route 5: Stop 4: 2 Stops remain</small>
                  </div>
                  <div class="value">
                    <div class="small text-muted">Jobs This Week</div>
                    <strong>12</strong>
                  </div>
                  <div class="actions">
                    <b-button variant="link" class="text-muted"><i class="icon-settings"></i></b-button>
                  </div>
                </li>
                <li>
                  <i class="icon-cloud-download bg-danger"></i>
                  <div class="desc">
                  <div class="title">Tom Mizell</div>
                  <small>Route 6: Stop 1: 4 Stops remain</small>
                  </div>
                  <div class="value">
                    <div class="small text-muted">Jobs This Week</div>
                    <strong>30</strong>
                  </div>
                  <div class="actions">
                    <b-button variant="link" class="text-muted"><i class="icon-settings"></i></b-button>
                  </div>
                </li>
                <li>
                  <i class="icon-camera bg-warning"></i>
                  <div class="desc">
                  <div class="title">Andrew Tames</div>
                  <small>Route 8: Stop 3: 1 Stops remain</small>
                  </div>
                  <div class="value">
                    <div class="small text-muted">Jobs This Week</div>
                    <strong>17</strong>
                  </div>
                  <div class="actions">
                    <b-button variant="link" class="text-muted"><i class="icon-settings"></i></b-button>
                  </div>
                </li>
                <li class="divider text-center">
                  <b-button size="sm" variant="link" class="text-muted"><i class="icon-options"></i></b-button>
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
import CardBarChartExample from './dashboard/CardBarChartExample'
import MainChartExample from './dashboard/MainChartExample'
import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
import CalloutChartExample from './dashboard/CalloutChartExample'
import { Callout } from '../components/'

export default {
  name: 'dashboard',
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },
  data: function () {
    return {
      selected: 'Month',
      tableItems: [
        {
          avatar: { url: 'static/img/avatars/1.jpg', status: 'success' },
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'USA', flag: 'us' },
          usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Mastercard', icon: 'fa fa-cc-mastercard' },
          activity: '10 sec ago'
        },
        {
          avatar: { url: 'static/img/avatars/2.jpg', status: 'danger' },
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          country: { name: 'Brazil', flag: 'br' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Visa', icon: 'fa fa-cc-visa' },
          activity: '5 minutes ago'
        },
        {
          avatar: { url: 'static/img/avatars/3.jpg', status: 'warning' },
          user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'India', flag: 'in' },
          usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Stripe', icon: 'fa fa-cc-stripe' },
          activity: '1 hour ago'
        },
        {
          avatar: { url: 'static/img/avatars/4.jpg', status: '' },
          user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'France', flag: 'fr' },
          usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'PayPal', icon: 'fa fa-paypal' },
          activity: 'Last month'
        },
        {
          avatar: { url: 'static/img/avatars/5.jpg', status: 'success' },
          user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Spain', flag: 'es' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Google Wallet', icon: 'fa fa-google-wallet' },
          activity: 'Last week'
        },
        {
          avatar: { url: 'static/img/avatars/6.jpg', status: 'danger' },
          user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Poland', flag: 'pl' },
          usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Amex', icon: 'fa fa-cc-amex' },
          activity: 'Last week'
        }
      ],
      tableFields: {
        avatar: {
          label: '<i class="icon-people"></i>',
          class: 'text-center'
        },
        user: {
          label: 'User'
        },
        country: {
          label: 'Country',
          class: 'text-center'
        },
        usage: {
          label: 'Usage'
        },
        payment: {
          label: 'Payment method',
          class: 'text-center'
        },
        activity: {
          label: 'Activity'
        }
      }
    }
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    }
  }
}
</script>

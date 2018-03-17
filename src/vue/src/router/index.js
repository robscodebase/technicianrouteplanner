import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'

// import Colors from '@/views/theme/Colors'
// import Typography from '@/views/theme/Typography'

// import Charts from '@/views/Charts'
// import Widgets from '@/views/Widgets'

// Views - Components
// import Cards from '@/views/base/Cards'
// import Forms from '@/views/base/Forms'
// import Switches from '@/views/base/Switches'
// import Tables from '@/views/base/Tables'
// import Breadcrumbs from '@/views/base/Breadcrumbs'
// import Carousels from '@/views/base/Carousels'
// import Collapses from '@/views/base/Collapses'
// import Jumbotrons from '@/views/base/Jumbotrons'
// import ListGroups from '@/views/base/ListGroups'
// import Navs from '@/views/base/Navs'
// import Navbars from '@/views/base/Navbars'
// import Paginations from '@/views/base/Paginations'
// import Popovers from '@/views/base/Popovers'
// import ProgressBars from '@/views/base/ProgressBars'
// import Tooltips from '@/views/base/Tooltips'

// Views - Buttons
// import StandardButtons from '@/views/buttons/StandardButtons'
// import ButtonGroups from '@/views/buttons/ButtonGroups'
// import Dropdowns from '@/views/buttons/Dropdowns'
// import SocialButtons from '@/views/buttons/SocialButtons'

// Views - Icons
// import Flags from '@/views/icons/Flags'
// import FontAwesome from '@/views/icons/FontAwesome'
// import SimpleLineIcons from '@/views/icons/SimpleLineIcons'

// Views - Notifications
// import Alerts from '@/views/notifications/Alerts'
// import Badges from '@/views/notifications/Badges'
// import Modals from '@/views/notifications/Modals'

// Views - Pages
// import Page404 from '@/views/pages/Page404'
// import Page500 from '@/views/pages/Page500'
// import Login from '@/views/pages/Login'
// import Register from '@/views/pages/Register'

Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    }
  ]
})

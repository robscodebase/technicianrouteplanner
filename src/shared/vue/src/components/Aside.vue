<template>
  <aside class="aside-menu">
    <b-tabs>
      <b-tab title="<i class='icon-list'></i>">
        <Callout class="m-0 py-2 text-muted text-center bg-light text-uppercase">
          <small><b>Latest Activity</b></small>
        </Callout>
        <hr class="transparent mx-3 my-0">
        <Callout variant="warning" class="m-0 py-3">
          <div><strong>Lucas</strong> has arrived</div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; 3:00pm</small>
          <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; 223 Abc Ave. </small>
        </Callout>
        <hr class="mx-3 my-0">
        <Callout variant="info" class="m-0 py-3">
          <div><strong>Susan</strong> has departed</div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; 1:30pm</small>
          <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; 1535 NW West</small>
        </Callout>
        <Callout variant="info" class="m-0 py-3">
          <div><strong>Jason</strong> <strong> Off Route </strong> </div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; 35 minutes</small>
          <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; Cannot locate.</small>
        </Callout>
        <hr class="transparent mx-3 my-0">
        <Callout class="m-0 py-2 text-muted text-center bg-light text-uppercase">
          <small><b>Next Scheduled Appt.</b></small>
        </Callout>
        <hr class="transparent mx-3 my-0">
        <Callout variant="danger" class="m-0 py-3">
          <div><strong>Service Call</strong> - Repeat</div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; 10 - 11am</small>
          <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; 1578 South Lane</small>
        </Callout>
        <hr class="mx-3 my-0">
        <Callout variant="success" class="m-0 py-3">
          <div><strong>New Install -</strong> In-House</div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; 1 - 3pm</small>
          <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; 2589 Underwater Valley</small>
        </Callout>
        <hr class="mx-3 my-0">
        <Callout variant="primary" class="m-0 py-3">
          <div><strong>Sales Call</strong> - Corporate</div>
          <small class="text-muted mr-3"><i class="icon-calendar"></i>&nbsp; 4 - 6pm</small>
          <small class="text-muted"><i class="icon-location-pin"></i>&nbsp; creativeLabs HQ </small>
        </Callout>
        <hr class="mx-3 my-0">
      </b-tab>
    </b-tabs>
  </aside>
</template>

<script>
import Callout from './Callout'
import cSwitch from './Switch'
export default {
  name: 'c-aside',
  components: {
    Callout,
    cSwitch
  }
}
</script>

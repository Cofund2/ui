<script setup lang="ts">
  import { ref } from 'vue'

  class UsageFactor {
    name = ""
    f = 1
  }
  
  let calcTypes = {
    recRent: {
      label: "recurring costs split by ressource usage"
    }, 
    initialCostsCoverage: {
      label: "one time investement coverage"
    }
  } as {[id: string]: any}
  
  let fundingTypeList = Object.keys(calcTypes).map(key => ({key, label: calcTypes[key].label}))
  
  let resName = ref("") 
  let fundingType = ref("recRent")

  let costIntervals = ['weekly', 'monthly', 'yearly']
  let durations = ['minutes', 'hours', 'days', 'weeks']
  let recCosts = ref({
    interval: costIntervals[1], 
    amount: 100,
    currency: 'NEAR',
    
    yearlyFluct: (new Array(12)).fill(100),
    weeklyFluct: (new Array(7)).fill(100),
    dailyFluct: (new Array(24)).fill(100),
    
    profit: 0, 

    usageFactors: [] as UsageFactor[], 

    minN: {
      n: 1, 
      unit: durations[1], 
    }, 
    expectedDemand: {
      n: 1000, 
      unit: durations[1], 
      per: 'year'
    }
  })
  
  let initialCostsCoverage = ref({
    
  })
</script>

<template>
  <p>
    Use the following form to cofund a resource. 
  </p>
  <v-form>
    <v-text-field
    label="ressource name"
    variant="outlined"
    v-model="resName"
    > </v-text-field>
    <v-select 
    label="funding type"
    item-title="label"
    item-value="key"
    variant="outlined"
    v-model="fundingType"
    :items="fundingTypeList"></v-select>
    <template v-if="fundingType == 'recRent'" class="calcDetails">
      <h3>How do you pay the recurring costs for this resource?</h3>
      <v-select
      label="rent interval"
      variant="outlined"
      v-model="recCosts.interval"
      :items="costIntervals"
      ></v-select>
      <v-text-field
      label="rent amount"
      variant="outlined"
      v-model="recCosts.amount"
      > </v-text-field>
      <v-text-field
      label="rent currency"
      variant="outlined"
      v-model="recCosts.currency"
      > </v-text-field>
      <h3>profit / safety margin</h3>
      <p>Cofund is calculating booking prices based on your usage estimations. You can recalibrate Cofund based on the booking history when some time has passed. If you want to be on the safe side or if you intend to make some profit from funding this ressource, you can specify it here.</p>
      <p>1% extra is charged to finance the development and maintainance of this dApp.</p>
      <v-text-field
      label="profit relative to rent"
      variant="outlined"
      suffix="%"
      v-model="recCosts.profit"
      ></v-text-field>
      <h3>reservation duration</h3>
      <p>
        Specify the minimal reservation duration. 
      </p>
      <v-container fluid class='pa-0'>
        <v-row no-gutters>
          <v-col 
          cols="6">
            <v-text-field
            label="n"
            variant="outlined"
            v-model="recCosts.minN.n"></v-text-field>
          </v-col>
          <v-col 
          cols="6">
            <v-select 
            label="duration unit"
            variant="outlined"
            v-model="recCosts.minN.unit"
            :items="durations"></v-select>
          </v-col>
        </v-row>
      </v-container>  
      <!--h3>Usage factors</h3>
      <p>
        When somebody makes a booking, he will have to state a number for every usage factor. 
      </p>
      <p>
        An example would be the number of guests in a cofunded lodge. The price will rise by <i>f</i> times number of <b>additional</b> guests.
      </p>
      <v-container fluid class='pa-0'>
        <v-row no-gutters
        v-for="(uf, i) in recRent.usageFactors" 
        :key="i">
          <v-col 
          cols="6">
            <v-text-field
            label="name"
            variant="outlined"
            v-model="uf.name"></v-text-field>
          </v-col>
          <v-col 
          cols="4">
            <v-text-field
            label="factor f"
            variant="outlined"
            v-model="uf.f"></v-text-field>
          </v-col>
          <v-col     
          align="center"
          cols="2">
            <v-btn
            variant="outlined"
            @click="recRent.usageFactors.splice(i, 1)"
            >remove</v-btn>
          </v-col>
        </v-row>
      </v-container>  
      <v-btn
          class="button"
          variant="outlined"
          @click="recRent.usageFactors.push(new UsageFactor())"
        >
        add usage factor
      </v-btn-->
      <h3> interval & expected demand</h3>
      <p>
        Specify the expected demand over the course of one interval (respecting usage factors)
      </p>
      <v-container fluid class='pa-0'>
        <v-row no-gutters>
          <v-col 
          cols="4">
            <v-text-field
            label="n"
            variant="outlined"
            v-model="recCosts.expectedDemand.n"></v-text-field>
          </v-col>
          <v-col 
          cols="4">
            <v-select 
            label="duration unit"
            variant="outlined"
            v-model="recCosts.expectedDemand.unit"
            :items="durations"></v-select>
          </v-col>
          <v-col 
          cols="4">
            <v-select 
            label="per"
            variant="outlined"
            v-model="recCosts.expectedDemand.per"
            :items="durations"></v-select>
          </v-col>
        </v-row>
      </v-container>  
      <h3>Demand Fluctuation</h3>
      <p>
        Cofund will adapt prices to demand variations. 
        For example if bookings on the weekend are more popular, prices will be lower on workdays and higher on weekends. 
        This will ensure a more efficient usage of the ressource. 
      </p>
      <p> 
        With Cofund, you can automatically recalibrate the yearly, weekly and dayly demand variations based on the booking history after some time has passed. 
        You may give an initial estimate of demand variations. 
      </p>

      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          variant="outlined">
          <v-expansion-panel-title>
            Yearly fluctuation
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container fluid class='pa-0'>
              <v-row no-gutters>
                <v-col 
                  cols="4"
                  :key="i"
                  v-for="(item,i) in 12"
                >
                  <v-text-field
                  background-color="#f0f"
                  variant="outlined"          
                  suffix="%"
                  v-model="recCosts.yearlyFluct[i]"
                  :label="(new Date(1993, i, 13)).toLocaleString('default', { month: 'long' })"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
          variant="outlined">
          <v-expansion-panel-title>
            Weekly fluctuation
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container fluid class='pa-0'>
              <v-row no-gutters>
                <v-col 
                cols="4"
                :key="i"
                v-for="(item,i) in 7"
                >
                  <v-text-field
                  suffix="%"
                  variant="outlined"
                  v-model="recCosts.weeklyFluct[i]"
                  :label="(new Date(2022, 8 - 1, 29 - 7 + i)).toLocaleString('default', { weekday: 'long' })"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
          variant="outlined">
          <v-expansion-panel-title>
            Daily fluctuation
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container fluid class='pa-0'>
              <v-row no-gutters>
                <v-col 
                cols="4"
                :key="i"
                v-for="(item,i) in 24"
                >
                  <v-text-field
                  suffix="%"
                  variant="outlined"
                  v-model="recCosts.dailyFluct[i]"
                  :label="i + ':00'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    
    <div class='actions'>
      <v-btn
        id="createButton"
        variant="outlined">
        create
      </v-btn>
    </div>

  </v-form>
</template>


<style lang="less" scoped>
  @import "@/colors";
  h1 {
    text-align: center;
    margin: 2rem; 
  }
  h3 {
    font-weight: bold;
  }

  h3, p {
    margin: 1rem ; 
  }
  
  .button {
    margin: 0 1rem; 
  }
  
  form {
    margin: 2rem 0rem; 
  }

  .actions {
    text-align: center;
    border-top: 0.1rem solid #fff8; 
    padding: 2rem;
    margin: 1rem; 
    v-btn {
      display: inline-block;
    }
  }
  
  ::v-deep .v-expansion-panel-text__wrapper {
    margin: 1rem 0 0 0; 
    padding: 0; 
  }
</style>